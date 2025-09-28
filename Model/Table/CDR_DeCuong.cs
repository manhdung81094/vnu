using Model.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model.Table
{
    public class CDR_DeCuong : modify_infor
    {
        public int id { get; set; }
        public string? ten_de_cuong { get; set; }
        //public int id_he { get; set; }
        public int id_mon { get; set; }
        //public int id_bm { get; set; }
        //public int id_nganh { get; set; }
        public int? id_mon_tien_quyet { get; set; }
        public int? id_mon_ke_tiep { get; set; }
        public bool is_nop { get; set; }
        public bool is_bm_duyet { get; set; }
        public string? user_bm_duyet { get; set; }
        public bool is_khoa_duyet { get; set; }
        public string? user_khoa_duyet { get; set; }
        public bool? is_pdt_duyet { get; set; }
        public string? user_pdt_duyet { get; set; }
        public int status { get; set; }
        public int so_tin_chi { get; set; }
        public string? yeu_cau { get; set; }
        public string? phuong_thuc { get; set; }
        public int loai_hoc_phan { get; set; }
        public int? ly_thuyet { get; set; }
        public int? thuc_hanh { get; set; }
        public int? tu_hoc { get; set; }
        public string? user_gui_duyet { get; set; }
        public DateTime? ngay_gui_duyet { get; set; }

        public string? noi_dung_bm_duyet { get; set; }
        public string? noi_dung_khoa_duyet { get; set; }
        public string? noi_dung_pdt_duyet { get; set; }
    }
}
