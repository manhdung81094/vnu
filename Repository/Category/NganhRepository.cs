using Contract.Repository.Base;
using Contract.Repository.Category;
using Model.Table;
using Repository.Base;

namespace Repository.Category
{
    public class NganhRepository : CRUDRepository<dmNganh>, INganhRepository
    {
        public NganhRepository(IDbConnectionQuerry dbConnection) : base(dbConnection, "id_nganh")
        {
        } 
    }
}