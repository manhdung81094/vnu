using Contract.Service.Category;
using Model.Table;
using Service.Base;

namespace Service.Category
{
    public class NganhService : CRUDServiceWithCache<dmNganh>, INganhService
    {
        public NganhService(IServiceProvider serviceProvider) : base(serviceProvider)
        {
            this._repositoryBase = _repositoryWrapper.Category.Nganh;
        }

        protected override void ConfigKey()
        {
            this._cacheKey = _serviceWrapper.CacheKey.GetNganhCacheKey();
            this._itemKeyField = "id_nganh";
        }
    }
}