namespace Contract.Repository.Base
{
    public interface IDeleteRepository<T> : IBaseRepository
    {
        Task<bool> DeleteAsync(int id, string userId);

    }
}

