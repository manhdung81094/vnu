using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Contract.Repository.Base;
using Contract.Repository.DeCuong;
using Model.Table;
using Repository.Base;

namespace Repository.DeCuong
{
    public class GvRepository : CRUDRepository<GiaoVien>, IGvRepository
    {
        public GvRepository(IDbConnectionQuerry dbConnection) : base(dbConnection, "id")
        {

        }
    }
}
