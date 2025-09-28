
using Contract.Service.DeCuong;
using Model.Table;
using Service.Base;

namespace Service.DeCuong
{
    public class MoTaService : CRUDService<CDR_MoTa>, IMoTaService
    {
        public MoTaService(IServiceProvider serviceProvider) : base(serviceProvider)
        {
            this._repositoryBase = _repositoryWrapper.DeCuong.MoTa;
        }

        public Task<bool> DeleteByIdDeCuongAsync(int id_de_cuong)
        {
            return _repositoryWrapper.DeCuong.MoTa.DeleteByIdDeCuongAsync(id_de_cuong);
        }

        public Task<IEnumerable<CDR_MoTa>> SelectByIdDeCuongAsync(int id_de_cuong)
        {
            return _repositoryWrapper.DeCuong.MoTa.SelectByIdDeCuongAsync(id_de_cuong);
        }
    }
}