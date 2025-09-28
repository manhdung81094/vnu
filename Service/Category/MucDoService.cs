using Contract.Service.Category;
using Model.Table;
using Service.Base;

namespace Service.Category
{
    public class MucDoService : CRUDService<dmMucDo>, IMucDoService
    {
        public MucDoService(IServiceProvider serviceProvider) : base(serviceProvider)
        {
            this._repositoryBase = _repositoryWrapper.Category.MucDo;
        } 
    }
}