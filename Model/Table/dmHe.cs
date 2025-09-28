using Model.Base;

namespace Model.Table
{
    public class dmHe : modify_infor
    {
        public int id_he { get; set; }
        public string ma_he { get; set; }
        public string ten_he { get; set; }
        public int quy_che { get; set; }
        public string ten_he_en { get; set; }
        public string ten_bac_hoc { get; set; }
        public string loai_dao_tao { get; set; }
        public string loai_dao_tao_en { get; set; }
        public string ngon_ngu_dao_tao { get; set; }
        public double thoi_gian_dao_tao { get; set; }
        public bool isdoi_tuong_sdh { get; set; }
        public string doi_tuong_dao_tao { get; set; }
        public int he_ngoai_truong { get; set; }
        public bool nghiencuusinh { get; set; }
    }
}