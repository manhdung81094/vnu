using Model.Table;

namespace Model.Respone.DeCuong
{
    public class DeCuongVm
    {
        public CDR_DeCuong de_cuong { get; set; }
        public List<CDR_GiangVien>? giang_viens { get; set; }
        public List<CDR_CLO>? clos { get; set; } 
        public List<CDR_MoTa>? mo_tas { get; set; }
        public List<IDanhGiaVm>? danh_gias { get; set; }
        public List<CDR_TaiLieu>? tai_lieus { get; set; }
        public List<IChuongVm>? chuongs { get; set; }
        public List<CDR_MucTieu> muc_tieus { get; set; }
        public List<CDR_PhuongPhap>? phuong_phaps { get; set; }
        public List<CDR_QuyTac>? quy_tacs { get; set; }
    }

    public class IDanhGiaVm : CDR_DanhGia
    {
        public CDR_DanhGia_Sub subs { get; set; } 
    }

    //public class IDanhGiaSubVm : CDR_DanhGia_Sub
    //{
    //    public List<CDR_DanhGia_Sub2> sub2s { get; set; }
    //}

    public class IChuongVm : CDR_Chuong
    {
        public List<IChuongSubVm> chuongSub { get; set; }
    }

    public class IChuongSubVm : CDR_Chuong_Sub
    {
       
    }
} 
