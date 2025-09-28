using Contract.Repository.Base;
using Contract.Repository.DeCuong;
using Repository.Base; 

namespace Repository.DeCuong
{
    public class DeCuongRepositoryWrapper : BaseRepository, IDeCuongRepositoryWrapper
    {
        private ICLORepository _cloRepository;
        private IDanhGiaRepository _danhGiaRepository;
        private IDanhGiaSubRepository _danhGiaSubRepository;
        private IDanhGiaSub2Repository _danhGiaSub2Repository;
        private IDeCuongRepository _deCuongRepository;
        private IGiangVienRepository _giangVienRepository;
        private IMoTaRepository _moTaRepository;
        private ITaiLieuRepository _taiLieuRepository;

        private IChuongRepository _chuongRepository;
        private IBaiRepository _baiRepository;
        private IChuongSubRepository _chuongSubRepository;
        private IMucTieuRepository _mucTieuRepository;
        private IGvRepository _gvRepository;
        private IPhuongPhapRepository _phuongPhapRepository;
        private IHrLyLichRepository _hrLyLichRepository;
        private IQuyTacRepository _quyTacRepository;
        private IChuongTrinhDaoTaoRepository _chuongTrinhDaoTaoRepository;
        public DeCuongRepositoryWrapper(IDbConnectionQuerry dbConnection) : base(dbConnection)
        {
        }

        public ICLORepository CLO => _cloRepository ??= new CLORepository(_dbConnection);

        public IDanhGiaRepository DanhGia => _danhGiaRepository ??= new DanhGiaRepository(_dbConnection);

        public IDanhGiaSubRepository DanhGiaSub => _danhGiaSubRepository ??= new DanhGiaSubRepository(_dbConnection);

        public IDanhGiaSub2Repository DanhGiaSub2 => _danhGiaSub2Repository ??= new DanhGiaSub2Repository(_dbConnection);

        public IDeCuongRepository DeCuong => _deCuongRepository ??= new DeCuongRepository(_dbConnection);

        public IGiangVienRepository GiangVien => _giangVienRepository ??= new GiangVienRepository(_dbConnection);

        public IMoTaRepository MoTa => _moTaRepository ??= new MoTaRepository(_dbConnection);

        public ITaiLieuRepository TaiLieu => _taiLieuRepository ??= new TaiLieuRepository(_dbConnection);
        public IChuongRepository Chuong => _chuongRepository ??= new ChuongRepository(_dbConnection);

        public IBaiRepository Bai => _baiRepository ??= new BaiRepository(_dbConnection);

        public IChuongSubRepository ChuongSub => _chuongSubRepository ??= new ChuongSubRepository(_dbConnection);

        public IMucTieuRepository MucTieu => _mucTieuRepository ??= new MucTieuRepository(_dbConnection);

        public IGvRepository Gv => _gvRepository ??= new GvRepository(_dbConnection);

        public IPhuongPhapRepository PhuongPhap => _phuongPhapRepository ??= new PhuongPhapRepository(_dbConnection);

        public IHrLyLichRepository HrLyLich => _hrLyLichRepository ??= new HrLyLichRepository(_dbConnection);

        public IQuyTacRepository QuyTac => _quyTacRepository ??= new QuyTacRepository(_dbConnection);

        public IChuongTrinhDaoTaoRepository ChuongTrinhDaoTao => _chuongTrinhDaoTaoRepository ??= new ChuongTrinhDaoTaoRepository(_dbConnection);
    }
}
