using Contract.Repository.Base;
using Model.Request.DeCuong;
using Model.Table;

namespace Contract.Repository.DeCuong
{
    public interface IDeCuongRepository : ICRUDRepository<CDR_DeCuong>
    {
        Task<int> InsertDeCuongAsync(CDR_DeCuong deCuong);
        Task<bool> ProgressAsync(DeCuongProgressRequest request);
        Task<bool> CheckExistHocPhan(int idHocPhan);
    }
}