using System.Threading.Tasks;
using Contract.Service;
using Contract.Service.Category;
using Microsoft.AspNetCore.Mvc;
using Model.Table;
using WebApi.Filters;
 
namespace WebApi.Controllers.Category
{
    [ApiController]
    [Route("api/category/tai-lieu")]
    //[MustLogged]

    public class TaiLieuController : BaseController
    {
        private ITaiLieuService _taiLieuService;
        public TaiLieuController(IServiceWrapper serviceWrapper) : base(serviceWrapper)
        {
            this._taiLieuService = _serviceWrapper.Category.TaiLieu;
        } 

        [HttpGet]
        public async Task<ContentResult> SelectAllAsync()
        {
            var list = await _taiLieuService.SelectAllAsync();
            return this.OK(list);
        }
    }
}

