using Contract.Service.DeCuong;
using Model.Request.Chuong;
using Model.Table;
using Service.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.DeCuong
{
    public class ChuongService: CRUDService<CDR_Chuong>, IChuongService
    {
        public ChuongService(IServiceProvider serviceProvider) : base(serviceProvider)
        {
            this._repositoryBase = _repositoryWrapper.DeCuong.Chuong;
        }

        public Task<bool> DeleteByIdDeCuongAsync(int id_de_cuong)
        {
            return _repositoryWrapper.DeCuong.Chuong.DeleteByIdDeCuongAsync(id_de_cuong);
        }

        public Task<int> InsertChuongAsync(CDR_Chuong_Request request)
        {
            return _repositoryWrapper.DeCuong.Chuong.InsertChuongAsync(request);
        }

        public Task<IEnumerable<CDR_Chuong>> SelectByDeCuongAsync(int id_de_cuong)
        {
            return _repositoryWrapper.DeCuong.Chuong.SelectByDeCuongAsync(id_de_cuong);
        }
    }
}
