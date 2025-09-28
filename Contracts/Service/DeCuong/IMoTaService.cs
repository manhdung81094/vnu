

using Contract.Service.Base;
using Model.Table;

namespace Contract.Service.DeCuong
{
    public interface IMoTaService : ICRUDService<CDR_MoTa>
    {
        Task<IEnumerable<CDR_MoTa>> SelectByIdDeCuongAsync(int id_de_cuong);
        Task<bool> DeleteByIdDeCuongAsync(int id_de_cuong);
    }
}