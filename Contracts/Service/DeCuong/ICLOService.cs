

using Contract.Service.Base;
using Model.Table;

namespace Contract.Service.DeCuong
{
    public interface ICLOService : ICRUDService<CDR_CLO>
    {
        Task<IEnumerable<CDR_CLO>> SelectByIdDeCuongAsync(int id_de_cuong);
        Task<bool> DeleteByIdDeCuongAsync(int id_de_cuong);
    }
}