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
    public class QuyTacRepository : CRUDRepository<CDR_QuyTac>, IQuyTacRepository
    {
        public QuyTacRepository(IDbConnectionQuerry dbConnection) : base(dbConnection, "id")
        {
        }

        public Task<bool> DeleteByIdDeCuongAsync(int id_de_cuong)
        {
            var param = new DynamicParameters();
            param.Add("@id_de_cuong", id_de_cuong);
            return _dbConnection.ExecuteAsync("CDR_QuyTac_delete_by_id_de_cuong", param);
        }

        public async Task<IEnumerable<CDR_QuyTac>> SelectByIdDeCuongAsync(int id_de_cuong)
        {
            var param = new DynamicParameters();
            param.Add("id_de_cuong", id_de_cuong);

            return await _dbConnection.SelectAsync<CDR_QuyTac>("CDR_QuyTac_select_by_id_de_cuong", param);
        }
    }
}
