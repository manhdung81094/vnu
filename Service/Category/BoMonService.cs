using Contract.Repository.Category;
using Contract.Service.Category;
using Model.Table;
using Service.Base;

namespace Service.Category
{
    public class BoMonService : CRUDServiceWithCache<dmBoMon>, IBoMonService
    {
        public BoMonService(IServiceProvider serviceProvider) : base(serviceProvider)
        {
            this._repositoryBase = _repositoryWrapper.Category.BoMon;
        }
        
        protected override void ConfigKey()
        {
            this._cacheKey = _serviceWrapper.CacheKey.GetBoMonCacheKey();
            this._itemKeyField = "id_bm";
        }
    }
}