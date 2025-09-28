using Model.Base;

namespace Model.Table
{
    public class PLAN_GiaoVien
    {
        public string id_cb { get; set; }
        public string ma_cb { get; set; }
        public string ho_ten { get; set; }
        public int id_gioi_tinh { get; set; }
        public DateTime? ngay_sinh { get; set; }
        public int id_dv { get; set; }
        public string ten_don_vi { get; set; }
        public int id_khoa { get; set; }
        public string ten_khoa { get; set; }
        public int id_bm { get; set; }
        public string ten_bo_mon { get; set; }
        public string dien_thoai { get; set; }
        public string email { get; set; }
    }
}