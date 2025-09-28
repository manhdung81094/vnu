using Contracts.Service.Category;
using Model.Table;
using Service.Base;

namespace Service.Category
{
    public class HeService : CRUDServiceWithCache<dmHe>, IHeService
    {
        public HeService(IServiceProvider serviceProvider) : base(serviceProvider)
        {
            this._repositoryBase = _repositoryWrapper.Category.He;
        }

        protected override void ConfigKey()
        {
            this._cacheKey = _serviceWrapper.CacheKey.GetHeCacheKey();
            this._itemKeyField = "id_he";
        }
    }
}