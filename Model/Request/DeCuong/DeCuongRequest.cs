using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.ViewFeatures.Internal;
using Microsoft.Extensions.Hosting;
using Model.Respone.DeCuong;
using Model.Table;

namespace Model.Request.DeCuong
{
    public class DeCuongRequest
    {
        public IDeCuongRequest de_cuong { get; set; }
        public List<IGiangVienRequest>? giang_viens { get; set; }
        public List<CDR_CLO>? clos { get; set; }
        public List<CDR_MoTa>? mo_tas { get; set; }
        public List<IDanhGiaVm>? danh_gias { get; set; }
        public List<CDR_TaiLieu>? tai_lieus { get; set; }
        public List<IChuongVm>? chuongs { get; set; }
        public List<CDR_MucTieu> muc_tieus { get; set; }
        public List<CDR_PhuongPhap>? phuong_phaps { get; set; }
        public List<CDR_QuyTac>? quy_tacs { get; set; }
    }

    public class IDeCuongRequest : CDR_DeCuong {
        //public string ten_he { get; set; }
        //public string ten_nganh { get; set; }
        //public string ten_bm { get; set; }
        public string ten_mon { get; set; }
        public string ten_mon_en { get; set; }
        public string ma_hoc_phan { get; set; }
    }

    public class IGiangVienRequest : CDR_GiangVien
    {
        public string ten_cb { get; set; }
    }
    
}
