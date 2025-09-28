 
using Contract.Repository.Base;
using Repository.Base;
using Model.Table;
using Contract.Repository.DeCuong;
using Dapper;
using Microsoft.AspNetCore.Mvc;

namespace Repository.DeCuong
{
    public class GiangVienRepository : CRUDRepository<CDR_GiangVien>, IGiangVienRepository
    {
        public GiangVienRepository(IDbConnectionQuerry dbConnection) : base(dbConnection, "id")
        {
        }

        public Task<bool> DeleteByIdDeCuongAsync(int id_de_cuong)
        {
            var param = new DynamicParameters();
            param.Add("@id_de_cuong", id_de_cuong);
            return _dbConnection.ExecuteAsync("CDR_GiangVien_delete_by_id_de_cuong", param);
        }

        public async Task<IEnumerable<CDR_GiangVien>> SelectByIdDeCuongAsync(int id_de_cuong)
        {
            var param = new DynamicParameters();
            param.Add("id_de_cuong", id_de_cuong);

            return await _dbConnection.SelectAsync<CDR_GiangVien>("CDR_GiangVien_select_by_id_de_cuong", param);
        }
    }
}

