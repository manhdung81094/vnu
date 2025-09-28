using Contract.Service;
using Contract.Repository;
using Contract.Service.Base;
using Microsoft.Extensions.DependencyInjection;
using Contract.Service.Core;
using Model.Respone.Account;

namespace Service.Base
{
    public class BaseService : IBaseService
    {
        protected IServiceProvider _serviceProvider;
        protected IServiceWrapper _serviceWrapper;
        protected IRepositoryWrapper _repositoryWrapper;
        private IJwtTokenService _jwtTokenService;
        public BaseService(IServiceProvider serviceProvider)
        {
            //không được get thằng service nào mà nó lại kết thừa BaseService vì sẽ dẫn đến lỗi Stack Overflow
            var scope = serviceProvider.CreateScope();
            this._serviceProvider = scope.ServiceProvider;
            this._serviceWrapper = _serviceProvider.GetRequiredService<IServiceWrapper>();
            this._repositoryWrapper = _serviceProvider.GetRequiredService<IRepositoryWrapper>();
            _jwtTokenService = _serviceProvider.GetRequiredService<IJwtTokenService>();
        }

        public string GetCurrentUserId()
        {
            try
            {
                var context = _serviceWrapper._httpContextAccessor.HttpContext;
                var userId = _jwtTokenService.GetUserId(context);
                return userId;
            }
            catch (System.Exception ex)
            {
                return string.Empty;
            }
        }

        public JwtTokenInfo GetUserInfo()
        {
            try
            {
                var context = _serviceWrapper._httpContextAccessor.HttpContext;
                return _jwtTokenService.GetUserInfo(context);
            }
            catch (System.Exception ex)
            {
                return null;
            }
        }
    }
}

