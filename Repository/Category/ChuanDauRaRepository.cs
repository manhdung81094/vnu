using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Contract.Repository.Base;
using Contract.Repository.Category;
using Contracts.Repository.Category;
using Model.Table;
using Repository.Base;

namespace Repository.Category
{
    public class ChuanDauRaRepository : CRUDRepository<dmChuanDauRa>, IChuanDauRaRepository
    {
        public ChuanDauRaRepository(IDbConnectionQuerry dbConnection, string primaryKey = "id") : base(dbConnection, primaryKey)
        {
        }
    }
}
