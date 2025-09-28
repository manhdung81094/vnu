 
using Contract.Service.Cache;
using Contract.Service.Category;
using Contract.Service.Core;
using Contract.Service.DeCuong; 
using Microsoft.AspNetCore.Http;

namespace Contract.Service
{
    public interface IServiceWrapper
    {
        ICoreSerivceWrapper Core { get; }
        ICacheService Cache { get; }
        ICacheKeyService CacheKey { get; }
        IHttpContextAccessor _httpContextAccessor { get; }
        ICategoryServiceWrapper Category { get; } 
        IDeCuongServiceWrapper DeCuong { get; } 

    }
}

