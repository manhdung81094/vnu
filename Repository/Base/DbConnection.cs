

using System.Data;
using System.Data.SqlClient;
using Contract.Repository.Base;
using Dapper;
using Model.Static;

namespace Repository.Base
{
    public class DbConnectionQuerry : IDbConnectionQuerry
    {

        private static IDbConnection GetConnection(string ConnectionName)
        {

            var ConnectionString = AppSettings.DbConnections[ConnectionName];
            IDbConnection _db = new SqlConnection(ConnectionString);
            return _db;
        }


        public async Task<bool> ExcuteQuerryAsync(string Querry, string ConnectionName = "DefaultConnection")
        {

            await GetConnection(ConnectionName).ExecuteAsync(Querry, null, commandType: CommandType.Text);
            return true;

        }

        public async Task<int> ExcuteScalarAsync(string StoreProcedureName, DynamicParameters param, string returnValueParamName, string ConnectionName = "DefaultConnection")
        {

            await GetConnection(ConnectionName).ExecuteScalarAsync(StoreProcedureName, param, commandType: CommandType.StoredProcedure);
            return param.Get<int>(returnValueParamName);

        }

        public async Task<bool> ExecuteAsync(string StoreProcedureName, DynamicParameters param, string ConnectionName = "DefaultConnection")
        {

            await GetConnection(ConnectionName).ExecuteAsync(StoreProcedureName, param, commandType: CommandType.StoredProcedure);
            return true;

        }

        public Task<IEnumerable<T>> SelectAsync<T>(string StoreProcedueName, string ConnectionName = "DefaultConnection")
        {
            return SqlMapper.QueryAsync<T>(GetConnection(ConnectionName), StoreProcedueName, null, commandType: System.Data.CommandType.StoredProcedure);
        }

        public Task<IEnumerable<T>> SelectAsync<T>(string StoreProcedueName, DynamicParameters param, string ConnectionName = "DefaultConnection")
        {
            return SqlMapper.QueryAsync<T>(GetConnection(ConnectionName), StoreProcedueName, param, commandType: System.Data.CommandType.StoredProcedure);

        }

        public Task<T> SelectFirstOrDefaultAsync<T>(string StoreProcedueName, string ConnectionName = "DefaultConnection")
        {
            return SqlMapper.QueryFirstOrDefaultAsync<T>(GetConnection(ConnectionName), StoreProcedueName, null, commandType: System.Data.CommandType.StoredProcedure);
        }

        public Task<T> SelectFirstOrDefaultAsync<T>(string StoreProcedueName, DynamicParameters param, string ConnectionName = "DefaultConnection")
        {
            return SqlMapper.QueryFirstOrDefaultAsync<T>(GetConnection(ConnectionName), StoreProcedueName, param, commandType: System.Data.CommandType.StoredProcedure);
        }
    }
}

