using Contract.Repository.Core;
using Contract.Repository.Base;
using Repository.Base;

namespace Repository.Core
{
    public class ExceptionRepository : CRUDRepository<Model.Table.exception>, IExceptionRepository
    {
        public ExceptionRepository(IDbConnectionQuerry dbConnection) : base(dbConnection)
        {
        }
    }
}

