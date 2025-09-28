using Contract.Service.Category;
using Model.Table;
using Service.Base;

namespace Service.Category
{
    public class TaiLieuService : CRUDService<dmTaiLieu>, ITaiLieuService
    {
        public TaiLieuService(IServiceProvider serviceProvider) : base(serviceProvider)
        {
            this._repositoryBase = _repositoryWrapper.Category.TaiLieu;
        } 
    }
}