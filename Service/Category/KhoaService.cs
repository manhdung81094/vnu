using Contract.Repository.Category;
using Contract.Service.Category; 
using Model.Table;
using Service.Base;

namespace Service.Category
{
    public class KhoaService : CRUDServiceWithCache<dmKhoa>, IKhoaService
    {
        public KhoaService(IServiceProvider serviceProvider) : base(serviceProvider)
        {
            this._repositoryBase = _repositoryWrapper.Category.Khoa;
        } 
        protected override void ConfigKey()
        {
            this._cacheKey = _serviceWrapper.CacheKey.GetKhoaCacheKey();
            this._itemKeyField = "id_khoa";
        }
    }
}