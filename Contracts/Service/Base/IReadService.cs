namespace Contract.Service.Base
{
    public interface IReadService<T> : IBaseService
    {
        Task<IEnumerable<T>> SelectAllAsync();
        Task<T> SelectByIdAsync(int id);
    }
}

