using System.Threading.Tasks;
using Contract.Service;
using Contract.Service.Category;
using Microsoft.AspNetCore.Mvc;
using Model.Table;
using WebApi.Filters;
 
namespace WebApi.Controllers.Category
{
    [ApiController]
    [Route("api/category/giao-vien")]
    //[MustLogged]

    public class GiaoVienController : BaseController
    {
        private IGiaoVienService _giaoVienService;
        public GiaoVienController(IServiceWrapper serviceWrapper) : base(serviceWrapper)
        {
            this._giaoVienService = _serviceWrapper.Category.GiaoVien;
        } 

        [HttpGet]
        public async Task<ContentResult> SelectAllAsync()
        {
            var list = await _giaoVienService.SelectAllAsync();
            return this.OK(list);
        }
    }
}

