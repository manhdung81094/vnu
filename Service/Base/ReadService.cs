using Contract.Repository.Base;
using Contract.Service.Base;

namespace Service.Base
{
    public class ReadService<T> : BaseService, IReadService<T>
    {
        protected IReadRepository<T> _readRepository;

        public ReadService(IServiceProvider serviceProvider, IReadRepository<T> readRepository) : base(serviceProvider)
        {
            this._readRepository = readRepository;
        }

        public Task<IEnumerable<T>> SelectAllAsync()
        {
            return _readRepository.SelectAllAsync();
        }

        public Task<T> SelectByIdAsync(int id)
        {
            return _readRepository.SelectByIdAsync(id);
        }
    }
}

