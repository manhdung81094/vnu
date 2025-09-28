using Contract.Service.Core;
using Service.Account;
using Service.Base;

namespace Service.Core
{
    public class CoreServiceWrapper : BaseService, ICoreSerivceWrapper
    {
        private IExceptionService _exceptionService;
        private IJwtTokenService _jwtTokenService;
        private IAccountService _accountService;
        
        public CoreServiceWrapper(IServiceProvider serviceProvider) : base(serviceProvider)
        {
        }

        public IExceptionService Exception => _exceptionService ??= new ExceptionService(_serviceProvider);

        public IAccountService Account => _accountService ??= new AccountService(_serviceProvider);

        public IJwtTokenService JwtToken => _jwtTokenService ??= new JwtTokenService(_serviceProvider);

        
    }
}

