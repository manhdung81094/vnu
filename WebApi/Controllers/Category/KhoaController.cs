using System.Threading.Tasks;
using Contract.Service;
using Contract.Service.Category;
using Microsoft.AspNetCore.Mvc;
using Model.Table;
using WebApi.Filters;
 
namespace WebApi.Controllers.Category
{
    [ApiController]
    [Route("api/khoa")]
    //[MustLogged]

    public class KhoaController : BaseController
    {
        private IKhoaService _khoaService;
        public KhoaController(IServiceWrapper serviceWrapper) : base(serviceWrapper)
        {
            this._khoaService = _serviceWrapper.Category.Khoa;
        } 

        [HttpGet]
        public async Task<ContentResult> SelectAllAsync()
        {
            var list = await _khoaService.SelectAllAsync();
            return this.OK(list);
        }
    }
}

