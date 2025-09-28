using Contract.Repository.Base;
using Contract.Repository.Category; 
using Contract.Repository.Core;
using Contract.Repository.DeCuong;

namespace Contract.Repository
{
    public interface IRepositoryWrapper : IBaseRepository
    {
        ICoreRepositoryWrapper Core { get; }
        ICategoryRepositoryWrapper Category { get; }  
        IDeCuongRepositoryWrapper DeCuong { get; }  
       
    }
}

