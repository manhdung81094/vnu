using Contract.Service.Cache;
using Model.Static;
using StackExchange.Redis;
using Model.Base;

namespace Service.Caching
{
    public class RedisCacheService : ICacheService
    {
        private readonly IConnectionMultiplexer _redisConnection;
        public RedisCacheService()
        {
            _redisConnection = ConnectionMultiplexer.Connect(AppSettings.RedisConfig.Host);
        }
        public T GetData<T>(CacheKey key)
        {

            var db = _redisConnection.GetDatabase();
            var value = db.StringGet(key.ToString());
            if (value.HasValue)
            {
                return Newtonsoft.Json.JsonConvert.DeserializeObject<T>(value);
            }
            return default(T);

        }

        public async Task<T> GetDataAsync<T>(CacheKey key)
        {

            var db = _redisConnection.GetDatabase();
            var value = await db.StringGetAsync(key.ToString());
            if (value.HasValue)
            {
                return Newtonsoft.Json.JsonConvert.DeserializeObject<T>(value);
            }
            return default(T);

        }
        public async Task<bool> SetDataAsync<T>(CacheKey key, T value, DateTimeOffset? expirationTime)
        {

            var db = _redisConnection.GetDatabase();
            TimeSpan? timeSpan = null;
            if (expirationTime != null)
            {
                timeSpan = expirationTime.Value.UtcDateTime - DateTime.UtcNow;
            }
            var result = await db.StringSetAsync(key.ToString(), Newtonsoft.Json.JsonConvert.SerializeObject(value), timeSpan);
            return result;

        }
        public async Task<bool> RemoveDataAsync(CacheKey key)
        {

            var db = _redisConnection.GetDatabase();
            var result = await db.KeyDeleteAsync(key.ToString());
            return result;

        }



        //List
        public async Task<IEnumerable<T>> GetListDataAsync<T>(CacheKey listKey)
        {
            var db = _redisConnection.GetDatabase();
            var dbValues = await db.HashGetAllAsync(listKey.ToString());
            dbValues = dbValues.Where(g => !String.IsNullOrEmpty(g.Value)).ToArray();
            return dbValues.Select(item =>
            {
                return Newtonsoft.Json.JsonConvert.DeserializeObject<T>(item.Value);
            }).ToList();

        }
        public async Task<T> GetDataFromListAsync<T>(CacheKey listKey, string itemKeyValue)
        {
            if (string.IsNullOrEmpty(itemKeyValue))
            {
                return default(T);
            }
            var db = _redisConnection.GetDatabase();
            var listKeyString = listKey.ToString();
            var result = await db.HashGetAsync(listKeyString, itemKeyValue);
            return result.HasValue ? Newtonsoft.Json.JsonConvert.DeserializeObject<T>(result) : default(T);
        }





        public async Task<bool> SetListDataAsync<T>(CacheKey listKey, IEnumerable<T> values, string itemKeyField = "id", DateTimeOffset? expirationTime = null)
        {
            if (values == null || !values.Any())
            {
                return false;
            }
            var listKeyString = listKey.ToString();

            var db = _redisConnection.GetDatabase();
            var data = values.Select(value =>
            {
                var itemKey = value.GetType().GetProperty(itemKeyField)?.GetValue(value)?.ToString();
                var valueJson = System.Text.Json.JsonSerializer.Serialize(value);
                return new HashEntry(itemKey, valueJson);
            }).ToArray();
            if (data.Any())
            {
                await db.HashSetAsync(listKeyString, data);
            }
            if (expirationTime.HasValue)
            {
                var timeSpan = expirationTime.Value.UtcDateTime - DateTime.UtcNow;
                await db.KeyExpireAsync(listKeyString, timeSpan);
            }
            return true;
        }
        public async Task<bool> RemoveListDataAsync(CacheKey listKey)
        {
            var db = _redisConnection.GetDatabase();
            var listKeyString = listKey.ToString();

            var result = await db.KeyDeleteAsync(listKeyString);
            return result;
        }
        public async Task<bool> RemoveListDataAsync(CacheKey listKey, string itemKeyValue)
        {
            if (string.IsNullOrEmpty(itemKeyValue))
            {
                return false;
            }
            var listKeyString = listKey.ToString();
            if (string.IsNullOrEmpty(itemKeyValue))
            {
                return false;
            }
            var db = _redisConnection.GetDatabase();
            var result = await db.HashDeleteAsync(listKeyString, itemKeyValue);
            return result;
        }

        public async Task<bool> UpdateItemToListDataAsync<T>(CacheKey listKey, T value, string itemKeyField = "id", DateTimeOffset? expirationTime = null)
        {

            var listKeyString = listKey.ToString();

            var db = _redisConnection.GetDatabase();
            var itemKey = value.GetType().GetProperty(itemKeyField)?.GetValue(value)?.ToString();
            var valueJson = System.Text.Json.JsonSerializer.Serialize(value);
            await db.HashSetAsync(listKeyString, itemKey, valueJson);
            if (expirationTime.HasValue)
            {
                var timeSpan = expirationTime.Value.UtcDateTime - DateTime.UtcNow;
                await db.KeyExpireAsync(listKeyString, timeSpan);
            }
            return true;
        }
    }
}