
using Contract.Service.DeCuong;
using Model.Table;
using Service.Base;

namespace Service.DeCuong
{
    public class DanhGiaService : CRUDService<CDR_DanhGia>, IDanhGiaService
    {
        public DanhGiaService(IServiceProvider serviceProvider) : base(serviceProvider)
        {
            this._repositoryBase = _repositoryWrapper.DeCuong.DanhGia;
        }

        public Task<bool> DeleteByIdDeCuongAsync(int id_de_cuong)
        {
            return _repositoryWrapper.DeCuong.DanhGia.DeleteByIdDeCuongAsync(id_de_cuong);
        }

        public Task<IEnumerable<CDR_DanhGia>> SelectByIdDeCuongAsync(int id_de_cuong)
        {
            return _repositoryWrapper.DeCuong.DanhGia.SelectByIdDeCuongAsync(id_de_cuong);
        }
    }
}