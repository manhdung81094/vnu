using Contract.Repository.Category;
using Contract.Repository.Base;
using Repository.Base;
using Model.Table; 

namespace Repository.Category
{
   public class MucDoRepository : CRUDRepository<dmMucDo>, IMucDoRepository
        {
            public MucDoRepository(IDbConnectionQuerry dbConnection) : base(dbConnection, "id")
            {
            }
        }
}

