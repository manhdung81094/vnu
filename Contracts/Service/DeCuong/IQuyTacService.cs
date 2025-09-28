using Contract.Service.Base;
using Model.Table;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.DeCuong
{
    public interface IQuyTacService : ICRUDService<CDR_QuyTac>
    {
        Task<IEnumerable<CDR_QuyTac>> SelectByIdDeCuongAsync(int id_de_cuong);
        Task<bool> DeleteByIdDeCuongAsync(int id_de_cuong);
    }
}
