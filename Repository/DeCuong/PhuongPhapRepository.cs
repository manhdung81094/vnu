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
    public class PhuongPhapRepository : CRUDRepository<CDR_PhuongPhap>, IPhuongPhapRepository
    {
        public PhuongPhapRepository(IDbConnectionQuerry dbConnection) : base(dbConnection, "id")
        {
        }

        public async Task<bool> DeleteByIdDeCuongAsync(int id_de_cuong)
        {
            var param = new DynamicParameters();
            param.Add("@id_de_cuong", id_de_cuong);
            return await _dbConnection.ExecuteAsync("CDR_PhuongPhap_delete_by_id_de_cuong", param);
        }

        public async Task<IEnumerable<CDR_PhuongPhap>> SelectByIdDeCuongAsync(int id_de_cuong)
        {
            var param = new DynamicParameters();
            param.Add("id_de_cuong", id_de_cuong);

            return await _dbConnection.SelectAsync<CDR_PhuongPhap>("CDR_PhuongPhap_select_by_id_de_cuong", param);
        }
    }
}
