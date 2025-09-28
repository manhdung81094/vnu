using Contract.Repository.Category;
using Contract.Repository.Base;
using Repository.Base;
using Model.Table; 

namespace Repository.Category
{
   public class TaiLieuRepository : CRUDRepository<dmTaiLieu>, ITaiLieuRepository
        {
            public TaiLieuRepository(IDbConnectionQuerry dbConnection) : base(dbConnection, "id")
            {
            }
        }
}

