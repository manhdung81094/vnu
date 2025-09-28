using Model.Respone.Account;

namespace Contract.Service.Base
{
    public interface IBaseService
    {

        string GetCurrentUserId();
        public JwtTokenInfo GetUserInfo();

    }
}

