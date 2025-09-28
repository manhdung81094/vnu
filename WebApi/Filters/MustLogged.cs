using System;
using Common;
using Contract.Service.Core;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace WebApi.Filters
{
    public class MustLogged : ActionFilterAttribute
    {
        //private readonly AccountCacheManager _accountCacheManager;
        private IJwtTokenService _jwtTokenService;
        public MustLogged(
            //AccountCacheManager accountCacheManager
            )
        {
            //this._accountCacheManager = accountCacheManager;
             

        }
        public override void OnActionExecuting(ActionExecutingContext context)
        {
            try
            { 
                _jwtTokenService = (IJwtTokenService)context.HttpContext.RequestServices.GetService(typeof(IJwtTokenService));
                var userId = _jwtTokenService.GetUserId(context.HttpContext);
                if (userId.ConvertToString() != "")
                {
                    return;
                }
                context.Result = new UnauthorizedResult();
            }
            catch (Exception)
            {
                base.OnActionExecuting(context);
            }
        }
    }
}

