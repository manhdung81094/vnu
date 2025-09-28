namespace Contract.Service.Base
{
    public interface ICRUDService<T> : IBaseService,
        ICreateService<T>,
        IReadService<T>,
        IUpdateService<T>,
        IDeleteService<T>
    {
    }
}

