using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Contract.Repository.Base;
using Model.Table;

namespace Contract.Repository.DeCuong
{
    public interface IChuongSubRepository : ICRUDRepository<CDR_Chuong_Sub>
    {
        Task<IEnumerable<CDR_Chuong_Sub>> SelectByIdChuongAsync(int id_chuong);
    }
}
