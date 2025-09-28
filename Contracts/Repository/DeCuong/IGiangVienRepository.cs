using Contract.Repository.Base; 
using Model.Table;

namespace Contract.Repository.DeCuong
{
    public interface IGiangVienRepository : ICRUDRepository<CDR_GiangVien>
    {
        Task<IEnumerable<CDR_GiangVien>> SelectByIdDeCuongAsync(int id_de_cuong);
        Task<bool> DeleteByIdDeCuongAsync(int id_de_cuong);
    }
}