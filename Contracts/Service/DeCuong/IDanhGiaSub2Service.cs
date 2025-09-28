

using Contract.Service.Base;
using Model.Table;

namespace Contract.Service.DeCuong
{
    public interface IDanhGiaSub2Service : ICRUDService<CDR_DanhGia_Sub2>
    {
        Task<IEnumerable<CDR_DanhGia_Sub2>> SelectByIdDanhGiaSubAsync(int id_danh_gia_sub);
    }
}