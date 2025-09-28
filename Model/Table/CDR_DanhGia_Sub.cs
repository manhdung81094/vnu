

using Model.Base;

namespace Model.Table
{
	public class CDR_DanhGia_Sub
	{
		public int id { get; set; }
		public int id_danh_gia { get; set; }
		//public string hoat_dong { get; set; }
        public string noi_dung { get; set; }
        public string hinh_thuc { get; set; }
		public int trong_so { get; set; }
        public string ma_clo { get; set; }
    }
}