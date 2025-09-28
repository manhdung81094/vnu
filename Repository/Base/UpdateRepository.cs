using Contract.Repository.Base;
using Repository.Helper;

namespace Repository.Base
{
    public class UpdateRepository<T> : BaseRepository, IUpdateRepository<T>
    {
        private string _primaryKey = "id";
        public UpdateRepository(IDbConnectionQuerry dbConnection, string primaryKey = "id") : base(dbConnection)
        {
            this._primaryKey = primaryKey;
        }

        public async Task<bool> UpdateAsync(T obj)
        {
            var tableName = typeof(T).Name;
            var param = DynamicParameterHelper.ConvertWithOutCreatitonParams(obj);
            var result = await _dbConnection.ExecuteAsync(String.Format("{0}_update", tableName), param);
            return result;
        }
    }
}

