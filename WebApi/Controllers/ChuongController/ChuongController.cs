using Contract.Repository.DeCuong;
using Contract.Service;
using Contract.Service.DeCuong;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Model.Request.Chuong;
using Model.Table;
using System.Threading.Tasks;

namespace WebApi.Controllers.ChuongController
{
    [Route("api/chuong")]
    [ApiController]
    public class ChuongController : BaseController
    {
        private IChuongService _chuongService;
        private IBaiService _baiService;
        public ChuongController(IServiceWrapper serviceWrapper) : base(serviceWrapper)
        {
            this._chuongService = _serviceWrapper.DeCuong.Chuong;
            this._baiService = _serviceWrapper.DeCuong.Bai;
        }

        [HttpGet]
        public async Task<ContentResult> SelectAllAsync()
        {
            var list = await _chuongService.SelectAllAsync();
            return this.OK(list);
        }

        [HttpGet, Route("select-by-id/{id}")]
        public async Task<ContentResult> SelectByIdAsync([FromRoute] int id)
        {
            var list = await _chuongService.SelectByIdAsync(id);
            return this.OK(list);
        }

        [HttpGet, Route("{id}")]
        public async Task<ContentResult> SelectAsync([FromRoute] int id)
        {
            var list = await _chuongService.SelectByDeCuongAsync(id);
            return this.OK(list);
        }
        [HttpPost]
        public async Task<ContentResult> InsertAsync([FromBody] CDR_Chuong_Request request)
        {
            var result = await _chuongService.InsertChuongAsync(request);
            if (result > 0)
            {
                return this.OK(result);
            }
            return this.BadRequest("Thêm chương thất bại");
        }
        [HttpPut]
        public async Task<ContentResult> UpdateAsync([FromBody] CDR_Chuong request)
        {
            var obj = await _chuongService.SelectByIdAsync(request.id);
            if (obj == null) return this.BadRequest("Dữ liệu không hợp lệ");
            obj.id_de_cuong = request.id_de_cuong;
            obj.stt = request.stt;
            obj.noi_dung = request.noi_dung;
          
            var isUpdated = await _chuongService.UpdateAsync(obj);
            return isUpdated ? this.OK(obj) : this.BadRequest();
        }
        [HttpDelete, Route("{id}")]
        public async Task<ContentResult> DeleteAsync([FromRoute] int id)
        {
            var obj = await _chuongService.SelectByIdAsync(id);
            if (obj == null) return this.BadRequest("Dữ liệu không hợp lệ");
            var isDeleted = await _chuongService.DeleteAsync(id);
            if (isDeleted)
            {
                return this.OK();
            }
            return this.BadRequest();
        }
    }
}