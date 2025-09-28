namespace Contract.Service.Base
{
    public interface ICreateService<T> : IBaseService
    {
        Task<int> InsertAsync(T obj);

    }
}

