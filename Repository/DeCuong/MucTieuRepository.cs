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
    public class MucTieuRepository : CRUDRepository<CDR_MucTieu>, IMucTieuRepository
    {
        public MucTieuRepository(IDbConnectionQuerry dbConnection) : base(dbConnection, "id")
        {

        }

        public Task<bool> DeleteByIdDeCuongAsync(int id_de_cuong)
        {
            var param = new DynamicParameters();
            param.Add("@id_de_cuong", id_de_cuong);
            return _dbConnection.ExecuteAsync("CDR_MucTieu_delete_by_id_de_cuong", param);
        }

        public async Task<IEnumerable<CDR_MucTieu>> SelectByIdDeCuongAsync(int id_de_cuong)
        {
            var param = new DynamicParameters();
            param.Add("id_de_cuong", id_de_cuong);

            return await _dbConnection.SelectAsync<CDR_MucTieu>("CDR_MucTieu_select_by_id_de_cuong", param);
        }
      
    }
}
