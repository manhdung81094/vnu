using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Contract.Service.Base;
using Model.Table;

namespace Contract.Service.DeCuong
{
    public interface IChuongSubService : ICRUDService<CDR_Chuong_Sub>
    {
        Task<IEnumerable<CDR_Chuong_Sub>> SelectByIdChuongAsync(int id_chuong);
    }
}
