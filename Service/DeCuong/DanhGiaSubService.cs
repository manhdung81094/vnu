
using Contract.Service.DeCuong;
using Model.Table;
using Service.Base;

namespace Service.DeCuong
{
    public class DanhGiaSubService : CRUDService<CDR_DanhGia_Sub>, IDanhGiaSubService
    {
        public DanhGiaSubService(IServiceProvider serviceProvider) : base(serviceProvider)
        {
            this._repositoryBase = _repositoryWrapper.DeCuong.DanhGiaSub;
        }

        public Task<CDR_DanhGia_Sub> SelectByIdDanhGiaAsync(int id_danh_gia)
        {
            return _repositoryWrapper.DeCuong.DanhGiaSub.SelectByIdDanhGiaAsync(id_danh_gia);
        }
    }
}