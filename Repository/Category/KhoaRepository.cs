using Contract.Repository.Base;
using Contract.Repository.Category; 
using Model.Table;
using Repository.Base;

namespace Repository.Category
{
    public class KhoaRepository : CRUDRepository<dmKhoa>, IKhoaRepository
    {
        public KhoaRepository(IDbConnectionQuerry dbConnection) : base(dbConnection, "id_khoa")
        {
        } 
    }
}