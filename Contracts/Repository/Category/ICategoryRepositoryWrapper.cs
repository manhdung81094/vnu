using Contract.Repository.Base;
using Contract.Service.Category;
using Contracts.Repository.Category;

namespace Contract.Repository.Category
{
    public interface ICategoryRepositoryWrapper : IBaseRepository
    {
        IMucDoRepository MucDo { get; }
        ITieuChiRepository TieuChi { get; }
        ITaiLieuRepository TaiLieu { get; }
        IBoMonRepository BoMon { get; }
        IGiaoVienRepository GiaoVien { get; }
        IMonHocRepository MonHoc { get; }
        INganhRepository Nganh { get; }
        IHeRepository He { get; }
        IChuanDauRaRepository ChuanDauRa { get; }
        IKhoaRepository Khoa { get; }
    }
}