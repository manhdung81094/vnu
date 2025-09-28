using Model.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model.Table
{
    public class CDR_TaiLieu
    {
        public int id { get; set; }
        public int id_tai_lieu { get; set; }
        public string noi_dung_tai_lieu { get; set; }
        public bool is_tai_lieu_chinh { get; set; }
        public int id_de_cuong { get; set; }
    }
}
