

using Contract.Service.Base;
using Model.Request.DeCuong;
using Model.Table;

namespace Contract.Service.DeCuong
{
    public interface IDeCuongService : ICRUDService<CDR_DeCuong>
    {
        Task<int> InsertDeCuongAsync(CDR_DeCuong deCuong);
        Task<bool> CheckExistHocPhan(int idHocPhan);
        Task<bool> ProgressAsync(DeCuongProgressRequest request);
        Task<string> ViewDeCuongAsync(DeCuongRequest request, dmMonHoc hptq, dmMonHoc hpkt);
    }
}