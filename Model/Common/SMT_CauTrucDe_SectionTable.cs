using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model.Common
{
    public class SMT_CauTrucDe_SectionTable
    {
        public int id_chude { get; set; }
        public string ten_chude { get; set; }
        public int id_nhomcauhoi { get; set; }
        public int id_mucdo { get; set; }
        public string muc_tri_nang_name { get; set; }
        public int so_cau { get; set; }
        public int tong_so_cau { get; set; }
        public int order { get; set; }
    }
}
