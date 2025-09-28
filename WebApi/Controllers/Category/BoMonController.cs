using System.Threading.Tasks;
using Contract.Service;
using Contract.Service.Category;
using Microsoft.AspNetCore.Mvc;
using Model.Table;
using WebApi.Filters;
 
namespace WebApi.Controllers.Category
{
    [ApiController]
    [Route("api/category/bo-mon")]
    //[MustLogged]

    public class BoMonController : BaseController
    {
        private IBoMonService _boMonService;
        public BoMonController(IServiceWrapper serviceWrapper) : base(serviceWrapper)
        {
            this._boMonService = _serviceWrapper.Category.BoMon;
        } 

        [HttpGet]
        public async Task<ContentResult> SelectAllAsync()
        {
            var list = await _boMonService.SelectAllAsync();
            return this.OK(list);
        }
    }
}

