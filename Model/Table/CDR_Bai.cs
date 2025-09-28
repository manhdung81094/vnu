

using Model.Base;

namespace Model.Table
{
    public class CDR_Bai : modify_infor
{
	public int id {get;set;}
	public int id_parent {get;set;}
	public int id_chuong {get;set;}
	public string noi_dung {get;set;}
	public int stt {get;set;}
	public int ly_thuyet {get;set;}
	public int bai_tap {get;set;}
	public int thuc_hanh {get;set;}
	public int do_an_mon_hoc {get;set;}
	public int bai_tap_lon {get;set;}
	public int khoa_luan_tot_nghiep {get;set;}
	public int do_an_tot_nghiep {get;set;}
	public int thuc_tap {get;set;}
	public string hoat_dong_gv {get;set;}
	public string hoat_dong_sv {get;set;}
	public string tai_lieu {get;set;}
}
}
