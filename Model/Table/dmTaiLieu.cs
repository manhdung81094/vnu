using Model.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model.Table
{
    public class dmTaiLieu : modify_infor
    {
        public int id { get; set; }
        public string ten_tai_lieu { get; set; }
        public string ten_tac_gia { get; set; }
        public int nam_xuat_ban { get; set; }
        public string nha_xuat_ban { get; set; }
    }
}
