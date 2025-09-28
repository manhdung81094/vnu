

using Contract.Service.Base;
using Model.Table;

namespace Contract.Service.DeCuong
{
    public interface IDanhGiaSubService : ICRUDService<CDR_DanhGia_Sub>
    {
        Task<CDR_DanhGia_Sub> SelectByIdDanhGiaAsync(int id_danh_gia);
    }
}