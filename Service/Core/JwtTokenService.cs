using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Common;
using Contract.Service;
using Contract.Service.Core;
using Contract.Service.Cache;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Net.Http.Headers;
using Model.Base;
using Model.Respone.Account;
using Model.Static;

namespace Service.Core
{
    public class JwtTokenService : IJwtTokenService
    {
        private ICacheService _cacheService;
        private ICacheKeyService _cacheKeyService;
        public JwtTokenService(IServiceProvider serviceProvider)
        {
            var scope = serviceProvider.CreateScope();
            var _serviceWrapper = scope.ServiceProvider.GetRequiredService<IServiceWrapper>();
            this._cacheKeyService = _serviceWrapper.CacheKey;
            this._cacheService = _serviceWrapper.Cache;
            // this._cacheService = scope.ServiceProvider.GetRequiredService<ICacheService>();
            // this._cacheKeyService = scope.ServiceProvider.GetRequiredService<ICacheKeyService>();

        }
        public async Task<string> CreateAccessTokenAsync(JwtTokenInfo obj)
        {
            try
            {
                string key = AppSettings.JwtConfig.Key;
                var issuer = AppSettings.JwtConfig.Issuer;

                var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key));
                var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

                var permClaims = new List<Claim>();
                permClaims.Add(new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()));
                permClaims.Add(new Claim("id", obj.id.ToString()));
                permClaims.Add(new Claim("full_name", obj.full_name.ToString()));
                permClaims.Add(new Claim("username", obj.username.ToString()));



