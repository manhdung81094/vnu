using System.Threading.Tasks;
using Contract.Service;
using Contracts.Service.Category;
using Microsoft.AspNetCore.Mvc;
using WebApi.Filters;

namespace WebApi.Controllers.Category
{
    [ApiController]
    [Route("api/he")]
    [MustLogged]

    public class HeController : BaseController
    {
        private IHeService _heService;
        public HeController(IServiceWrapper serviceWrapper) : base(serviceWrapper)
        {
            this._heService = _serviceWrapper.Category.He;
        }

        [HttpGet]
        public async Task<ContentResult> SelectAllAsync()
        {
            var list = await _heService.SelectAllAsync();
            return this.OK(list);
        }
    }
}

