using Contract.Service.Base;
using Model.Base;
using Model.Request.Account;
using Model.Respone.Account;

namespace Contract.Service.Core
{
    public interface IAccountService : IBaseService
    {
        Task<FunctionResult<LoginRespone>> LoginAsync(LoginOIDCRequest request);
        Task<ProfileRespone?> GetProfileAsync(string accessToken);
        Task<FunctionResult<TokenInfo>> RefreshTokenAsync(RefreshTokenRequest request);
    }
}

