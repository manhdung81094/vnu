using Contract.Service.DeCuong;
using Model.Table;
using Service.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.DeCuong
{
    public class QuyTacService : CRUDService<CDR_QuyTac>, IQuyTacService
    {
        public QuyTacService(IServiceProvider serviceProvider) : base(serviceProvider)
        {
            this._repositoryBase = _repositoryWrapper.DeCuong.QuyTac;
        }

        public Task<bool> DeleteByIdDeCuongAsync(int id_de_cuong)
        {
            return _repositoryWrapper.DeCuong.QuyTac.DeleteByIdDeCuongAsync(id_de_cuong);
        }

        public Task<IEnumerable<CDR_QuyTac>> SelectByIdDeCuongAsync(int id_de_cuong)
        {
            return _repositoryWrapper.DeCuong.QuyTac.SelectByIdDeCuongAsync(id_de_cuong);
        }
    }
}
