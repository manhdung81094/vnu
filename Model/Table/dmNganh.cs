using Model.Base;

namespace Model.Table
{
    public class dmNganh : modify_infor
    {
        public int id_nganh { get; set; }
        public string ma_nganh { get; set; }
        public string ten_nganh { get; set; }
        public string ten_nganh_en { get; set; }
        public int id_khoa { get; set; }
        public double so_nam_dao_tao { get; set; }
        public string ma_kh { get; set; }
        public string ma_nganh_cu { get; set; }
        public int stt { get; set; }
    }
}