using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Contract.Service.Category;
using Model.Table;
using Service.Base;

namespace Service.Category
{
    public class ChuanDauRaService : CRUDService<dmChuanDauRa>, IChuanDauRaService
    {
        public ChuanDauRaService(IServiceProvider serviceProvider) : base(serviceProvider)
        {
            this._repositoryBase = _repositoryWrapper.Category.ChuanDauRa;
        }
    }
}
