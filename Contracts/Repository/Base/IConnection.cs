using Dapper;

namespace Contract.Repository.Base
{
    public interface IDbConnectionQuerry
    {
        Task<bool> ExecuteAsync(string StoreProcedureName, DynamicParameters param, string ConnectionName = "DefaultConnection");
        Task<bool> ExcuteQuerryAsync(string Querry, string ConnectionName = "DefaultConnection");
        Task<int> ExcuteScalarAsync(string StoreProcedureName, DynamicParameters param, string returnValueParamName, string ConnectionName = "DefaultConnection");
        Task<IEnumerable<T>> SelectAsync<T>(string StoreProcedueName, string ConnectionName = "DefaultConnection");
        Task<IEnumerable<T>> SelectAsync<T>(string StoreProcedueName, DynamicParameters param, string ConnectionName = "DefaultConnection");
        Task<T> SelectFirstOrDefaultAsync<T>(string StoreProcedueName, string ConnectionName = "DefaultConnection");
        Task<T> SelectFirstOrDefaultAsync<T>(string StoreProcedueName, DynamicParameters param, string ConnectionName = "DefaultConnection");
    }
}

