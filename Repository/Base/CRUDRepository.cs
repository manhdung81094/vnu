using Contract.Repository.Base;

namespace Repository.Base
{
    public class CRUDRepository<T> : BaseRepository, ICRUDRepository<T>
    {
        private string _primaryKey = "";
        private ICreateRepository<T> _createRepository;
        private IReadRepository<T> _readRepository;
        private IUpdateRepository<T> _updateRepository;
        private IDeleteRepository<T> _deleteRepository;
        public CRUDRepository(IDbConnectionQuerry dbConnection, string primaryKey = "id") : base(dbConnection)
        {
            this._primaryKey = primaryKey;
            this._createRepository = new CreateRepository<T>(dbConnection, primaryKey);
            this._readRepository = new ReadRepository<T>(dbConnection, primaryKey);
            this._updateRepository = new UpdateRepository<T>(dbConnection, primaryKey);
            this._deleteRepository = new DeleteRepository<T>(dbConnection, primaryKey);

        }


        public virtual Task<bool> DeleteAsync(int id, string userId)
        {
            return _deleteRepository.DeleteAsync(id, userId);
        }

        public virtual Task<int> InsertAsync(T obj)
        {
            return _createRepository.InsertAsync(obj);
        }

        public Task<IEnumerable<T>> SelectAllAsync()
        {
            return _readRepository.SelectAllAsync();
        }

        public Task<T> SelectByIdAsync(int id)
        {
            return _readRepository.SelectByIdAsync(id);
        }

        public Task<IEnumerable<T>> SelectChangedAsync(DateTime fromTime)
        {
            return _readRepository.SelectChangedAsync(fromTime);
        }

        public Task<bool> UpdateAsync(T obj)
        {
            return _updateRepository.UpdateAsync(obj);
        }
    }
}

