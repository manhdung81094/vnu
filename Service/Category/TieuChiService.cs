using Contract.Service.Category;
using Model.Table;
using Service.Base;

namespace Service.Category
{
    public class TieuChiService : CRUDService<dmTieuChi>, ITieuChiService
    {
        public TieuChiService(IServiceProvider serviceProvider) : base(serviceProvider)
        {
            this._repositoryBase = _repositoryWrapper.Category.TieuChi;
        } 
    }
}