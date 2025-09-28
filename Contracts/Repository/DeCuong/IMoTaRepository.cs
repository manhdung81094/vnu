using Contract.Repository.Base; 
using Model.Table;

namespace Contract.Repository.DeCuong
{
    public interface IMoTaRepository : ICRUDRepository<CDR_MoTa>
    {
        Task<IEnumerable<CDR_MoTa>> SelectByIdDeCuongAsync(int id_de_cuong);
        Task<bool> DeleteByIdDeCuongAsync(int id_de_cuong);
    }
}