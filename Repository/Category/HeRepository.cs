using Contract.Repository.Base;
using Contracts.Repository.Category;
using Model.Table;
using Repository.Base;

namespace Repository.Category
{
    public class HeRepository : CRUDRepository<dmHe>, IHeRepository
    {
        public HeRepository(IDbConnectionQuerry dbConnection, string primaryKey = "id_he") : base(dbConnection, primaryKey)
        {
        }
    }
}