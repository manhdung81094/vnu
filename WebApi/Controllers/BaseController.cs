using System.Threading.Tasks;
using Contract.Service;
using Contract.Service.Core;
using Microsoft.AspNetCore.Mvc;
using Model.Respone;
using Model.Respone.Account;
using WebApi.Filters;

namespace WebApi.Controllers
{
    [ApiController]
    [SecurityHeadersAttribute]
    public class BaseController : ControllerBase
    {
        protected readonly IServiceWrapper _serviceWrapper;
        protected readonly IJwtTokenService _jwtTokenService;

        public BaseController(IServiceWrapper serviceWrapper)
        {
            this._serviceWrapper = serviceWrapper;
            this._jwtTokenService = serviceWrapper.Core.JwtToken;
        }
        protected string GetAccessToken()
        {
            var tooken = _jwtTokenService.GetUserToken(HttpContext);
            return tooken;
        }
        protected string GetUserId()
        {
            return _jwtTokenService.GetUserId(HttpContext).ToString();
        }
      
        protected JwtTokenInfo GetUserInfo()
        {
            return _jwtTokenService.GetUserInfo(HttpContext);
        }
        protected ContentResult OK()
        {
            return new ResponeBaseSuccess().ToContentResult();
        }
        protected ContentResult OK(object data)
        {
            return new ResponeBaseSuccess(data).ToContentResult();
        }
        protected Task<ContentResult> OKAsync(object data)
        {
            return new ResponeBaseSuccess(data).ToContentResultAsync();
        }
        protected ContentResult BadRequest(string message = "")
        {
            return new ResponeBaseErr(message).ToContentResult();

        }
        protected Task<ContentResult> BadRequestAsync(string message = "")
        {
            return new ResponeBaseErr(message).ToContentResultAsync();
        }
       
      
    }
}

