using Contract.Repository.Base;
using Contract.Repository.DeCuong;
using Dapper;
using Model.Request.Chuong;
using Model.Table;
using Repository.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.DeCuong
{
    public class ChuongRepository : CRUDRepository<CDR_Chuong>, IChuongRepository
    {
        public ChuongRepository(IDbConnectionQuerry dbConnection) : base(dbConnection, "id")
        {
            
        }

        public Task<bool> DeleteByIdDeCuongAsync(int id_de_cuong)
        {
            var param = new DynamicParameters();
            param.Add("@id_de_cuong", id_de_cuong);
            return _dbConnection.ExecuteAsync("CDR_Chuong_delete_by_id_de_cuong", param);
        }

        public async Task<int> InsertChuongAsync(CDR_Chuong_Request request)
        {
            var param = new DynamicParameters();
            param.Add("id_de_cuong", request.id_de_cuong);
            param.Add("stt", request.stt);
            param.Add("noi_dung", request.noi_dung);

            var result = await _dbConnection.SelectAsync<CDR_Chuong>("CDR_Chuong_add", param);
            if (result != null && result.Any())
            {
                return result.First().id; // Assuming the first item is the inserted one
            }
            return 0;
        }

        public async Task<IEnumerable<CDR_Chuong>> SelectByDeCuongAsync(int id_de_cuong)
        {
            var param = new DynamicParameters();
            param.Add("id_de_cuong", id_de_cuong);

            return await _dbConnection.SelectAsync<CDR_Chuong>("CDR_Chuong_select_by_id_de_cuong", param);
        }
    }
   
}
