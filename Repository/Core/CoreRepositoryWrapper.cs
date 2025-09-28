using Contract.Repository.Core;
using Contract.Repository.Base;
using Repository.Base;

namespace Repository.Core
{
    public class CoreRepositoryWrapper : BaseRepository, ICoreRepositoryWrapper
    {
        private IExceptionRepository _exceptionRepsitory;

        public CoreRepositoryWrapper(IDbConnectionQuerry dbConnection) : base(dbConnection)
        {
        }

        public IExceptionRepository Exception => _exceptionRepsitory ??= new ExceptionRepository(_dbConnection);
    }
}

