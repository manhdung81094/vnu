
using Contract.Service.Base;
using Service.DeCuong;
namespace Contract.Service.DeCuong
{
    public interface IDeCuongServiceWrapper : IBaseService
    {
        ICLOService CLO { get; }
        IDanhGiaService DanhGia { get; }
        IDanhGiaSubService DanhGiaSub { get; }
        IDanhGiaSub2Service DanhGiaSub2 { get; }
        IDeCuongService DeCuong { get; }
        IGiangVienService GiangVien { get; }
        IMoTaService Mota { get; }
        ITaiLieuService TaiLieu { get; }
        IChuongService Chuong { get; }
        IBaiService Bai { get; }
        IChuongSubService ChuongSub { get; }
        IMucTieuService MucTieu { get; }
        IGvService Gv { get; }
        IPhuongPhapService PhuongPhap { get; }
        IHrLyLichService HrLyLich { get; }
        IQuyTacService QuyTac { get; }
        IChuongTrinhDaoTaoService ChuongTrinhDaoTao { get; }
    }
}

