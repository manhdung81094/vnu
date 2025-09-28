using System.Threading.Tasks;
using Contract.Service;
using Contract.Service.Category;
using Microsoft.AspNetCore.Mvc;
using Model.Table;
using WebApi.Filters;
 
namespace WebApi.Controllers.Category
{
    [ApiController]
    [Route("api/category/muc-do")]
    //[MustLogged]

    public class MucDoController : BaseController
    {
        private IMucDoService _mucDoService;
        public MucDoController(IServiceWrapper serviceWrapper) : base(serviceWrapper)
        {
            this._mucDoService = _serviceWrapper.Category.MucDo;
        } 

        [HttpGet]
        public async Task<ContentResult> SelectAllAsync()
        {
            var list = await _mucDoService.SelectAllAsync();
            return this.OK(list);
        }
    }
}

