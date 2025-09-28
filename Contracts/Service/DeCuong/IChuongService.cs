using Contract.Service.Base;
using Model.Request.Chuong;
using Model.Table;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Contract.Service.DeCuong
{
    public interface IChuongService : ICRUDService<CDR_Chuong>
    {
        Task<IEnumerable<CDR_Chuong>> SelectByDeCuongAsync(int id_de_cuong);
        Task<int> InsertChuongAsync(CDR_Chuong_Request request);
        Task<bool> DeleteByIdDeCuongAsync(int id_de_cuong);

    }
}
