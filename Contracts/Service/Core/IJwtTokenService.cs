using Microsoft.AspNetCore.Http;
using Model.Base;
using Model.Respone.Account;

namespace Contract.Service.Core
{
    public interface IJwtTokenService
    {
        public Task<string> CreateAccessTokenAsync(JwtTokenInfo obj);
        public Task<string> CreateRefreshTokenAsync(JwtRefreshTokenInfo obj);
        public Task<FunctionResult<JwtTokenInfo>> ReadAccessTokenAsync(string token);
        public Task<FunctionResult<JwtRefreshTokenInfo>> ReadRefreshTokenAsync(string token);
        public Task<string> GetUserTokenAsync(HttpContext httpContext);
        public Task<string> GetUserIdAsync(HttpContext httpContext);
        public Task<string> GetIPAsync(HttpContext httpContext);
        public Task<bool> SaveAcessTokenInfoAsync(string access_token, OidcUserInfo userInfo);
        public Task<bool> DeleteAcessTokenInfoAsync(string access_token);

        public JwtTokenInfo GetUserInfo(HttpContext httpContext);
        // public FunctionResult<JwtTokenInfo> ReadAccessToken(string token);
        public FunctionResult<JwtRefreshTokenInfo> ReadRefreshToken(string token);
        public string GetUserToken(HttpContext httpContext);
        public string GetUserId(HttpContext httpContext);
        public string GetIP(HttpContext httpContext);
        public string GetSignature(string token);
    }
}

