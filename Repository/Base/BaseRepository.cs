using Contract.Repository.Base;

namespace Repository.Base
{
    public class BaseRepository : IBaseRepository
    {
        protected IDbConnectionQuerry _dbConnection;
        public BaseRepository(IDbConnectionQuerry dbConnection)
        {
            this._dbConnection = dbConnection;
        }
    }
}

