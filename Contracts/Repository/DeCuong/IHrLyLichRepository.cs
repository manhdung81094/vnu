using Contract.Repository.Base;
using Model.Table;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Contract.Repository.DeCuong
{
    public interface IHrLyLichRepository : ICRUDRepository<HR_LYLICH>
    {
        Task<HR_LYLICH> SelectByIdCbAsync(string id);
    }
}
