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
    public class PhuongPhapService : CRUDService<CDR_PhuongPhap>, IPhuongPhapService
    {
        public PhuongPhapService(IServiceProvider serviceProvider) : base(serviceProvider)
        {
            this._repositoryBase = _repositoryWrapper.DeCuong.PhuongPhap;
        }

        public Task<bool> DeleteByIdDeCuongAsync(int id_de_cuong)
        {
            return _repositoryWrapper.DeCuong.PhuongPhap.DeleteByIdDeCuongAsync(id_de_cuong);
        }

        public Task<IEnumerable<CDR_PhuongPhap>> SelectByIdDeCuongAsync(int id_de_cuong)
        {
            return _repositoryWrapper.DeCuong.PhuongPhap.SelectByIdDeCuongAsync(id_de_cuong);
        }
    }
}
