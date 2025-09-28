using Contract.Repository.Base; 
using Model.Table;

namespace Contract.Repository.DeCuong
{
    public interface IDanhGiaSub2Repository : ICRUDRepository<CDR_DanhGia_Sub2>
    {
        Task<IEnumerable<CDR_DanhGia_Sub2>> SelectByIdDanhGiaSubAsync(int id_danh_gia_sub);
    }
}