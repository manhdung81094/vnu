using Contract.Repository.Base; 
using Model.Table;

namespace Contract.Repository.DeCuong
{
    public interface ITaiLieuRepository : ICRUDRepository<CDR_TaiLieu>
    {
        Task<IEnumerable<CDR_TaiLieu>> SelectByIdDeCuongAsync(int id_de_cuong);
        Task<bool> DeleteByIdDeCuongAsync(int id_de_cuong);
    }
}