                var token = new JwtSecurityToken(issuer,
                                issuer,
                                permClaims,
                                expires: DateTime.Now.AddDays(7),
                                signingCredentials: credentials);
                var jwt_token = new JwtSecurityTokenHandler().WriteToken(token);
                return jwt_token;
            }
            catch (Exception ex)
            {
                //ex.SaveLog("TokenService/GetIP");
                return string.Empty;
            }
        }

        public async Task<string> CreateRefreshTokenAsync(JwtRefreshTokenInfo model)
        {
            try
            {
                var accessToken = model.access_token;
                var user_id = model.user_id;
                string key = AppSettings.JwtConfig.Key;
                var issuer = AppSettings.JwtConfig.Issuer;

                var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key));
                var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

                var permClaims = new List<Claim>();
                permClaims.Add(new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()));
                permClaims.Add(new Claim("access_token", accessToken));
                permClaims.Add(new Claim("user_id", user_id.ToString()));
                var token = new JwtSecurityToken(issuer,
                                issuer,
                                permClaims,
                                expires: DateTime.Now.AddYears(1),
                                signingCredentials: credentials);
                var jwt_token = new JwtSecurityTokenHandler().WriteToken(token);
                return jwt_token;
            }
            catch (Exception ex)
            {
                //ex.SaveLog("TokenService/GetIP");

                return string.Empty;
            }
        }

        public string GetIP(HttpContext httpContext)
        {
            try
            {
                var IP = httpContext.Connection.RemoteIpAddress.ToString();
                return IP;
            }
            catch (Exception ex)
            {
                //ex.SaveLog("TokenService/GetIP");
                return string.Empty;
            }
        }

        public async Task<string> GetIPAsync(HttpContext httpContext)
        {
            return this.GetIP(httpContext);
        }

        public string GetSignature(string token)
        {
            var parts = token.Split('.');
            if (parts.Length == 3) return parts[2];
            return string.Empty;
        }
        public DateTime? GetExpirationTimeFromToken(string accessToken)
        {
            var handler = new JwtSecurityTokenHandler();
            var jsonToken = handler.ReadToken(accessToken) as JwtSecurityToken;
            if (jsonToken == null)
            {
                return null;
            }
            var expirationTimestamp = jsonToken.Payload.Expiration;
            if (expirationTimestamp != null)
            {
                var expirationDateTime = DateTimeOffset.FromUnixTimeSeconds((long)expirationTimestamp).UtcDateTime;

                return expirationDateTime;
            }
            return null;

        }
        public string GetUserId(HttpContext httpContext)
        {
            try
            {
                var userToken = this.GetUserToken(httpContext);
                var validateTokenResult = this.ReadAccessToken(userToken);
                if (validateTokenResult.is_success)
                {
                    return validateTokenResult.data.id;
                }
                return "";
            }
            catch (Exception ex)
            {
                //ex.SaveLog("TokenService/GetUserId");
                return "";
            }
        }

        public async Task<string> GetUserIdAsync(HttpContext httpContext)
        {
            return this.GetUserId(httpContext);
        }

        public JwtTokenInfo GetUserInfo(HttpContext httpContext)
        {
            var token = this.GetUserToken(httpContext);
            var result = this.ReadAccessToken(token);
            if (result.is_success)
            {
                return result.data;
            }
            return null;
        }

        public string GetUserToken(HttpContext httpContext)
        {
            try
            {
                var request = httpContext.Request;
                var jwt_token = request.Headers[HeaderNames.Authorization].ConvertToString().Replace("Bearer ", "");
                return jwt_token;
            }
            catch (Exception ex)
            {
                //ex.SaveLog("TokenService/GetUserToken");
                return string.Empty;
            }
        }

        public async Task<string> GetUserTokenAsync(HttpContext httpContext)
        {
            return this.GetUserToken(httpContext);
        }

        public FunctionResult<JwtTokenInfo> ReadAccessToken(string token)
        {
            var signature = this.GetSignature(token);

            var cachedData = _cacheService.GetData<OidcUserInfo>(_cacheKeyService.GetAccessTokenCacheKey(signature));
            if (cachedData != null)
            {
                var data = new JwtTokenInfo()
                {
                    full_name = cachedData.full_name,
                    id = cachedData.id,
                    username = cachedData.username,
                   // email = cachedData.email
                };
                return new SuccessResult<JwtTokenInfo>(data);

            }
            return new ErrorResult<JwtTokenInfo>();
            // try
            // {
            //     var tokenHandler = new JwtSecurityTokenHandler();
            //     var key = Encoding.ASCII.GetBytes(AppSettings.JwtConfig.Key);

            //     tokenHandler.ValidateToken(token, new TokenValidationParameters
            //     {
            //         ValidateIssuerSigningKey = false,
            //         IssuerSigningKey = new SymmetricSecurityKey(key),
            //         ValidateIssuer = false,
            //         ValidateAudience = false,
            //         ClockSkew = TimeSpan.Zero
            //     }, out SecurityToken validatedToken);

            //     var jwtToken = (JwtSecurityToken)validatedToken;
            //     var id = jwtToken.Claims.First(x => x.Type == "sub").Value;
            //     var full_name = jwtToken.Claims.First(x => x.Type == "fullName").Value;
            //     var username = jwtToken.Claims.First(x => x.Type == "username").Value;

            //     return new SuccessResult<JwtTokenInfo>(new JwtTokenInfo()
            //     {
            //         id = id,
            //         full_name = full_name,
            //         username = username,
            //     });


            // }

            // catch (Exception ex)
            // {

            //     return new ErrorResult<JwtTokenInfo>();

            // }
        }

        public async Task<FunctionResult<JwtTokenInfo>> ReadAccessTokenAsync(string token)
        {
            var signature = this.GetSignature(token);

            var cachedData = await _cacheService.GetDataAsync<OidcUserInfo>(_cacheKeyService.GetAccessTokenCacheKey(signature));
            if (cachedData != null)
            {
                var data = new JwtTokenInfo()
                {
                    full_name = cachedData.full_name,
                    id = cachedData.id,
                    username = cachedData.username,
                    email = cachedData.email,
                    role = cachedData.role
                };
                return new SuccessResult<JwtTokenInfo>(data);

            }
            return new ErrorResult<JwtTokenInfo>();
        }

        public FunctionResult<JwtRefreshTokenInfo> ReadRefreshToken(string token)
        {
            try
            {
                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.ASCII.GetBytes(AppSettings.JwtConfig.Key);

                tokenHandler.ValidateToken(token, new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ClockSkew = TimeSpan.Zero
                }, out SecurityToken validatedToken);

                var jwtToken = (JwtSecurityToken)validatedToken;
                var user_id = int.Parse(jwtToken.Claims.First(x => x.Type == "user_id").Value);
                var access_token = jwtToken.Claims.First(x => x.Type == "access_token").Value;

                return new SuccessResult<JwtRefreshTokenInfo>(new JwtRefreshTokenInfo()
                {
                    access_token = access_token,
                    user_id = user_id
                });


            }

            catch (Exception ex)
            {
                //ex.SaveLog("TokenService/ValidateAccessToken");
                return new ErrorResult<JwtRefreshTokenInfo>();

            }
        }

        public async Task<FunctionResult<JwtRefreshTokenInfo>> ReadRefreshTokenAsync(string token)
        {
            return this.ReadRefreshToken(token);
        }

        public async Task<bool> SaveAcessTokenInfoAsync(string access_token, OidcUserInfo userInfo)
        {
            var signature = this.GetSignature(access_token);
            if (signature == "") return false;
            var expirationDateTime = this.GetExpirationTimeFromToken(access_token);
            if (expirationDateTime != null)
            {
                await _cacheService.SetDataAsync(_cacheKeyService.GetAccessTokenCacheKey(signature), userInfo, expirationDateTime);
            }
            return true;
        }

        public async Task<bool> DeleteAcessTokenInfoAsync(string access_token)
        {
            var signature = this.GetSignature(access_token);
            await _cacheService.RemoveDataAsync(_cacheKeyService.GetAccessTokenCacheKey(signature));
            return true;
        }
    }
}

