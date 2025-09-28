using Contract.Repository.Base;
using Dapper;

namespace Repository.Base
{
    public class ReadRepository<T> : BaseRepository, IReadRepository<T>
    {
        private string _primaryKey = "id";

        public ReadRepository(IDbConnectionQuerry dbConnection, string primaryKey = "id") : base(dbConnection)
        {
            this._primaryKey = primaryKey;
        }

        public async Task<IEnumerable<T>> SelectAllAsync()
        {
            var tableName = typeof(T).Name;
            return await _dbConnection.SelectAsync<T>(String.Format("{0}_select_all", tableName));
        }

        public Task<T> SelectByIdAsync(int id)
        {
            var tableName = typeof(T).Name;
            var param = new DynamicParameters();
            param.Add($"@{_primaryKey}", id);
            return _dbConnection.SelectFirstOrDefaultAsync<T>(String.Format("{0}_select_by_id", tableName), param);
        }

        public async Task<IEnumerable<T>> SelectChangedAsync(DateTime fromTime)
        {
            var tableName = typeof(T).Name;
            var param = new DynamicParameters();
            param.Add("@fromTime", fromTime);
            var ressult = await _dbConnection.SelectAsync<T>(String.Format("{0}_select_changed", tableName), param);
            return ressult;
        }
    }
}

