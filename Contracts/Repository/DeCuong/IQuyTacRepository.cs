using Contract.Repository.Base;
using Model.Table;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Contract.Repository.DeCuong
{
    public interface IQuyTacRepository : ICRUDRepository<CDR_QuyTac>
    {
        Task<IEnumerable<CDR_QuyTac>> SelectByIdDeCuongAsync(int id_de_cuong);
        Task<bool> DeleteByIdDeCuongAsync(int id_de_cuong);
    }
}
