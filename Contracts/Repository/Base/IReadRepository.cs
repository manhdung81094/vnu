namespace Contract.Repository.Base
{
    public interface IReadRepository<T> : IBaseRepository
    {
        Task<IEnumerable<T>> SelectAllAsync();
        Task<T> SelectByIdAsync(int id);
        Task<IEnumerable<T>> SelectChangedAsync(DateTime fromTime);

    }
}

