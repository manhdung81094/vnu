using Contract.Service.Category; 
using Model.Table;
using Service.Base;

namespace Service.Category
{
    public class MonHocService : CRUDServiceWithCache<dmMonHoc>, IMonHocService
    {
        public MonHocService(IServiceProvider serviceProvider) : base(serviceProvider)
        {
            this._repositoryBase = _repositoryWrapper.Category.MonHoc;
        } 
         protected override void ConfigKey()
        {
            this._cacheKey = _serviceWrapper.CacheKey.GetMonhocCacheKey();
            this._itemKeyField = "id_mon";
        }
    }
}