 
using Contract.Repository.Base;
using Repository.Base;
using Model.Table;
using Contract.Repository.DeCuong;
using Dapper;

namespace Repository.DeCuong
{
    public class TaiLieuRepository : CRUDRepository<CDR_TaiLieu>, ITaiLieuRepository
    {
        public TaiLieuRepository(IDbConnectionQuerry dbConnection) : base(dbConnection, "id")
        {
        }

        public Task<bool> DeleteByIdDeCuongAsync(int id_de_cuong)
        {
            var param = new DynamicParameters();
            param.Add("@id_de_cuong", id_de_cuong);
            return _dbConnection.ExecuteAsync("CDR_TaiLieu_delete_by_id_de_cuong", param);
        }

        public async Task<IEnumerable<CDR_TaiLieu>> SelectByIdDeCuongAsync(int id_de_cuong)
        {
            var param = new DynamicParameters();
            param.Add("id_de_cuong", id_de_cuong);

            return await _dbConnection.SelectAsync<CDR_TaiLieu>("CDR_TaiLieu_select_by_id_de_cuong", param);
        }
    }
}

