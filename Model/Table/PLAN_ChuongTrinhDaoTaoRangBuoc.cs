using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model.Table
{
    public class PLAN_ChuongTrinhDaoTaoRangBuoc
    {
        public int ID_rb { get; set; }
        public int ID_dt { get; set; }
        public int ID_mon { get; set; }
        public int ID_mon_rb { get; set; }
        public int Loai_rang_buoc { get; set; }
        public bool isActive { get; set; }
    }
}
