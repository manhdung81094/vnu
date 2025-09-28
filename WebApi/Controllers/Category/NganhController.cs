using System.Threading.Tasks;
using Contract.Service;
using Contract.Service.Category;
using Microsoft.AspNetCore.Mvc;
using WebApi.Filters;

namespace WebApi.Controllers.Category
{
    [ApiController]
    [Route("api/nganh")]
    [MustLogged]

    public class NganhController : BaseController
    {
        private INganhService _nganhService;
        public NganhController(IServiceWrapper serviceWrapper) : base(serviceWrapper)
        {
            this._nganhService = _serviceWrapper.Category.Nganh;
        }

        [HttpGet]
        public async Task<ContentResult> SelectAllAsync()
        {
            var list = await _nganhService.SelectAllAsync();
            return this.OK(list);
        } 
    }
}

