 
using Contract.Repository.Base;
using Repository.Base;
using Model.Table;
using Contract.Repository.DeCuong;
using Dapper;

namespace Repository.DeCuong
{
    public class DanhGiaSub2Repository : CRUDRepository<CDR_DanhGia_Sub2>, IDanhGiaSub2Repository
    {
        public DanhGiaSub2Repository(IDbConnectionQuerry dbConnection) : base(dbConnection, "id")
        {
        }

        public async Task<IEnumerable<CDR_DanhGia_Sub2>> SelectByIdDanhGiaSubAsync(int id_danh_gia_sub)
        {
            var param = new DynamicParameters();
            param.Add("id_danh_gia_sub", id_danh_gia_sub);

            return await _dbConnection.SelectAsync<CDR_DanhGia_Sub2>("CDR_DanhGia_Sub2_select_by_id_danh_gia_sub", param);
        }
    }
}

