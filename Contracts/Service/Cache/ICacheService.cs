using Model.Base;

namespace Contract.Service.Cache
{
    public interface ICacheService
    {
        /// <summary>
        /// Lấy giá trị của 1 key (không sử dụng cho IEnumerable)
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="key"></param>
        /// <returns></returns>
        Task<T> GetDataAsync<T>(CacheKey key);
        /// <summary>
        /// Lấy giá trị của 1 key (không sử dụng cho IEnumerable)
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="key"></param>
        /// <returns></returns>
        T GetData<T>(CacheKey key);
        /// <summary>
        /// Set giá trị của 1 key (không sử dụng cho IEnumerable) (expirationTime theo UTC)
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="key"></param>
        /// <param name="value"></param>
        /// <param name="expirationTime"></param>
        /// <returns></returns>
        Task<bool> SetDataAsync<T>(CacheKey key, T value, DateTimeOffset? expirationTime);
        /// <summary>
        /// Xóa giá trị của 1 key (không sử dụng cho IEnumerable)
        /// </summary>
        /// <param name="key"></param>
        /// <returns></returns>
        Task<bool> RemoveDataAsync(CacheKey key);



        /// <summary>
        /// Lấy giá trị cả list của 1 key
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="listKey"></param>
        /// <returns></returns>
        Task<IEnumerable<T>> GetListDataAsync<T>(CacheKey listKey);
        /// <summary>
        /// Lấy giá trị 1 object từ 1 list
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="listKey"></param>
        /// <param name="itemKeyValue">Giá trị của khóa chính</param>
        /// <returns></returns>
        Task<T> GetDataFromListAsync<T>(CacheKey listKey, string itemKeyValue);


        /// <summary>
        /// Set cache cho 1 list (expirationTime theo UTC)
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="listKey"></param>
        /// <param name="values"></param>
        /// <param name="itemKeyField">Tên field khóa chính</param>
        /// <param name="expirationTime"></param>
        /// <returns></returns>
        Task<bool> SetListDataAsync<T>(CacheKey listKey, IEnumerable<T> values, string itemKeyField = "id", DateTimeOffset? expirationTime = null);
        Task<bool> UpdateItemToListDataAsync<T>(CacheKey listKey, T value, string itemKeyField = "id", DateTimeOffset? expirationTime = null);

        /// <summary>
        /// Xóa giá trị cả list
        /// </summary>
        /// <param name="listKey"></param>
        /// <returns></returns>
        Task<bool> RemoveListDataAsync(CacheKey listKey);
        /// <summary>
        /// Xóa 1 object từ 1 list
        /// </summary>
        /// <param name="listKey"></param>
        /// <param name="itemKeyValue">Giá trị của khóa chính</param>
        /// <returns></returns>
        Task<bool> RemoveListDataAsync(CacheKey listKey, string itemKeyValue);


    }
}