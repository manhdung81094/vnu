using Contract.Repository.Category;
using Contract.Repository.Base;
using Repository.Base;
using Model.Table; 

namespace Repository.Category
{
   public class TieuChiRepository : CRUDRepository<dmTieuChi>, ITieuChiRepository
        {
            public TieuChiRepository(IDbConnectionQuerry dbConnection) : base(dbConnection, "id")
            {
            }
        }
}

