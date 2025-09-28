 
using Contract.Repository.Base;
using Repository.Base;
using Model.Table;
using Contract.Repository.DeCuong;
using Dapper;

namespace Repository.DeCuong
{
    public class DanhGiaSubRepository : CRUDRepository<CDR_DanhGia_Sub>, IDanhGiaSubRepository
    {
        public DanhGiaSubRepository(IDbConnectionQuerry dbConnection) : base(dbConnection, "id")
        {
        }

        public async Task<CDR_DanhGia_Sub> SelectByIdDanhGiaAsync(int id_danh_gia)
        {
            var param = new DynamicParameters();
            param.Add("id_danh_gia", id_danh_gia);

            return await _dbConnection.SelectFirstOrDefaultAsync<CDR_DanhGia_Sub>("CDR_DanhGia_Sub_select_by_id_danh_gia", param);
        }
    }
}

