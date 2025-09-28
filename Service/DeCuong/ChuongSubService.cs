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
    public class ChuongSubService : CRUDService<CDR_Chuong_Sub>, IChuongSubService
    {
        public ChuongSubService(IServiceProvider serviceProvider) : base(serviceProvider)
        {
            this._repositoryBase = _repositoryWrapper.DeCuong.ChuongSub;
        }

        public Task<IEnumerable<CDR_Chuong_Sub>> SelectByIdChuongAsync(int id_chuong)
        {
            return _repositoryWrapper.DeCuong.ChuongSub.SelectByIdChuongAsync(id_chuong);
        }
    }
}
