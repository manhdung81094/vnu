
using Contract.Repository.DeCuong;
using Contract.Service;
using Contract.Service.Cache;
using Contract.Service.Category;
using Contract.Service.Core;
using Contract.Service.DeCuong;
using Service.Cache;
using Service.Caching;
using Service.Category; 
using Service.Core;
using Service.DeCuong;
using Microsoft.AspNetCore.Http;

namespace Service
{
    public class ServiceWrapper : IServiceWrapper
    {
        private IServiceProvider _serviceProvider;
        private ICoreSerivceWrapper _coreSerivceWrapper; 
        private ICacheService _cacheService;
        private ICacheKeyService _cacheKeyService;
        private readonly IHttpContextAccessor _httpContextAccessor;
          private ICategoryServiceWrapper _categoryServiceWrapper;
          private IDeCuongServiceWrapper _deCuongServiceWrapper; 

        public ServiceWrapper(IServiceProvider serviceProvider, IHttpContextAccessor httpContextAccessor)
        {
            this._httpContextAccessor = httpContextAccessor;
            this._serviceProvider = serviceProvider;
        }
        IHttpContextAccessor IServiceWrapper._httpContextAccessor => _httpContextAccessor;

        public ICoreSerivceWrapper Core => _coreSerivceWrapper ??= new CoreServiceWrapper(_serviceProvider);

        public ICacheService Cache => _cacheService ??= new RedisCacheService();

        public ICacheKeyService CacheKey => _cacheKeyService ??= new CacheKeyService(); 
         public ICategoryServiceWrapper Category => _categoryServiceWrapper ??= new CategoryServiceWrapper(_serviceProvider); 
         public IDeCuongServiceWrapper DeCuong => _deCuongServiceWrapper ??= new DeCuongServiceWrapper(_serviceProvider); 
    }
}
