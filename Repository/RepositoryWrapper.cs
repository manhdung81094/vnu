using Contract.Repository;
using Contract.Repository.Base;
using Contract.Repository.Category; 
using Contract.Repository.Core;
using Contract.Repository.DeCuong;
using Repository.Base;
using Repository.Category;
using Repository.Core;
using Repository.DeCuong;

namespace Repository
{
    public class RepositoryWrapper : BaseRepository, IRepositoryWrapper
    {
        private ICoreRepositoryWrapper _coreRepositoryWrapper;
        private ICategoryRepositoryWrapper _categoryRepositoryWrapper; 
        private IDeCuongRepositoryWrapper _deCuongRepositoryWrapper; 
        public RepositoryWrapper(IDbConnectionQuerry dbConnection) : base(dbConnection)
        {
        }

        public ICoreRepositoryWrapper Core => _coreRepositoryWrapper ??= new CoreRepositoryWrapper(_dbConnection);
        public ICategoryRepositoryWrapper Category => _categoryRepositoryWrapper ??= new CategoryRepositoryWrapper(_dbConnection); 
        public IDeCuongRepositoryWrapper DeCuong => _deCuongRepositoryWrapper ??= new DeCuongRepositoryWrapper(_dbConnection); 
    }
}

