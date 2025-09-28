using Contract.Service.Base;
using Model.Table;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Contract.Service.DeCuong
{
    public interface IHrLyLichService : ICRUDService<HR_LYLICH>
    {
        Task<HR_LYLICH> SelectByIdCbAsync(string id);
    }
}
