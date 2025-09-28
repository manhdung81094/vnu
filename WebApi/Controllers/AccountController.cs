using System;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Common;
using Contract.Service;
using Contract.Service.Core;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Model.Request.Account;
using WebApi.Filters;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("api/account")]
    public class AccountController : BaseController
    {
        private IAccountService _accountService;
        public AccountController(IServiceWrapper serviceWrapper) : base(serviceWrapper)
        {
            this._accountService = _serviceWrapper.Core.Account;
        }

        [HttpPost]
        [Route("login")]
        public async Task<ContentResult> Login([FromBody] LoginOIDCRequest request)
        {
            try
            { 
                var result = await _accountService.LoginAsync(request);
                if (result.is_success)
                {
                    var response = HttpContext.Response; ;
                    response.Cookies.Delete("access_token");
                    response.Cookies.Delete("refresh_token");
                    response.Cookies.Append("access_token", result.data.token_info.access_token, new CookieOptions()
                    {
                        Secure = true,
                        HttpOnly = true,
                        Expires = DateTime.Now.AddDays(30)
                    });
                    response.Cookies.Append("refresh_token", result.data.token_info.refresh_token, new CookieOptions()
                    {
                        Secure = true,
                        HttpOnly = true,
                        Expires = DateTime.Now.AddDays(365)
                    });
                   
                }
                return result.is_success ? this.OK(result.data) : this.BadRequest(result.message);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        [HttpGet]
        [Route("info")]
        [MustLogged]
        public async Task<ContentResult> Detail()
        {
            try
            {
                var accessToken = this.GetAccessToken();
                var userInfo = await _accountService.GetProfileAsync(accessToken);

                var role = await ApiService.CallApiAsync(userInfo.id, "DECUONGMONHOC");
                userInfo.role = role;

                return userInfo != null ? this.OK(userInfo) : this.BadRequest();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        [HttpPost]
        [Route("token/refresh")]
        public async Task<ContentResult> RefreshToken([FromBody] RefreshTokenRequest request)
        {
            var tokenInfoResult = await _serviceWrapper.Core.Account.RefreshTokenAsync(request);
            return tokenInfoResult.is_success ? this.OK(tokenInfoResult.data) : this.BadRequest(tokenInfoResult.message);
        }
       
    }
}

