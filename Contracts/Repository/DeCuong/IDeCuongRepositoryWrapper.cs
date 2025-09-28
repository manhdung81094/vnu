using Contract.Repository.Base;
namespace Contract.Repository.DeCuong
{
    public interface IDeCuongRepositoryWrapper : IBaseRepository
    {
        ICLORepository CLO { get; }
        IDanhGiaRepository DanhGia { get; }
        IDanhGiaSubRepository DanhGiaSub { get; }
        IDanhGiaSub2Repository DanhGiaSub2 { get; }
        IDeCuongRepository DeCuong { get; }
        IGiangVienRepository GiangVien { get; }
        IMoTaRepository MoTa { get; }
        ITaiLieuRepository TaiLieu { get; }
        IChuongRepository Chuong { get; }
        IBaiRepository Bai { get; }
        IChuongSubRepository ChuongSub { get; }
        IMucTieuRepository MucTieu { get; }
        IGvRepository Gv { get; }
        IPhuongPhapRepository PhuongPhap { get; }
        IHrLyLichRepository HrLyLich { get; }
        IQuyTacRepository QuyTac { get; }
        IChuongTrinhDaoTaoRepository ChuongTrinhDaoTao { get; }
    }
}