using Contract.Service.DeCuong;
using Service.Base;

namespace Service.DeCuong
{
    public class DeCuongServiceWrapper : BaseService, IDeCuongServiceWrapper
    {
        private CLOService _cloService;
        private IDanhGiaService _danhGiaService;
        private IDanhGiaSubService _danhGiaSubService;
        private IDanhGiaSub2Service _danhGiaSub2Service;
        private IDeCuongService _deCuongService;
        private IGiangVienService _giangVienService;
        private IMoTaService _moTaService;
        private ITaiLieuService _taiLieuService;

        private IChuongService _chuongService;
        private IBaiService _baiService;
        private IChuongSubService _chuongSubService;
        private IMucTieuService _mucTieuService;
        private IGvService _gvService;
        private IPhuongPhapService _phuongPhapService;
        private IHrLyLichService _hrLyLichService;
        private IQuyTacService _quyTacService;
        private IChuongTrinhDaoTaoService _chuongTrinhDaoTaoService;
        public DeCuongServiceWrapper(IServiceProvider serviceProvider) : base(serviceProvider)
        {
        }

        public CLOService CLO => _cloService ??= new CLOService(_serviceProvider);
        ICLOService IDeCuongServiceWrapper.CLO => CLO;

        public IDanhGiaService DanhGia => _danhGiaService ??= new DanhGiaService(_serviceProvider);

        public IDanhGiaSubService DanhGiaSub => _danhGiaSubService ??= new DanhGiaSubService(_serviceProvider);

        public IDanhGiaSub2Service DanhGiaSub2 => _danhGiaSub2Service ??= new DanhGiaSub2Service(_serviceProvider);

        public IDeCuongService DeCuong => _deCuongService ??= new DeCuongService(_serviceProvider);

        public IGiangVienService GiangVien => _giangVienService ??= new GiangVienService(_serviceProvider);

        public IMoTaService Mota => _moTaService ??= new MoTaService(_serviceProvider);

        public ITaiLieuService TaiLieu => _taiLieuService ??= new TaiLieuService(_serviceProvider);
        public IChuongService Chuong => _chuongService ??= new ChuongService(_serviceProvider);

        public IBaiService Bai => _baiService ??= new BaiService(_serviceProvider);

        public IChuongSubService ChuongSub => _chuongSubService ??= new ChuongSubService(_serviceProvider);

        public IMucTieuService MucTieu => _mucTieuService ??= new MucTieuService(_serviceProvider);

        public IGvService Gv => _gvService ?? new GvService(_serviceProvider);

        public IPhuongPhapService PhuongPhap => _phuongPhapService ??= new PhuongPhapService(_serviceProvider);

        public IHrLyLichService HrLyLich => _hrLyLichService ??= new HrLyLichService(_serviceProvider);

        public IQuyTacService QuyTac => _quyTacService ??= new QuyTacService(_serviceProvider);

        public IChuongTrinhDaoTaoService ChuongTrinhDaoTao => _chuongTrinhDaoTaoService ??= new ChuongTrinhDaoTaoService(_serviceProvider);
    }
}
