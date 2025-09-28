using Contract.Repository.Base;
using Model.Table;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Contract.Repository.DeCuong
{
    public interface IPhuongPhapRepository : ICRUDRepository<CDR_PhuongPhap>
    {
        Task<IEnumerable<CDR_PhuongPhap>> SelectByIdDeCuongAsync(int id_de_cuong);
        Task<bool> DeleteByIdDeCuongAsync(int id_de_cuong);
    }
}
