

using Contract.Service.Base;
using Model.Table;

namespace Contract.Service.DeCuong
{
    public interface ITaiLieuService : ICRUDService<CDR_TaiLieu>
    {
        Task<IEnumerable<CDR_TaiLieu>> SelectByIdDeCuongAsync(int id_de_cuong);
        Task<bool> DeleteByIdDeCuongAsync(int id_de_cuong);
    }
}