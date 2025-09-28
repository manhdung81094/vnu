using Contract.Repository.Base;
using Contract.Repository.DeCuong;
using Dapper;
using Model.Table;
using Repository.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.DeCuong
{
    public class HrLyLichRepository : CRUDRepository<HR_LYLICH>, IHrLyLichRepository
    {
        public HrLyLichRepository(IDbConnectionQuerry dbConnection) : base(dbConnection, "id")
        {
        }

        public async Task<HR_LYLICH> SelectByIdCbAsync(string id)
        {
            var param = new DynamicParameters();
            param.Add("id_cb", id);
            return await _dbConnection.SelectFirstOrDefaultAsync<HR_LYLICH>("HR_LYLICH_select_by_id_cb", param);

        }
    }
}
