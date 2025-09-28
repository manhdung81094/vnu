using System.Threading.Tasks;
using Contract.Service;
using Contract.Service.Category;
using Microsoft.AspNetCore.Mvc;
using Model.Table;
using WebApi.Filters;
 
namespace WebApi.Controllers.Category
{
    [ApiController]
    [Route("api/category/tieu-chi")]
    //[MustLogged]

    public class TieuChiController : BaseController
    {
        private ITieuChiService _tieuChiService;
        public TieuChiController(IServiceWrapper serviceWrapper) : base(serviceWrapper)
        {
            this._tieuChiService = _serviceWrapper.Category.TieuChi;
        } 

        [HttpGet]
        public async Task<ContentResult> SelectAllAsync()
        {
            var list = await _tieuChiService.SelectAllAsync();
            return this.OK(list);
        }
    }
}

