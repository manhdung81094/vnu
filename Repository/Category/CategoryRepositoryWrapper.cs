using Contract.Repository.Category;
using Contract.Repository.Base;
using Repository.Base;
using Contract.Service.Category;
using Contracts.Repository.Category;

namespace Repository.Category
{
    public class CategoryRepositoryWrapper : BaseRepository, ICategoryRepositoryWrapper
    {
        private IMucDoRepository _mucDoRepository;
        private ITaiLieuRepository _taiLieuRepository;
        private ITieuChiRepository _tieuChiRepository;
        private IBoMonRepository _boMonRepository;
        private IGiaoVienRepository _giaoVienRepository;
        private IMonHocRepository _monHocRepository;
        private INganhRepository _nganhRepository;
        private IHeRepository _heRepository;
        private IChuanDauRaRepository _chuanDauRaRepository;
        private IKhoaRepository _khoaRepository;

        public CategoryRepositoryWrapper(IDbConnectionQuerry dbConnection) : base(dbConnection)
        {
        }

        public IMucDoRepository MucDo => _mucDoRepository ??= new MucDoRepository(_dbConnection);

        public ITaiLieuRepository TaiLieu => _taiLieuRepository ??= new TaiLieuRepository(_dbConnection);

        public ITieuChiRepository TieuChi => _tieuChiRepository ??= new TieuChiRepository(_dbConnection);

        public IBoMonRepository BoMon => _boMonRepository ??= new BoMonRepository(_dbConnection);

        public IGiaoVienRepository GiaoVien => _giaoVienRepository ??= new GiaoVienRepository(_dbConnection);

        public IMonHocRepository MonHoc => _monHocRepository ??= new MonHocRepository(_dbConnection);

        public INganhRepository Nganh => _nganhRepository ??= new NganhRepository(_dbConnection);

        public IHeRepository He => _heRepository ??= new HeRepository(_dbConnection);

        public IChuanDauRaRepository ChuanDauRa => _chuanDauRaRepository ??= new ChuanDauRaRepository(_dbConnection);
        public IKhoaRepository Khoa => _khoaRepository ??= new KhoaRepository(_dbConnection);
    }
}
