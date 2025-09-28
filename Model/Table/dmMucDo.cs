using Model.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model.Table
{
    public class dmMucDo : modify_infor
    {
        public int id { get; set; }
        public string ten_muc_do { get; set; }
        public string ghi_chu { get; set; }
    }
}
