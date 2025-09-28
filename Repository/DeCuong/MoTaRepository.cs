 
using Contract.Repository.Base;
using Repository.Base;
using Model.Table;
using Contract.Repository.DeCuong;
using Dapper;

namespace Repository.DeCuong
{
    public class MoTaRepository : CRUDRepository<CDR_MoTa>, IMoTaRepository
    {
        public MoTaRepository(IDbConnectionQuerry dbConnection) : base(dbConnection, "id")
        {
        }

        public Task<bool> DeleteByIdDeCuongAsync(int id_de_cuong)
        {
            var param = new DynamicParameters();
            param.Add("@id_de_cuong", id_de_cuong);
            return _dbConnection.ExecuteAsync("CDR_MoTa_delete_by_id_de_cuong", param);
        }

        public async Task<IEnumerable<CDR_MoTa>> SelectByIdDeCuongAsync(int id_de_cuong)
        {
            var param = new DynamicParameters();
            param.Add("id_de_cuong", id_de_cuong);

            return await _dbConnection.SelectAsync<CDR_MoTa>("CDR_MoTa_select_by_id_de_cuong", param);
        }
    }
}

