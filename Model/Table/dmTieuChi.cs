using Model.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model.Table
{
    public class dmTieuChi : modify_infor
    {
        public int id { get; set; }
        public int id_chuong_trinh_dao_tao { get; set; }
        public string ten_tieu_chi { get; set; }
        public string ghi_chu { get; set; }
    }
}
