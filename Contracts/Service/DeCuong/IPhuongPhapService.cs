using Contract.Service.Base;
using Model.Table;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Contract.Service.DeCuong
{
    public interface IPhuongPhapService : ICRUDService<CDR_PhuongPhap>
    {
        Task<IEnumerable<CDR_PhuongPhap>> SelectByIdDeCuongAsync(int id_de_cuong);
        Task<bool> DeleteByIdDeCuongAsync(int id_de_cuong);
    }
}
