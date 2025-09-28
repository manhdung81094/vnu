using Contract.Service.Cache;
using Model.Base;
using Model.Enum; 

namespace Service.Cache
{
    public class CacheKeyService : ICacheKeyService
    { 
        public CacheKey GetAccessTokenCacheKey(string signature)
        {
            return new CacheKey($"{eCacheKey.ACESS_TOKEN_PROFILE}:{signature}");
        }

        public CacheKey GetBoMonCacheKey()
        {
             return new CacheKey($"{eCacheKey.BO_MON.ToString()}");
        }

        public CacheKey GetDonViHanhChinhCacheKey()
        {
             return new CacheKey($"{eCacheKey.DON_VI_HANH_CHINH.ToString()}");
        }

        public CacheKey GetGiaoVienCacheKey()
        {
            return new CacheKey($"{eCacheKey.GIAO_VIEN.ToString()}");
        }

        public CacheKey GetKhoaCacheKey()
        {
             return new CacheKey($"{eCacheKey.KHOA.ToString()}");
        }

        public CacheKey GetMonhocCacheKey()
        {
            return new CacheKey($"{eCacheKey.MON_HOC.ToString()}");
        }

        public CacheKey GetMucTriNangCacheKey()
        {
            return new CacheKey($"{eCacheKey.MUC_TRI_NANG.ToString()}");
        }
        public CacheKey GetHeCacheKey()
        {
            return new CacheKey($"{eCacheKey.HE.ToString()}");  
        }
        public CacheKey GetNganhCacheKey()
        {
            return new CacheKey($"{eCacheKey.NGANH.ToString()}");
        }
        public CacheKey GetChuanDauRaCacheKey()
        {
            return new CacheKey($"{eCacheKey.CHUAN_DAU_RA.ToString()}");
        }
    }
}