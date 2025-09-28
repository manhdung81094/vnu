using Contract.Service.Base;
using Contracts.Service.Category;
using System.ComponentModel.Design;
namespace Contract.Service.Category
{
    public interface ICategoryServiceWrapper : IBaseService
    {
        IMucDoService MucDo { get; }
        ITieuChiService TieuChi { get; }
        ITaiLieuService TaiLieu { get; }
        IMonHocService MonHoc { get; }
        IGiaoVienService GiaoVien { get; }
        IBoMonService BoMon { get; }
        IHeService He { get; }
        INganhService Nganh { get; }
        IChuanDauRaService ChuanDauRa { get; }
        IKhoaService Khoa { get; }
    }
}

