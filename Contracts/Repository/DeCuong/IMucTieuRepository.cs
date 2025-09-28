using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Contract.Repository.Base;
using Model.Table;

namespace Contract.Repository.DeCuong
{
    public interface IMucTieuRepository : ICRUDRepository<CDR_MucTieu>
    {
        Task<IEnumerable<CDR_MucTieu>> SelectByIdDeCuongAsync(int id_de_cuong);
        Task<bool> DeleteByIdDeCuongAsync(int id_de_cuong);
    }
}
