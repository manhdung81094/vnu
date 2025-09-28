using Contract.Repository.Base; 
using Model.Table;

namespace Contract.Repository.DeCuong
{
    public interface IDanhGiaRepository : ICRUDRepository<CDR_DanhGia>
    {
        Task<IEnumerable<CDR_DanhGia>> SelectByIdDeCuongAsync(int id_de_cuong);
        Task<bool> DeleteByIdDeCuongAsync(int id_de_cuong);
    }
}