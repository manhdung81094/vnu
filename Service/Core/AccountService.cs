using System.Net;
using System.Net.Http.Headers;
using Contract.Service.Core;
using Model.Base;
using Model.Request.Account;
using Model.Respone.Account;
using Model.Static;
using Newtonsoft.Json;
using Service.Base;

namespace Service.Account
{
    public class AccountService : BaseService, IAccountService
    {
        public AccountService(IServiceProvider serviceProvider) : base(serviceProvider)
        {
        }

        public async Task<ProfileRespone> GetProfileAsync(string accessToken)
        {
            var tokenInfoResult = await _serviceWrapper.Core.JwtToken.ReadAccessTokenAsync(accessToken);
            if (tokenInfoResult.is_success)
            {
                var jwtTokenInfo = tokenInfoResult.data;
                return new ProfileRespone()
                {
                    email = jwtTokenInfo.email,
                    full_name = jwtTokenInfo.full_name,
                    id = jwtTokenInfo.id,
                    username = jwtTokenInfo.username

                };
            }
            return null;
        }

        public async Task<FunctionResult<LoginRespone>> LoginAsync(LoginOIDCRequest request)
        {
            var validTokenInfo = await this.ValidateOidcAccessToken(request.access_token);
            if (validTokenInfo.is_success)
            {
                var tokenInfo = validTokenInfo.data;
                return new SuccessResult<LoginRespone>(data: new LoginRespone()
                {
                    profile = new ProfileRespone()
                    {
                        full_name = tokenInfo.full_name,
                        id = tokenInfo.id,
                      //  email = tokenInfo.email,
                        username = tokenInfo.username
                    },
                    token_info = new TokenInfo()
                    {

                        access_token = request.access_token,
                        refresh_token = request.refresh_token
                    }
                });
            }
            return new ErrorResult<LoginRespone>(validTokenInfo.message);

        }

        public async Task<FunctionResult<TokenInfo>> RefreshTokenAsync(Model.Request.Account.RefreshTokenRequest request)
        {
            // return new ErrorResult<TokenInfo>();
            using (var client = new HttpClient())
            {
                var requestData = new FormUrlEncodedContent(new[]
            {
                    new KeyValuePair<string, string>("grant_type", "refresh_token"),
                    new KeyValuePair<string, string>("refresh_token", request.refresh_token),
                    new KeyValuePair<string, string>("client_id", AppSettings.OIDC.CLIENT_ID),
                    new KeyValuePair<string, string>("client_secret", AppSettings.OIDC.CLIENT_SECRET),
                });

                var endPoint = $"{AppSettings.OIDC.AUTHORITY}/connect/token";
                var response = await client.PostAsync(endPoint, requestData);

                if (!response.IsSuccessStatusCode)
                {
                    return new ErrorResult<TokenInfo>();
                }

                var responseContent = await response.Content.ReadAsStringAsync();
                var tokenResponse = Newtonsoft.Json.JsonConvert.DeserializeObject<TokenInfo>(responseContent);

                if (tokenResponse == null)
                {
                    return new ErrorResult<TokenInfo>();
                }
                await _serviceWrapper.Core.JwtToken.DeleteAcessTokenInfoAsync(request.access_token);
                await ValidateOidcAccessToken(tokenResponse.access_token);
                return new SuccessResult<TokenInfo>(tokenResponse);
            }

        }
        public async Task<FunctionResult<OidcUserInfo>> ValidateOidcAccessToken(string accessToken)
        {
            try
            {
                using (var client = new HttpClient())
                {
                    var endPoint = $"{AppSettings.OIDC.AUTHORITY}/connect/userinfo";

                    // var discoveryDocument = await  client.GetDiscoveryDocumentAsync(AppSettings.OIDC.AUTHORITY);

                    client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);
                    var response = await client.GetAsync(endPoint);

                    if (response.StatusCode == HttpStatusCode.OK)
                    {
                        var contents = await response.Content.ReadAsStringAsync();
                        var result = JsonConvert.DeserializeObject<OidcUserInfo>(contents);
                        await _serviceWrapper.Core.JwtToken.SaveAcessTokenInfoAsync(accessToken, result);
                        return new FunctionResult<OidcUserInfo>()
                        {
                            is_success = true,
                            data = result
                        };
                    }
                    return new FunctionResult<OidcUserInfo>()
                    {
                        is_success = false
                    };
                }

            }
            catch (System.Exception ex)
            {
                return new FunctionResult<OidcUserInfo>(false, ex.Message);
            }
        }
    }
}