using Model.Base;

namespace Model.Table
{
    public class dmMonHoc
    {
        public int id_mon { get; set; }
        public string ky_hieu { get; set; }
        public string ten_viet_tat { get; set; }
        public string ten_mon { get; set; }
        public string ten_tieng_anh { get; set; }
        public string ten_khoa { get; set; }
        public string ten_bo_mon { get; set; }
        public int id_bm { get; set; }
        public int so_hoc_trinh { get; set; }
        public int ly_thuyet { get; set; }
        public int thuc_hanh { get; set; }
        public int tu_hoc { get; set; }
        public int id_khoa { get; set; }
        public bool is_active { get; set; }
    }
}