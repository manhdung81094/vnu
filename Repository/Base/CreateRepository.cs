using Contract.Repository.Base;
using Repository.Helper;

namespace Repository.Base
{
    public class CreateRepository<T> : BaseRepository, ICreateRepository<T>
    {
        private string _primaryKey = "id_thu_chi_main";
        public CreateRepository(IDbConnectionQuerry dbConnection, string primaryKey = "id_thu_chi_main") : base(dbConnection)
        {
            this._primaryKey = primaryKey;
        }

        public async Task<int> InsertAsync(T obj)
        {
            var tableName = typeof(T).Name;
            var param = DynamicParameterHelper.ConvertWithReturnParam(obj, _primaryKey);
            var result = await _dbConnection.ExcuteScalarAsync(String.Format("{0}_insert", tableName), param, _primaryKey);
            return result;
        }

    }
}

