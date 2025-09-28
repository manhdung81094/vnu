

using Model.Base;

namespace Model.Table
{
	public class CDR_DanhGia_Sub2
	{
		public int id { get; set; }
        public int id_danh_gia_sub { get; set; }
        public string ma_clo { get; set; }
		public decimal diem_toi_da { get; set; }
		public string trong_so { get; set; }
	}
}