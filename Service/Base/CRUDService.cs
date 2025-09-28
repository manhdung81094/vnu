using Contract.Repository.Base;
using Contract.Service.Base;

namespace Service.Base
{
    public class CRUDService<T> : BaseService, ICRUDService<T>
    {
        private ICreateService<T> _createService;
        private IReadService<T> _readService;
        private IUpdateService<T> _updateService;
        private IDeleteService<T> _deleteService;
        protected ICRUDRepository<T> _repositoryBase;

        public CRUDService(IServiceProvider serviceProvider) : base(serviceProvider)
        {

        }

        public Task<bool> DeleteAsync(int id)
        {
            _deleteService = _deleteService ??= new DeleteService<T>(_serviceProvider, _repositoryBase);
            return _deleteService.DeleteAsync(id);
        }

        public Task<int> InsertAsync(T obj)
        {
            _createService = _createService ??= new CreateService<T>(_serviceProvider, _repositoryBase);
            return _createService.InsertAsync(obj);
        }

        public Task<IEnumerable<T>> SelectAllAsync()
        {
            _readService = _readService ??= new ReadService<T>(_serviceProvider, _repositoryBase);
            return _readService.SelectAllAsync();
        }

        public Task<T> SelectByIdAsync(int id)
        {
            _readService = _readService ??= new ReadService<T>(_serviceProvider, _repositoryBase);
            return _readService.SelectByIdAsync(id);
        }

        public Task<bool> UpdateAsync(T obj)
        {
            _updateService = _updateService ?? new UpdateService<T>(_serviceProvider, _repositoryBase);
            return _updateService.UpdateAsync(obj);
        }
    }
}

