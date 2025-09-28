using Contract.Repository.Base;
using Contract.Repository.DeCuong;
using Model.Table;
using Repository.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.DeCuong
{
    internal class ChuongTrinhDaoTaoRepository : CRUDRepository<PLAN_ChuongTrinhDaoTaoRangBuoc>, IChuongTrinhDaoTaoRepository
    {
        public ChuongTrinhDaoTaoRepository(IDbConnectionQuerry dbConnection) : base(dbConnection, "id")
        {
        }
    }
}
