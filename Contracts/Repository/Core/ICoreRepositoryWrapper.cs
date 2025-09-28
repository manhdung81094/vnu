using Contract.Repository.Base;

namespace Contract.Repository.Core
{
    public interface ICoreRepositoryWrapper : IBaseRepository
    {
        IExceptionRepository Exception { get; }
    }
}

