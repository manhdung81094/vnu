
using Contract.Service.DeCuong;
using Model.Table;
using Service.Base;

namespace Service.DeCuong
{
    public class DanhGiaSub2Service : CRUDService<CDR_DanhGia_Sub2>, IDanhGiaSub2Service
    {
        public DanhGiaSub2Service(IServiceProvider serviceProvider) : base(serviceProvider)
        {
            this._repositoryBase = _repositoryWrapper.DeCuong.DanhGiaSub2;
        }

        public Task<IEnumerable<CDR_DanhGia_Sub2>> SelectByIdDanhGiaSubAsync(int id_danh_gia_sub)
        {
            return _repositoryWrapper.DeCuong.DanhGiaSub2.SelectByIdDanhGiaSubAsync(id_danh_gia_sub);
        }
    }
}