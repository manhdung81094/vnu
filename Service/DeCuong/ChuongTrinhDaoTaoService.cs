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
    public class ChuongTrinhDaoTaoService : CRUDService<PLAN_ChuongTrinhDaoTaoRangBuoc>, IChuongTrinhDaoTaoService
    {
        public ChuongTrinhDaoTaoService(IServiceProvider serviceProvider) : base(serviceProvider)
        {
            this._repositoryBase = _repositoryWrapper.DeCuong.ChuongTrinhDaoTao;
        }
    }
}
