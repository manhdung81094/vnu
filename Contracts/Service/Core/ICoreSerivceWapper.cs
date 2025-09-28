using Contract.Service.Base;

namespace Contract.Service.Core
{
    public interface ICoreSerivceWrapper : IBaseService
    {
        IExceptionService Exception { get; }
        IAccountService Account { get; }
        IJwtTokenService JwtToken { get; }
        
    }
}

