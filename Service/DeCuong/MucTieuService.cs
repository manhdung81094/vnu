using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Contract.Service.DeCuong;
using Model.Table;
using Service.Base;

namespace Service.DeCuong
{
    public class MucTieuService : CRUDService<CDR_MucTieu>, IMucTieuService
    {
        public MucTieuService(IServiceProvider serviceProvider) : base(serviceProvider)
        {
            this._repositoryBase = _repositoryWrapper.DeCuong.MucTieu;
        }

        public Task<bool> DeleteByIdDeCuongAsync(int id_de_cuong)
        {
            return _repositoryWrapper.DeCuong.MucTieu.DeleteByIdDeCuongAsync(id_de_cuong);
        }

        public Task<IEnumerable<CDR_MucTieu>> SelectByIdDeCuongAsync(int id_de_cuong)
        {
            return _repositoryWrapper.DeCuong.MucTieu.SelectByIdDeCuongAsync(id_de_cuong);
        }
    }
}
