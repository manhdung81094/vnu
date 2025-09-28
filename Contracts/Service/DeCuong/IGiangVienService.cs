

using Contract.Service.Base;
using Model.Table;

namespace Contract.Service.DeCuong
{
    public interface IGiangVienService : ICRUDService<CDR_GiangVien>
    { 
        Task<IEnumerable<CDR_GiangVien>> SelectByIdDeCuongAsync(int id_de_cuong);
        Task<bool> DeleteByIdDeCuongAsync(int id_de_cuong);
    }
}