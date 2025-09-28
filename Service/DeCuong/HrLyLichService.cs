using Contract.Service.DeCuong;
using Model.Table;
using Service.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.DeCuong
{
    public class HrLyLichService : CRUDService<HR_LYLICH>, IHrLyLichService
    {
        public HrLyLichService(IServiceProvider serviceProvider) : base(serviceProvider)
        {
            this._repositoryBase = _repositoryWrapper.DeCuong.HrLyLich;
        }

        public Task<HR_LYLICH> SelectByIdCbAsync(string id)
        {
            return _repositoryWrapper.DeCuong.HrLyLich.SelectByIdCbAsync(id);
        }
    }
}
