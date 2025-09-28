using Contract.Service.Category;
using Contracts.Service.Category;
using Model.Table;
using Service.Base;

namespace Service.Category
{
    public class CategoryServiceWrapper : BaseService, ICategoryServiceWrapper
    {
        private ITieuChiService _tieuChiService;
        private IMucDoService _mucDoService;
        private ITaiLieuService _taiLieuService;
        private IMonHocService _monHocService;
        private IGiaoVienService _giaoVienService;
        private IBoMonService _boMonService;
        private IHeService _heService;
        private INganhService _nganhService;
        private IChuanDauRaService _chuanDauRaService;
        private IKhoaService _khoaService;

        public CategoryServiceWrapper(IServiceProvider serviceProvider) : base(serviceProvider)
        {
        }

        public ITieuChiService TieuChi => _tieuChiService ??= new TieuChiService(_serviceProvider);

        public IMucDoService MucDo => _mucDoService ??= new MucDoService(_serviceProvider);

        public ITaiLieuService TaiLieu => _taiLieuService ??= new TaiLieuService(_serviceProvider);

        public IMonHocService MonHoc => _monHocService ??= new MonHocService(_serviceProvider);

        public IGiaoVienService GiaoVien => _giaoVienService ??= new GiaoVienService(_serviceProvider);

        public IBoMonService BoMon => _boMonService ??= new BoMonService(_serviceProvider);

        public IHeService He => _heService ??= new HeService(_serviceProvider);

        public INganhService Nganh => _nganhService ??= new NganhService(_serviceProvider);

        public IChuanDauRaService ChuanDauRa => _chuanDauRaService ??= new ChuanDauRaService(_serviceProvider);
        public IKhoaService Khoa => _khoaService ??= new KhoaService(_serviceProvider);
    }
}
