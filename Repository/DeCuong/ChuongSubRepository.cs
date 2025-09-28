using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Contract.Repository.Base;
using Contract.Repository.DeCuong;
using Dapper;
using Model.Table;
using Repository.Base;

namespace Repository.DeCuong
{
    public class ChuongSubRepository : CRUDRepository<CDR_Chuong_Sub>, IChuongSubRepository
    {
        public ChuongSubRepository(IDbConnectionQuerry dbConnection) : base(dbConnection, "id")
        {

        }

        public async Task<IEnumerable<CDR_Chuong_Sub>> SelectByIdChuongAsync(int id_chuong)
        {
            var param = new DynamicParameters();
            param.Add("id_chuong", id_chuong);

            return await _dbConnection.SelectAsync<CDR_Chuong_Sub>("CDR_Chuong_Sub_select_by_id_chuong", param);
        }
    }
}
