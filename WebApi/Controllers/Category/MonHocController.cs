using System.Threading.Tasks;
using Contract.Service;
using Contract.Service.Category;
using Microsoft.AspNetCore.Mvc;
using Model.Table;
using WebApi.Filters;
 
namespace WebApi.Controllers.Category
{
    [ApiController]
    [Route("api/category/mon-hoc")]
    //[MustLogged]

    public class MonHocController : BaseController
    {
        private IMonHocService _monHocService;
        public MonHocController(IServiceWrapper serviceWrapper) : base(serviceWrapper)
        {
            this._monHocService = _serviceWrapper.Category.MonHoc;
        } 

        [HttpGet]
        public async Task<ContentResult> SelectAllAsync()
        {
            var list = await _monHocService.SelectAllAsync();
            return this.OK(list);
        }
    }
}

