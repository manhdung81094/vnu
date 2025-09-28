using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Contract.Service.DeCuong;
using Model.Table;
using Service.Base;

namespace Service.DeCuong
{
    public class GvService : CRUDService<GiaoVien>, IGvService
    {
        public GvService(IServiceProvider serviceProvider) : base(serviceProvider)
        {
            this._repositoryBase = _repositoryWrapper.DeCuong.Gv;
        }
}
}
