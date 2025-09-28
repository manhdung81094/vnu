

using Contract.Service.Base;
using Model.Table;

namespace Contract.Service.DeCuong
{
    public interface IDanhGiaService : ICRUDService<CDR_DanhGia>
    {
        Task<IEnumerable<CDR_DanhGia>> SelectByIdDeCuongAsync(int id_de_cuong);
        Task<bool> DeleteByIdDeCuongAsync(int id_de_cuong);
    }
}