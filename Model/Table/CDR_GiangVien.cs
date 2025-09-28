using Model.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model.Table
{
    public class CDR_GiangVien
    {
        public int id {get;set;}
	    public int id_de_cuong { get; set; }
        public string id_cb { get; set; }
        public string? email { get; set; }
        public string? sdt { get; set; }
        public string? don_vi_cong_tac { get; set; }
        public bool is_gv_chinh { get; set; }
    }
}
