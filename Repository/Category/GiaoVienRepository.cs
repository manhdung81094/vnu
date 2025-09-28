using Contract.Repository.Base;
using Contract.Repository.Category; 
using Model.Table;
using Repository.Base;

namespace Repository.Category
{
    public class GiaoVienRepository : CRUDRepository<PLAN_GiaoVien>, IGiaoVienRepository
    {
        public GiaoVienRepository(IDbConnectionQuerry dbConnection) : base(dbConnection, "id_cb")
        {
        } 
    }
}