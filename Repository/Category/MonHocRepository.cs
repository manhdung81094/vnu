using Contract.Repository.Base;
using Contract.Repository.Category; 
using Model.Table;
using Repository.Base;

namespace Repository.Category
{
    public class MonHocRepository : CRUDRepository<dmMonHoc>, IMonHocRepository
    {
        public MonHocRepository(IDbConnectionQuerry dbConnection) : base(dbConnection, "id_mon")
        {
        } 
    }
}