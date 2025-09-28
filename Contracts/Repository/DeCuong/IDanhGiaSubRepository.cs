using Contract.Repository.Base; 
using Model.Table;

namespace Contract.Repository.DeCuong
{
    public interface IDanhGiaSubRepository : ICRUDRepository<CDR_DanhGia_Sub>
    {
        Task<CDR_DanhGia_Sub> SelectByIdDanhGiaAsync(int id_danh_gia);
    }
}