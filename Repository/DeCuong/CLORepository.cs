 
using Contract.Repository.Base;
using Repository.Base;
using Model.Table;
using Contract.Repository.DeCuong;
using Dapper;

namespace Repository.DeCuong
{
    public class CLORepository : CRUDRepository<CDR_CLO>, ICLORepository
    {
        public CLORepository(IDbConnectionQuerry dbConnection) : base(dbConnection, "id")
        {
        }

        public Task<bool> DeleteByIdDeCuongAsync(int id_de_cuong)
        {
            var param = new DynamicParameters();
            param.Add("@id_de_cuong", id_de_cuong);
            return _dbConnection.ExecuteAsync("CDR_CLO_delete_by_id_de_cuong", param);
        }

        public async Task<IEnumerable<CDR_CLO>> SelectByIdDeCuongAsync(int id_de_cuong)
        {
            var param = new DynamicParameters();
            param.Add("id_de_cuong", id_de_cuong);

            return await _dbConnection.SelectAsync<CDR_CLO>("CDR_CLO_select_by_id_de_cuong", param);
        }
    }
}

