using Model.Base; 

namespace Contract.Service.Cache
{
    public interface ICacheKeyService
    {
        CacheKey GetAccessTokenCacheKey(string signature);
        CacheKey GetMucTriNangCacheKey();
        CacheKey GetKhoaCacheKey();
        CacheKey GetBoMonCacheKey();
        CacheKey GetMonhocCacheKey();
        CacheKey GetGiaoVienCacheKey();
        CacheKey GetDonViHanhChinhCacheKey();
        CacheKey GetHeCacheKey();
        CacheKey GetNganhCacheKey();
        CacheKey GetChuanDauRaCacheKey();
    }
}