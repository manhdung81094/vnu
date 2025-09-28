using Contract.Repository.Category;
using Contract.Service.Category;
using Model.Table;
using Service.Base;

namespace Service.Category
{
    public class GiaoVienService : CRUDServiceWithCache<PLAN_GiaoVien>, IGiaoVienService
    {
        public GiaoVienService(IServiceProvider serviceProvider) : base(serviceProvider)
        {
            this._repositoryBase = _repositoryWrapper.Category.GiaoVien;
        }
        
        protected override void ConfigKey()
        {
            this._cacheKey = _serviceWrapper.CacheKey.GetGiaoVienCacheKey();
            this._itemKeyField = "id_cb";
        }
    }
}