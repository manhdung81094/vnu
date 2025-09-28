using Contract.Repository.Base;
using Dapper;

namespace Repository.Base
{
    public class DeleteRepository<T> : BaseRepository, IDeleteRepository<T>
    {
        private string _primaryKey = "id";

        public DeleteRepository(IDbConnectionQuerry dbConnection, string primaryKey = "id") : base(dbConnection)
        {
            this._primaryKey = primaryKey;
        }

        public Task<bool> DeleteAsync(int id, string userId)
        {
            var tableName = typeof(T).Name;
            var param = new DynamicParameters();
            param.Add($"@{_primaryKey}", id);
            param.Add("@user_id", userId);
            return _dbConnection.ExecuteAsync(String.Format("{0}_delete", tableName), param);
        }
    }
}

