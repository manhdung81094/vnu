using Contract.Service;
using Contract.Service.Category;
using Microsoft.AspNetCore.Mvc;
using Model.Table;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Controllers.Category
{
    [Route("api/category/chuan-dau-ra")]
    [ApiController]
    public class ChuanDauRaController : BaseController
    {
        private IChuanDauRaService _chuanDauRaService;
        public ChuanDauRaController(IServiceWrapper serviceWrapper) : base(serviceWrapper)
        {
            this._chuanDauRaService = _serviceWrapper.Category.ChuanDauRa;
        }

        [HttpGet]
        public async Task<ContentResult> SelectAllAsync()
        {
            var list = await _chuanDauRaService.SelectAllAsync();
            return this.OK(list);
        }
        [HttpPost]
        public async Task<ContentResult> InsertAsync([FromBody] dmChuanDauRa request)
        {
            var exist = await _chuanDauRaService.SelectAllAsync();
            if(exist.Any(x => x.name == request.name))
            {
                return this.BadRequest("Tên chuẩn đầu ra đã tồn tại");
            }   

            var id = await _chuanDauRaService.InsertAsync(request);
            if (id < 0)
            {
                return this.BadRequest("Thêm mới không thành công");
            }
            return this.OK(id);
        }

        [HttpPut]
        public async Task<ContentResult> UpdateAsync([FromBody] dmChuanDauRa request)
        {
            var exist = await _chuanDauRaService.SelectAllAsync();
            if (exist.Any(x => x.name == request.name && x.id != request.id))
            {
                return this.BadRequest("Tên chuẩn đầu ra đã tồn tại");
            }
            var result = await _chuanDauRaService.UpdateAsync(request);

            if (!result)
            {
                return this.BadRequest("Cập nhật không thành công");
            }
            return this.OK(request);
        }

        [HttpDelete, Route("{id}")]
        public async Task<ContentResult> DeleteAsync([FromRoute] int id)
        {
            var isDeleted = await _chuanDauRaService.DeleteAsync(id);
            if (isDeleted)
            {
                return this.OK();
            }
            return this.BadRequest("Xóa dữ liệu thất bại");
        }
    }
}
