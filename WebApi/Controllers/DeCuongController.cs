using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;
using Common;
using Contract.Service;
using Contract.Service.Category;
using Contract.Service.DeCuong;
using DocumentFormat.OpenXml;
using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Wordprocessing;
using HtmlToOpenXml;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Model.Request.DeCuong;
using Model.Respone.DeCuong;
using Model.Table;
using PuppeteerSharp;
using PuppeteerSharp.Media;
using Service.DeCuong;

namespace WebApi.Controllers.Category
{
    [ApiController]
    [Route("api/de-cuong")]
    //[MustLogged]

    public class DeCuongController : BaseController
    {
        private IDeCuongService _deCuongService;
        private IGiangVienService _giangVienService;
        private ICLOService _cloService;
        private IMoTaService _moTaService;
        private Contract.Service.DeCuong.ITaiLieuService _taiLieuService;
        private IDanhGiaService _danhGiaService;
        private IDanhGiaSubService _danhGiaSubService;
        //private IDanhGiaSub2Service _danhGiaSub2Service;
        private IChuongService _chuongService;
        private IChuongSubService _chuongSubService;
        private IMucTieuService _mucTieuService;
        private IMonHocService _monHocService;
        private IGvService _gvService;
        private IPhuongPhapService _phuongPhapService;
        private IHrLyLichService _hrLyLichService;
        private IQuyTacService _quyTacService;
        private IChuongTrinhDaoTaoService _chuongTrinhDaoTaoService;

        public DeCuongController(IServiceWrapper serviceWrapper) : base(serviceWrapper)
        {
            this._deCuongService = serviceWrapper.DeCuong.DeCuong;
            this._giangVienService = serviceWrapper.DeCuong.GiangVien;
            this._cloService = serviceWrapper.DeCuong.CLO;
            this._moTaService = serviceWrapper.DeCuong.Mota;
            this._taiLieuService = serviceWrapper.DeCuong.TaiLieu;
            this._danhGiaService = serviceWrapper.DeCuong.DanhGia;
            this._danhGiaSubService = serviceWrapper.DeCuong.DanhGiaSub;
            //this._danhGiaSub2Service = serviceWrapper.DeCuong.DanhGiaSub2;
            this._chuongService = serviceWrapper.DeCuong.Chuong;
            this._chuongSubService = serviceWrapper.DeCuong.ChuongSub;
            this._mucTieuService = serviceWrapper.DeCuong.MucTieu;
            this._monHocService = serviceWrapper.Category.MonHoc;
            this._gvService = serviceWrapper.DeCuong.Gv;
            this._phuongPhapService = serviceWrapper.DeCuong.PhuongPhap;
            this._hrLyLichService = serviceWrapper.DeCuong.HrLyLich;
            this._quyTacService = serviceWrapper.DeCuong.QuyTac;
            this._chuongTrinhDaoTaoService = serviceWrapper.DeCuong.ChuongTrinhDaoTao;
        }

        [HttpGet("chuong-trinh-dao-tao")]
        public async Task<ContentResult> SelectAllCTDTAsync()
        {
            var result = await this._chuongTrinhDaoTaoService.SelectAllAsync();
            return this.OK(result);
        }

        [HttpGet("giao-vien")]
        public async Task<ContentResult> SelectAllGiaoVienAsync()
        {
            var result = await this._gvService.SelectAllAsync();
            return this.OK(result);
        }

        [HttpGet("ly-lich")]
        public async Task<ContentResult> SelectAllLyLichAsync()
        {
            var result = await this._hrLyLichService.SelectAllAsync();
            return this.OK(result);
        }

        [HttpGet]
        public async Task<ContentResult> SelectAllAsync()
        {
            var result = await this._deCuongService.SelectAllAsync();
            return this.OK(result);
        }

        [HttpGet, Route("{id}")]
        public async Task<ContentResult> SelectByIdAsync([FromRoute] int id)
        {
            if (id <= 0)
            {
                return this.BadRequest("ID không hợp lệ");
            }
            try
            {
                var deCuong = await this._deCuongService.SelectByIdAsync(id);
                if (deCuong == null)
                {
                    return this.BadRequest("Không tìm thấy đề cương với ID: " + id);
                }
                DeCuongVm result = new DeCuongVm();
                result.de_cuong = deCuong;
                var giangViens = await this._giangVienService.SelectByIdDeCuongAsync(id);
                var clos = await this._cloService.SelectByIdDeCuongAsync(id);
                var moTas = await this._moTaService.SelectByIdDeCuongAsync(id);
                var taiLieus = await this._taiLieuService.SelectByIdDeCuongAsync(id);
                var danhGias = await this._danhGiaService.SelectByIdDeCuongAsync(id);
                var mucTieus = await this._mucTieuService.SelectByIdDeCuongAsync(id);
                var phuongPhaps = await this._phuongPhapService.SelectByIdDeCuongAsync(id);
                var quyTacs = await this._quyTacService.SelectByIdDeCuongAsync(id);
                // Fill danh_gias with subs (already present in your code)
                if (danhGias != null && danhGias.Any())
                {
                    result.danh_gias = new List<IDanhGiaVm>();
                    foreach (var dg in danhGias)
                    {
                        var dgVm = new IDanhGiaVm
                        {
                            id = dg.id,
                            id_de_cuong = dg.id_de_cuong,
                            //stt = dg.stt,
                            //ten_thanh_phan = dg.ten_thanh_phan,
                            //phan_tram = dg.phan_tram,
                            subs = new CDR_DanhGia_Sub()
                        };

                        var subs = await this._danhGiaSubService.SelectByIdDanhGiaAsync(dg.id);
                        if (subs != null)
                        {
                            dgVm.subs = subs;
                        }
                        result.danh_gias.Add(dgVm);
                    }
                }

                // Fill chuongs with chuongSub
                var chuongs = await this._chuongService.SelectByDeCuongAsync(id);
                if (chuongs != null && chuongs.Any())
                {
                    result.chuongs = new List<IChuongVm>();
                    foreach (var ch in chuongs)
                    {
                        var chVm = new IChuongVm
                        {
                            id = ch.id,
                            id_de_cuong = ch.id_de_cuong,
                            stt = ch.stt,
                            noi_dung = ch.noi_dung,
                            chuongSub = new List<IChuongSubVm>()
                        };

                        var chuongSubs = await this._chuongSubService.SelectByIdChuongAsync(ch.id);
                        if (chuongSubs != null && chuongSubs.Any())
                        {
                            foreach (var sub in chuongSubs)
                            {
                                var subVm = new IChuongSubVm
                                {
                                    id = sub.id,
                                    id_chuong = sub.id_chuong,
                                    noi_dung = sub.noi_dung,
                                    ly_thuyet = sub.ly_thuyet,
                                    bai_tap = sub.bai_tap,
                                    thuc_hanh = sub.thuc_hanh,
                                    do_an_mon_hoc = sub.do_an_mon_hoc,
                                    bai_tap_lon = sub.bai_tap_lon,
                                    khoa_luan_tot_nghiep = sub.khoa_luan_tot_nghiep,
                                    do_an_tot_nghiep = sub.do_an_tot_nghiep,
                                    thuc_tap = sub.thuc_tap,
                                    tu_hoc = sub.tu_hoc,
                                    hoat_dong_gv = sub.hoat_dong_gv,
                                    hoat_dong_sv = sub.hoat_dong_sv,
                                    tai_lieu = sub.tai_lieu,
                                    id_clos = sub.id_clos
                                };
                                chVm.chuongSub.Add(subVm);
                            }
                        }
                        result.chuongs.Add(chVm);
                    }
                }

                result.giang_viens = giangViens.ToList();
                result.clos = clos.ToList();
                result.mo_tas = moTas.ToList();
                result.tai_lieus = taiLieus.ToList();
                result.muc_tieus = mucTieus.ToList();
                result.phuong_phaps = phuongPhaps.ToList();
                result.quy_tacs = quyTacs.ToList();

                return this.OK(result);
            }
            catch (Exception ex)
            {
                return this.BadRequest("Lỗi : " + ex.Message);
            }


        }

        [HttpPost]
        public async Task<ContentResult> InsertAsync([FromBody] DeCuongVm request)
        {
            try
            {
                var deCuong = request.de_cuong;
                var checkExist = await _deCuongService.CheckExistHocPhan(deCuong.id_mon);
                if (checkExist)
                {
                    return this.BadRequest("Đề cương học phần này đã tồn tại !");
                }

                var monHoc = await _monHocService.SelectByIdAsync(deCuong.id_mon);
                deCuong.ten_de_cuong = monHoc.ten_mon;
                deCuong.created_time = DateTime.Now;
                deCuong.last_modified_times = DateTime.Now;
                deCuong.SetInsertInfo(GetUserId());

                int idDeCuong = await this._deCuongService.InsertAsync(deCuong);
                if (idDeCuong <= 0)
                {
                    return this.BadRequest("Lỗi khi thêm đề cương");
                }

                // Insert GiangVien
                if (request.giang_viens.Any())
                {
                    foreach (var item in request.giang_viens)
                    {
                        item.id_de_cuong = idDeCuong;
                        int id = await _giangVienService.InsertAsync(item);
                        if (id <= 0)
                            return this.BadRequest("Lỗi khi thêm giảng viên");
                    }
                }

                // Insert CLO
                if (request.clos.Any())
                {
                    foreach (var item in request.clos)
                    {
                        item.id_de_cuong = idDeCuong;
                        int id = await _cloService.InsertAsync(item);
                        if (id <= 0)
                            return this.BadRequest("Lỗi khi thêm CLO");
                    }
                }

                // Insert MucTieu
                if (request.muc_tieus.Any())
                {
                    foreach (var item in request.muc_tieus)
                    {
                        item.id_de_cuong = idDeCuong;
                        int id = await _mucTieuService.InsertAsync(item);
                        if (id <= 0)
                            return this.BadRequest("Lỗi khi thêm mục tiêu");
                    }
                }

                // Insert Mota
                if (request.mo_tas.Any())
                {
                    foreach (var item in request.mo_tas)
                    {
                        item.id_de_cuong = idDeCuong;
                        int id = await _moTaService.InsertAsync(item);
                        if (id <= 0)
                            return this.BadRequest("Lỗi khi thêm mô tả");
                    }
                }

                // Insert QuyTac
                if (request.quy_tacs.Any())
                {
                    foreach (var item in request.quy_tacs)
                    {
                        item.id_de_cuong = idDeCuong;
                        int id = await _quyTacService.InsertAsync(item);
                        if (id <= 0)
                            return this.BadRequest("Lỗi khi thêm mô tả");
                    }
                }

                // Insert PhuongPhap
                if (request.phuong_phaps.Any())
                {
                    foreach (var item in request.phuong_phaps)
                    {
                        item.id_de_cuong = idDeCuong;
                        int id = await _phuongPhapService.InsertAsync(item);
                        if (id <= 0)
                            return this.BadRequest("Lỗi khi thêm phương pháp");
                    }
                }

                // Insert DanhGia
                if (request.danh_gias.Any())
                {
                    foreach (var item in request.danh_gias)
                    {
                        var danhGia = new CDR_DanhGia
                        {
                            id_de_cuong = idDeCuong,
                            //stt = item.stt,
                            //ten_thanh_phan = item.ten_thanh_phan,
                            //phan_tram = item.phan_tram
                        };

                        int idDanhGia = await _danhGiaService.InsertAsync(danhGia);
                        if (idDanhGia <= 0)
                            return this.BadRequest("Lỗi khi thêm đánh giá");

                        if (item.subs != null)
                        {

                            var danhGiaSubs = new CDR_DanhGia_Sub
                            {
                                id_danh_gia = idDanhGia,
                                noi_dung = item.subs.noi_dung,
                                hinh_thuc = item.subs.hinh_thuc,
                                trong_so = item.subs.trong_so,
                                ma_clo = item.subs.ma_clo
                            };

                            int idDanhGiaSub = await _danhGiaSubService.InsertAsync(danhGiaSubs);
                            if (idDanhGiaSub <= 0)
                                return this.BadRequest("Lỗi khi thêm thành phần đánh giá");

                            //if (sub.sub2s != null && sub.sub2s.Count > 0)
                            //{
                            //    foreach (var sub2 in sub.sub2s)
                            //    {
                            //        var danhGia_Sub2s = new CDR_DanhGia_Sub2
                            //        {
                            //            id_danh_gia_sub = idDanhGiaSub,
                            //            ma_clo = sub2.ma_clo,
                            //            diem_toi_da = sub2.diem_toi_da,
                            //            trong_so = sub2.trong_so
                            //        };

                            //        int idDanhGiaSub2 = await _danhGiaSub2Service.InsertAsync(danhGia_Sub2s);
                            //        if (idDanhGiaSub2 <= 0)
                            //            throw new Exception("Lỗi khi thêm đánh giá sub 2");
                            //    }
                            //}

                        }
                    }
                }

                //Insert Chuong
                if (request.chuongs.Any())
                {
                    foreach (var item in request.chuongs)
                    {
                        CDR_Chuong chuong = new CDR_Chuong();
                        chuong.id_de_cuong = idDeCuong;
                        chuong.stt = item.stt;
                        chuong.noi_dung = item.noi_dung;

                        int idChuong = await _chuongService.InsertAsync(chuong);
                        if (idChuong <= 0)
                            return this.BadRequest("Lỗi khi thêm nội dung chương");
                        // Insert ChuongSub
                        if (item.chuongSub != null && item.chuongSub.Count > 0)
                        {
                            CDR_Chuong_Sub chuongSub = new CDR_Chuong_Sub();
                            foreach (var sub in item.chuongSub)
                            {
                                chuongSub.id_chuong = idChuong;
                                chuongSub.noi_dung = sub.noi_dung;
                                chuongSub.ly_thuyet = sub.ly_thuyet;
                                chuongSub.bai_tap = sub.bai_tap;
                                chuongSub.thuc_tap = sub.thuc_hanh;
                                chuongSub.do_an_mon_hoc = sub.do_an_mon_hoc;
                                chuongSub.bai_tap_lon = sub.bai_tap_lon;
                                chuongSub.khoa_luan_tot_nghiep = sub.khoa_luan_tot_nghiep;
                                chuongSub.do_an_tot_nghiep = sub.do_an_tot_nghiep;
                                chuongSub.thuc_tap = sub.thuc_tap;
                                chuongSub.hoat_dong_gv = sub?.hoat_dong_gv;
                                chuongSub.hoat_dong_sv = sub?.hoat_dong_sv;
                                chuongSub.tai_lieu = sub?.tai_lieu;
                                chuongSub.id_clos = sub?.id_clos;

                                int idChuongSub = await _chuongSubService.InsertAsync(chuongSub);
                                if (idChuongSub <= 0)
                                    return this.BadRequest("Lỗi khi thêm nội dung chương");
                            }
                        }
                    }
                }

                // Insert TaiLieu
                if (request.tai_lieus.Any())
                {
                    foreach (var item in request.tai_lieus)
                    {
                        item.id_de_cuong = idDeCuong;
                        int id = await _taiLieuService.InsertAsync(item);
                        if (id <= 0)
                            return this.BadRequest("Lỗi khi thêm tài liệu");
                    }
                }

                return this.OK(idDeCuong);
            }
            catch (Exception ex)
            {
                return this.BadRequest("Lỗi khi thêm mới: " + ex.Message);
            }
        }

        [HttpPost, Route("progress")]
        public async Task<ContentResult> ProgressAsync([FromBody] DeCuongProgressRequest request)
        {
            request.progress_by = this.GetUserId();

            var update = await _deCuongService.ProgressAsync(request);
            return update ? this.OK(update) : this.BadRequest("Thất bại");
        }

        [HttpPut]
        public async Task<ContentResult> UpdateAsync([FromBody] DeCuongVm request)
        {
            try
            {
                var deCuong = request.de_cuong;
                if (deCuong == null || deCuong.id <= 0)
                    return this.BadRequest("Dữ liệu đề cương không hợp lệ");

                var exist = await this._deCuongService.SelectByIdAsync(deCuong.id);
                if (exist == null)
                    return this.BadRequest("Không tìm thấy đề cương để cập nhật");

                deCuong.last_modified_times = DateTime.Now;
                var monHoc = await _monHocService.SelectByIdAsync(deCuong.id_mon);
                deCuong.ten_de_cuong = monHoc.ten_mon;
                deCuong.SetUpdateInfo(GetUserId());

                var updateResult = await this._deCuongService.UpdateAsync(deCuong);
                if (!updateResult)
                    return this.BadRequest("Lỗi khi cập nhật đề cương");

                int idDeCuong = deCuong.id;

                // Remove all related data
                await _giangVienService.DeleteByIdDeCuongAsync(idDeCuong);
                await _cloService.DeleteByIdDeCuongAsync(idDeCuong);
                await _mucTieuService.DeleteByIdDeCuongAsync(idDeCuong);
                await _moTaService.DeleteByIdDeCuongAsync(idDeCuong);
                await _taiLieuService.DeleteByIdDeCuongAsync(idDeCuong);
                await _phuongPhapService.DeleteByIdDeCuongAsync(idDeCuong);
                await _quyTacService.DeleteByIdDeCuongAsync(idDeCuong);

                // Remove all DanhGia, DanhGiaSub, DanhGiaSub2
                await _danhGiaService.DeleteByIdDeCuongAsync(idDeCuong);
                //// Remove all Chuong and ChuongSub
                await _chuongService.DeleteByIdDeCuongAsync(idDeCuong);

                // Re-insert related data
                if (request.giang_viens.Any())
                {
                    foreach (var item in request.giang_viens)
                    {
                        item.id_de_cuong = idDeCuong;
                        await _giangVienService.InsertAsync(item);
                    }
                }
                if (request.clos.Any())
                {
                    foreach (var item in request.clos)
                    {
                        item.id_de_cuong = idDeCuong;
                        await _cloService.InsertAsync(item);
                    }
                }
                if (request.muc_tieus.Any())
                {
                    foreach (var item in request.muc_tieus)
                    {
                        item.id_de_cuong = idDeCuong;
                        await _mucTieuService.InsertAsync(item);
                    }
                }
                if (request.mo_tas.Any())
                {
                    foreach (var item in request.mo_tas)
                    {
                        item.id_de_cuong = idDeCuong;
                        await _moTaService.InsertAsync(item);
                    }
                }
                if (request.quy_tacs.Any())
                {
                    foreach (var item in request.quy_tacs)
                    {
                        item.id_de_cuong = idDeCuong;
                        await _quyTacService.InsertAsync(item);
                    }
                }
                if (request.phuong_phaps.Any())
                {
                    foreach (var item in request.phuong_phaps)
                    {
                        item.id_de_cuong = idDeCuong;
                        await _phuongPhapService.InsertAsync(item);
                    }
                }
                if (request.tai_lieus.Any())
                {
                    foreach (var item in request.tai_lieus)
                    {
                        item.id_de_cuong = idDeCuong;
                        await _taiLieuService.InsertAsync(item);
                    }
                }
                if (request.danh_gias.Any())
                {
                    foreach (var item in request.danh_gias)
                    {
                        var danhGia = new CDR_DanhGia
                        {
                            id_de_cuong = idDeCuong,
                            //stt = item.stt,
                            //ten_thanh_phan = item.ten_thanh_phan,
                            //phan_tram = item.phan_tram
                        };
                        int idDanhGia = await _danhGiaService.InsertAsync(danhGia);
                        if (item.subs != null)
                        {

                            var danhGiaSubs = new CDR_DanhGia_Sub
                            {
                                id_danh_gia = idDanhGia,
                                noi_dung = item.subs.noi_dung,
                                hinh_thuc = item.subs.hinh_thuc,
                                trong_so = item.subs.trong_so,
                                ma_clo = item.subs.ma_clo
                            };
                            int idDanhGiaSub = await _danhGiaSubService.InsertAsync(danhGiaSubs);
                            //if (sub.sub2s != null)
                            //{
                            //    foreach (var sub2 in sub.sub2s)
                            //    {
                            //        var danhGia_Sub2s = new CDR_DanhGia_Sub2
                            //        {
                            //            id_danh_gia_sub = idDanhGiaSub,
                            //            ma_clo = sub2.ma_clo,
                            //            diem_toi_da = sub2.diem_toi_da,
                            //            trong_so = sub2.trong_so
                            //        };
                            //        await _danhGiaSub2Service.InsertAsync(danhGia_Sub2s);
                            //    }
                            //}

                        }
                    }
                }
                if (request.chuongs.Any())
                {
                    foreach (var item in request.chuongs)
                    {
                        var chuong = new CDR_Chuong
                        {
                            id_de_cuong = idDeCuong,
                            stt = item.stt,
                            noi_dung = item.noi_dung
                        };
                        int idChuong = await _chuongService.InsertAsync(chuong);
                        if (item.chuongSub != null)
                        {
                            foreach (var sub in item.chuongSub)
                            {
                                var chuongSub = new CDR_Chuong_Sub
                                {
                                    id_chuong = idChuong,
                                    noi_dung = sub.noi_dung,
                                    ly_thuyet = sub.ly_thuyet,
                                    bai_tap = sub.bai_tap,
                                    thuc_hanh = sub.thuc_hanh,
                                    do_an_mon_hoc = sub.do_an_mon_hoc,
                                    bai_tap_lon = sub.bai_tap_lon,
                                    khoa_luan_tot_nghiep = sub.khoa_luan_tot_nghiep,
                                    do_an_tot_nghiep = sub.do_an_tot_nghiep,
                                    thuc_tap = sub.thuc_tap,
                                    tu_hoc = sub.tu_hoc,
                                    hoat_dong_gv = sub.hoat_dong_gv,
                                    hoat_dong_sv = sub.hoat_dong_sv,
                                    tai_lieu = sub.tai_lieu,
                                    id_clos = sub.id_clos
                                };
                                await _chuongSubService.InsertAsync(chuongSub);
                            }
                        }
                    }
                }

                return this.OK(request);
            }
            catch (Exception ex)
            {

                return this.BadRequest("Lỗi khi sửa: " + ex.Message);
            }
        }

        [HttpDelete, Route("{id}")]
        public async Task<ContentResult> DeleteAsync([FromRoute] int id)
        {
            var obj = await _deCuongService.SelectByIdAsync(id);
            if (obj == null) return this.BadRequest("Dữ liệu không hợp lệ");
            var isDeleted = await _deCuongService.DeleteAsync(id);
            if (isDeleted)
            {
                return this.OK();
            }
            return this.BadRequest();
        }

        [HttpPost("export-word")]
        public async Task<IActionResult> ExportWordAsync([FromBody] DeCuongRequest request)
        {
            bool coTaiLieuChinh = false;
            if (request.tai_lieus.Any())
            {
                coTaiLieuChinh = request.tai_lieus.Any(x => x.is_tai_lieu_chinh);
            }

            string templatePath = "";

            if (coTaiLieuChinh)
            {
                templatePath = Path.Combine(Directory.GetCurrentDirectory(), "Template", "template-1.docx");
            }
            else
            {
                templatePath = Path.Combine(Directory.GetCurrentDirectory(), "Template", "template-2.docx");
            }


            if (!System.IO.File.Exists(templatePath))
                return BadRequest("Template file not found.");

            byte[] resultBytes;

            using (var ms = new MemoryStream())
            {
                // Copy template to memory stream
                using (var fs = new FileStream(templatePath, FileMode.Open, FileAccess.Read, FileShare.ReadWrite))
                {
                    fs.CopyTo(ms);
                }
                ms.Position = 0;
                // Create Word document in memory
                using (var wordDoc = WordprocessingDocument.Open(ms, true))
                {
                    var mainPart = wordDoc.MainDocumentPart;
                    var body = mainPart.Document.Body;
                    HtmlConverter convert = new HtmlConverter(mainPart);

                    StringBuilder gv = new StringBuilder();
                    if (request.giang_viens != null && request.giang_viens.Any())
                    {
                        int count = 0;
                        foreach (var item in request.giang_viens)
                        {
                            count++;
                            gv.AppendLine($"{count}.Họ và tên: {item.ten_cb}");
                            gv.AppendLine($"- Đơn vị công tác: {item.don_vi_cong_tac}");
                            gv.AppendLine($"- Điện thoại: {item.sdt}");
                            gv.AppendLine($"- Email: {item.email}\n");
                        }
                    }

                    string tlbb = "", tltk = "";
                    if (request.tai_lieus != null && request.tai_lieus.Any())
                    {
                        tlbb = WordHelper.BuildParagraph(request.tai_lieus, tl => tl.is_tai_lieu_chinh ? $"{tl.noi_dung_tai_lieu.Trim()}" : "");
                        tltk = WordHelper.BuildParagraph(request.tai_lieus, tl => !tl.is_tai_lieu_chinh ? $"{tl.noi_dung_tai_lieu.Trim()}" : "");
                    }
                    var xmlTaiLieuBatBuoc = HtmlToOpenXmlHelper.ConvertHtml(tlbb);
                    var xmlTaiLieuThamKhao = HtmlToOpenXmlHelper.ConvertHtml(tltk);

                    string mt = "";
                    if (request.mo_tas != null && request.mo_tas.Any())
                    {
                        mt = WordHelper.BuildParagraph(request.mo_tas, mt => $"{mt.noi_dung.Trim()}");
                    }
                    var xmlMota = HtmlToOpenXmlHelper.ConvertHtml(mt);

                    string quyTac = "";
                    if (request.quy_tacs != null && request.quy_tacs.Any())
                    {
                        quyTac = WordHelper.BuildParagraph(request.quy_tacs, mt => $"{mt.noi_dung.Trim()}");
                    }
                    var xmlQuyTac = HtmlToOpenXmlHelper.ConvertHtml(quyTac);

                    // Helper function to replace text in the document
                    void ReplacePlaceholder(string placeholder, string value)
                    {
                        foreach (var text in body.Descendants<Text>())
                        {
                            if (text.Text.Contains(placeholder))
                                text.Text = text.Text.Replace(placeholder, value ?? "");
                        }
                    }

                    void ReplaceBlockWithParagraphs(string placeholder, string value)
                    {
                        var paras = body.Descendants<Paragraph>().ToList();
                        foreach (var para in paras)
                        {
                            foreach (var text in para.Descendants<Text>().ToList())
                            {
                                if (text.Text.Contains(placeholder))
                                {
                                    // Xóa run cũ
                                    para.RemoveAllChildren<Run>();

                                    // Tách dòng
                                    var lines = value.Split('\n');

                                    foreach (var line in lines)
                                    {
                                        var newPara = new Paragraph();

                                        var runProps = new RunProperties(
                                            new RunFonts() { Ascii = "Times New Roman", HighAnsi = "Times New Roman" },
                                            new FontSize() { Val = "24" } // 13pt * 2
                                        );

                                        var run = new Run(
                                            runProps,
                                            new Text(line) { Space = SpaceProcessingModeValues.Preserve }
                                        );

                                        newPara.Append(run);

                                        // Copy ParagraphProperties gốc nếu cần giữ style indent, alignment, ...
                                        if (para.ParagraphProperties != null)
                                            newPara.ParagraphProperties = (ParagraphProperties)para.ParagraphProperties.CloneNode(true);

                                        // Thêm vào trước para gốc
                                        para.Parent.InsertBefore(newPara, para);
                                    }

                                    // Xóa para gốc
                                    para.Remove();
                                    break;
                                }
                            }
                        }
                    }

                    // Tạo bảng CLO
                    var clos = request.clos;
                    var headersClo = new List<string> { "CĐR", "Mô tả chuẩn đầu ra học phần", "CĐR thực hiện mục tiêu nào của HP?" };

                    // Cách ánh xạ 1 CLO thành list string
                    var cdrRow = new List<List<OpenXmlElement>>();
                    if (clos.Any())
                    {
                        foreach (var item in clos)
                        {
                            cdrRow.Add(new List<OpenXmlElement>
                            {
                                WordHelper.CreateParagraphWithFont(item.ma ?? ""),
                                OpenXmlHelper.ConvertHtmlToSingleParagraph(convert,item.noi_dung.Trim()),
                                WordHelper.CreateParagraphWithFont(item.muc_tieu ?? "")
                            });
                        }
                    }

                    var columnWidthsCdr = new List<int> { 500, 4000, 500 };
                    var tableCdr = WordHelper.CreateTableWithParagraphs(cdrRow, headersClo, columnWidthsCdr);

                    // Tạo bảng mục tiêu
                    var mucTieu = request.muc_tieus;
                    var headersMucTieu = new List<string> { "Mục tiêu", "Mô tả mục tiêu học phần", "Đóng góp vào CĐR nào của CTĐT" };

                    var mucTieuRow = new List<List<OpenXmlElement>>();
                    if (mucTieu.Any())
                    {
                        foreach (var item in mucTieu)
                        {
                            string maCdr = string.Join("",
                                item.id_clos.Split(',')
                                     .Select(x => $"{x}\n")
                            );

                            mucTieuRow.Add(new List<OpenXmlElement>
                            {
                                WordHelper.CreateParagraphWithFont(item.ma ?? ""),
                                OpenXmlHelper.ConvertHtmlToSingleParagraph(convert,item.noi_dung.Trim()),
                                WordHelper.CreateParagraphWithFont(maCdr ?? "")
                            });
                        }
                    }
                    var columnWidthsMucTieu = new List<int> { 500, 4000, 500 };
                    var tableMucTieu = WordHelper.CreateTableWithParagraphs(mucTieuRow, headersMucTieu, columnWidthsMucTieu);

                    // Tạo bảng chương
                    var headersChuong = new List<string> { "Nội dung\n(Chương, Mục, Tiểu mục)", "Đạt CĐR", "Học liệu" };
                    var chuongRows = new List<List<OpenXmlElement>>();

                    int total_tc = 0, total_lt = 0, total_th = 0, total_tuhoc = 0;

                    if (request.chuongs != null)
                    {

                        foreach (var chuong in request.chuongs)
                        {
                            if (chuong.chuongSub != null && chuong.chuongSub.Any())
                            {
                                foreach (var item in chuong.chuongSub)
                                {
                                    var noiDung = $"<h3>Chương {chuong.stt}. {chuong.noi_dung}</h3><br/>{item.hoat_dong_gv.Trim()}";
                                    string maCdr = string.Join("",
                                        item.id_clos.Split(',')
                                             .Select(x => $"{x}\n")
                                    );
                                    chuongRows.Add(new List<OpenXmlElement>
                                    {
                                        OpenXmlHelper.ConvertHtmlToSingleParagraph(convert,noiDung ?? ""),
                                        WordHelper.CreateParagraphWithFont(maCdr ?? ""),
                                        OpenXmlHelper.ConvertHtmlToSingleParagraph(convert,item.tai_lieu.Trim() ?? "")
                                    });

                                }
                            }
                        }
                    }
                    var columnWidthsChuong = new List<int> { 4000, 500, 500 };
                    var tableChuong = WordHelper.CreateTableWithParagraphs(chuongRows, headersChuong, columnWidthsChuong);

                    // Tạo bảng phương pháp
                    var headersPhuongPhap = new List<string> { "STT", "Phương pháp được sử dụng", "Thực hiện CĐR của HP" };
                    var phuongPhapRows = new List<List<OpenXmlElement>>();

                    if (request.phuong_phaps != null)
                    {
                        int count = 0;
                        foreach (var item in request.phuong_phaps)
                        {
                            count++;
                            string maCdr = string.Join("",
                                item.id_clos.Split(',')
                                     .Select(x => $"{x}\n")
                            );
                            phuongPhapRows.Add(new List<OpenXmlElement>
                            {
                                WordHelper.CreateParagraphWithFont(count.ToString()),
                                OpenXmlHelper.ConvertHtmlToSingleParagraph(convert,item.noi_dung.Trim() ?? ""),
                                WordHelper.CreateParagraphWithFont(maCdr ?? "")
                            });
                        }
                    }
                    var columnWidthsPhuongPhap = new List<int> { 500, 4000, 500 };

                    // Now create the table (you'll need a CreateTable overload that accepts List<List<OpenXmlElement>>)
                    var tablePhuongPhap = WordHelper.CreateTableWithParagraphs(phuongPhapRows, headersPhuongPhap, columnWidthsPhuongPhap);


                    //Tạo bảng đánh giá
                    var headersDanhGia = new List<string> { "Tính chất", "Hoạt động kiểm tra đánh giá", "Trọng số", "Đo lường CĐR" };
                    var danhGiaRows = new List<List<OpenXmlElement>>();
                    if (request.danh_gias != null)
                    {
                        foreach (var dg in request.danh_gias)
                        {
                            if (dg.subs != null)
                            {
                                string maCdr = string.Join("",
                                    dg.subs.ma_clo.Split(',')
                                         .Select(x => $"{x}\n")
                                );
                                danhGiaRows.Add(new List<OpenXmlElement>
                                {
                                    OpenXmlHelper.ConvertHtmlToSingleParagraph(convert,dg.subs.hinh_thuc.Trim() ?? ""),
                                    OpenXmlHelper.ConvertHtmlToSingleParagraph(convert,dg.subs.noi_dung.Trim() ?? ""),
                                    WordHelper.CreateParagraphWithFont((dg.subs.trong_so.ToString() + " %") ?? ""),
                                    WordHelper.CreateParagraphWithFont(maCdr ?? "")
                                });
                            }
                        }
                    }

                    var columnWidthsDanhGia = new List<int> { 1000, 3000, 500, 500 };
                    // Create the table
                    var tableDanhGia = WordHelper.CreateTableWithParagraphs(danhGiaRows, headersDanhGia, columnWidthsDanhGia);

                    dmMonHoc hoc_phan_tien_quyet = new dmMonHoc();
                    dmMonHoc hoc_phan_ke_tiep = new dmMonHoc();

                    if (request.de_cuong != null)
                    {
                        int id_mon_tien_quyet = request.de_cuong.id_mon_tien_quyet ?? 0;
                        int id_mon_ke_tiep = request.de_cuong.id_mon_ke_tiep ?? 0;
                        if (id_mon_tien_quyet != 0)
                        {
                            hoc_phan_tien_quyet = await _monHocService.SelectByIdAsync(id_mon_tien_quyet);
                        }
                        if (id_mon_ke_tiep != 0)
                        {
                            hoc_phan_ke_tiep = await _monHocService.SelectByIdAsync(id_mon_ke_tiep);
                        }
                    }

                    total_lt = request.de_cuong.ly_thuyet ?? 0;
                    total_th = request.de_cuong.thuc_hanh ?? 0;
                    total_tuhoc = request.de_cuong.tu_hoc ?? 0;
                    total_tc = total_lt + total_tuhoc + total_th;

                    // Replace simple fields
                    ReplacePlaceholder("{ten_hoc_phan}", request.de_cuong.ten_mon);
                    ReplacePlaceholder("{ten_hoc_phan_en}", request.de_cuong.ten_mon_en);
                    ReplacePlaceholder("{ma_hoc_phan}", request.de_cuong.ma_hoc_phan);
                    string loaiHocPhan = request.de_cuong.loai_hoc_phan == 0 ? "Tự chọn" : "Bắt buộc";
                    ReplacePlaceholder("{loai_hoc_phan}", loaiHocPhan);
                    ReplacePlaceholder("{so_tin_chi}", request.de_cuong.so_tin_chi.ToString());
                    ReplacePlaceholder("{hoc_phan_tien_quyet}", hoc_phan_tien_quyet.ten_mon + "(" + hoc_phan_tien_quyet.ky_hieu + ")");
                    ReplacePlaceholder("{hoc_phan_ke_tiep}", hoc_phan_ke_tiep.ten_mon);
                    ReplacePlaceholder("{yeu_cau_giang_day}", request.de_cuong.yeu_cau);
                    ReplacePlaceholder("{phuong_thuc_giang_vien}", request.de_cuong.phuong_thuc);
                    ReplacePlaceholder("{total_tc}", total_tc.ToString());
                    ReplacePlaceholder("{total_lt}", total_lt.ToString());
                    ReplacePlaceholder("{total_th}", total_th.ToString());
                    ReplacePlaceholder("{total_tuhoc}", total_tuhoc.ToString());

                    ReplaceBlockWithParagraphs("{data_giang_vien}", gv.ToString());
                    // Gọi helper
                    WordHelper.ReplaceParagraphWithElements(body, "{noi_dung_mo_ta}", xmlMota);
                    WordHelper.ReplaceParagraphWithElements(body, "{quy_tac}", xmlQuyTac);
                    WordHelper.ReplaceParagraphWithElements(body, "{data_tai_lieu_bat_buoc}", xmlTaiLieuBatBuoc);
                    WordHelper.ReplaceParagraphWithElements(body, "{data_tai_lieu_tham_khao}", xmlTaiLieuThamKhao);
                    WordHelper.InsertTableAtPlaceholder(body, tableCdr, "{table_cdr}");
                    WordHelper.InsertTableAtPlaceholder(body, tableMucTieu, "{table_muc_tieu}");
                    WordHelper.InsertTableAtPlaceholder(body, tableChuong, "{table_chuong}");
                    WordHelper.InsertTableAtPlaceholder(body, tableDanhGia, "{table_danh_gia}");
                    WordHelper.InsertTableAtPlaceholder(body, tablePhuongPhap, "{table_phuong_phap}");
                    mainPart.Document.Save();
                }
                resultBytes = ms.ToArray();
            }
            var fileName = $"DeCuong_{DateTime.Now:yyyyMMddHHmmss}.docx";
            //return File(resultBytes, "application/vnd.openxmlformats-officedocument.wordprocessingml.document", fileName);
            return this.OK(File(resultBytes, "application/vnd.openxmlformats-officedocument.wordprocessingml.document", fileName));
        }

        [HttpPost("view-de-cuong")]
        public async Task<ContentResult> ViewDeCuongAsync([FromBody] DeCuongRequest request)
        {
            dmMonHoc hoc_phan_tien_quyet = new dmMonHoc();
            dmMonHoc hoc_phan_ke_tiep = new dmMonHoc();

            if (request.de_cuong != null)
            {
                int id_mon_tien_quyet = request.de_cuong.id_mon_tien_quyet ?? 0;
                int id_mon_ke_tiep = request.de_cuong.id_mon_ke_tiep ?? 0;
                if (id_mon_tien_quyet != 0)
                {
                    hoc_phan_tien_quyet = await _monHocService.SelectByIdAsync(id_mon_tien_quyet);
                }
                if (id_mon_ke_tiep != 0)
                {
                    hoc_phan_ke_tiep = await _monHocService.SelectByIdAsync(id_mon_ke_tiep);
                }
            }

            var html = await _deCuongService.ViewDeCuongAsync(request, hoc_phan_tien_quyet, hoc_phan_ke_tiep);
            return this.OK(html);
        }
        [HttpPost("export-pdf")]
        public async Task<IActionResult> ExportPdfAsync([FromBody] DeCuongRequest request)
        {
            string path = Path.Combine(Directory.GetCurrentDirectory(), ".local-chromium");
            dmMonHoc hoc_phan_tien_quyet = new dmMonHoc();
            dmMonHoc hoc_phan_ke_tiep = new dmMonHoc();

            if (request.de_cuong != null)
            {
                int id_mon_tien_quyet = request.de_cuong.id_mon_tien_quyet ?? 0;
                int id_mon_ke_tiep = request.de_cuong.id_mon_ke_tiep ?? 0;
                if (id_mon_tien_quyet != 0)
                {
                    hoc_phan_tien_quyet = await _monHocService.SelectByIdAsync(id_mon_tien_quyet);
                }
                if (id_mon_ke_tiep != 0)
                {
                    hoc_phan_ke_tiep = await _monHocService.SelectByIdAsync(id_mon_ke_tiep);
                }
            }
            string content = await _deCuongService.ViewDeCuongAsync(request, hoc_phan_tien_quyet, hoc_phan_ke_tiep);

            if (!Directory.Exists(path))
            {
                await StartupTasks.EnsureChromiumAsync();
            }

            // Initialize the browser
            using var browser = await Puppeteer.LaunchAsync(new LaunchOptions
            {
                Headless = true,
                Args = new[] { "--no-sandbox", "--disable-setuid-sandbox" },
                ExecutablePath = Path.Combine(path, "Chrome\\Win64-132.0.6834.83\\chrome-win64", "chrome.exe") // Adjust path as necessary
            });

            // Open a new page
            using var page = await browser.NewPageAsync();

            // Load HTML content
            await page.SetContentAsync(content, new PuppeteerSharp.NavigationOptions
            {
                WaitUntil = new[] { WaitUntilNavigation.Load }
            });

            // Export PDF
            var pdfBytes = await page.PdfDataAsync(new PdfOptions
            {
                Format = PaperFormat.A4,
                MarginOptions = new MarginOptions
                {
                    Top = "20mm",
                    Bottom = "20mm",
                    Left = "15mm",
                    Right = "15mm"
                }
            });

            var fileName = $"Decuong_{DateTime.Now:yyyyMMddHHmmss}.pdf";
            return this.OK(File(pdfBytes, "application/pdf", fileName)); // Correct usage of File method
        }

        [HttpPut("bo-mon-duyet/{id}")]
        public async Task<ContentResult> BoMonDuyetAsync([FromRoute] int id, [FromBody] DeCuongDuyetRequest request)
        {
            try
            {
                var exist = await this._deCuongService.SelectByIdAsync(id);
                string title = "";
                if (exist == null)
                    return this.BadRequest("Không tìm thấy đề cương để cập nhật");
                switch (request.type_progress)
                {
                    case 2: // Duyệt
                        exist.is_bm_duyet = true;
                        title = "Trưởng bộ môn duyệt đề cương " + exist.ten_de_cuong;
                        break;
                    case 4:
                        exist.is_bm_duyet = false;
                        title = "Trưởng bộ môn trả lại đề cương " + exist.ten_de_cuong;
                        exist.status = 4; // Trạng thái từ chối
                        break;
                    case 0:
                        exist.is_bm_duyet = false;
                        exist.status = 0; // Khởi tạo
                        break;
                    default:
                        break;
                }

                exist.user_bm_duyet = GetUserId() ?? "";
                exist.noi_dung_bm_duyet = request.content ?? "";
                var isUpdated = await this._deCuongService.UpdateAsync(exist);
                if (!isUpdated)
                    return this.BadRequest("Lỗi khi cập nhật đề cương");

                try
                {
                    if (request.type_progress != 0 || request.type_progress != 1)
                    {
                        //var data = await this._hrLyLichService.SelectByIdCbAsync(request.created_user_id);
                        //if (data != null)
                        //{

                        string email = "vanphamlan@gmail.com";
                        // Gửi email sau khi cập nhật
                        await SendEmailAsync(
                            to: email,
                            subject: title,
                            body: request.content ?? ""
                        );
                        //}
                    }
                }
                catch (Exception)
                {
                    throw;
                }

                return this.OK(isUpdated);
            }
            catch (Exception ex)
            {
                return this.BadRequest("Lỗi khi update: " + ex.Message);
            }
        }
        [HttpPut("khoa-duyet/{id}")]
        public async Task<ContentResult> KhoaDuyetAsync([FromRoute] int id, [FromBody] DeCuongDuyetRequest request)
        {
            try
            {
                var exist = await this._deCuongService.SelectByIdAsync(id);
                if (exist == null)
                    return this.BadRequest("Không tìm thấy đề cương để cập nhật");
                if (exist.is_bm_duyet == false)
                {
                    return this.BadRequest("Đề cương chưa được duyệt bởi trưởng bộ môn");
                }
                string title = "";

                switch (request.type_progress)
                {
                    case 2: // Duyệt
                        exist.is_khoa_duyet = true;
                        title = "Trưởng khoa duyệt đề cương " + exist.ten_de_cuong;
                        break;
                    case 4:
                        title = "Trưởng khoa trả lại đề cương " + exist.ten_de_cuong;
                        exist.is_khoa_duyet = false;
                        exist.is_bm_duyet = false;
                        exist.status = 4; // Trạng thái từ chối
                        break;
                    default:
                        break;
                }
                exist.user_khoa_duyet = GetUserId() ?? "";
                exist.noi_dung_khoa_duyet = request.content ?? "";
                var isUpdated = await this._deCuongService.UpdateAsync(exist);
                if (!isUpdated)
                    return this.BadRequest("Lỗi khi cập nhật đề cương");
                try
                {
                    if (request.type_progress != 0 || request.type_progress != 1)
                    {
                        //var data = await this._hrLyLichService.SelectByIdCbAsync(request.created_user_id);
                        //if (data != null)
                        //{

                        string email = "vanphamlan@gmail.com";
                        // Gửi email sau khi cập nhật
                        await SendEmailAsync(
                            to: email,
                            subject: title,
                            body: request.content ?? ""
                        );
                        //}
                    }
                }
                catch (Exception)
                {
                    throw;
                }
                return this.OK(isUpdated);
            }
            catch (Exception ex)
            {
                return this.BadRequest("Lỗi khi update: " + ex.Message);
            }
        }
        [HttpPut("dao-tao-duyet/{id}")]
        public async Task<ContentResult> DaoTaoDuyetAsync([FromRoute] int id, [FromBody] DeCuongDuyetRequest request)
        {
            try
            {
                var exist = await this._deCuongService.SelectByIdAsync(id);
                if (exist == null)
                    return this.BadRequest("Không tìm thấy đề cương để cập nhật");
                if (exist.is_khoa_duyet == false || exist.is_bm_duyet == false)
                {
                    return this.BadRequest("Đề cương chưa được duyệt bởi khoa hoặc trưởng bộ môn");
                }
                string title = "";

                switch (request.type_progress)
                {
                    case 2: // Duyệt
                        exist.is_pdt_duyet = true;
                        exist.status = 2; // Trạng thái đã duyệt
                        title = "Phòng đào tạo duyệt đề cương " + exist.ten_de_cuong;
                        break;
                    case 4:
                        exist.is_pdt_duyet = false;
                        exist.is_khoa_duyet = false;
                        exist.is_bm_duyet = false;
                        exist.status = 4; // Trạng thái từ chối
                        title = "Phòng đào tạo trả lại đề cương " + exist.ten_de_cuong;
                        break;
                    default:
                        break;
                }
                exist.user_pdt_duyet = GetUserId() ?? "";
                exist.noi_dung_pdt_duyet = request.content ?? "";
                var isUpdated = await this._deCuongService.UpdateAsync(exist);
                if (!isUpdated)
                    return this.BadRequest("Lỗi khi cập nhật đề cương");
                try
                {
                    if (request.type_progress != 0 || request.type_progress != 1)
                    {
                        //var data = await this._hrLyLichService.SelectByIdCbAsync(request.created_user_id);
                        //if (data != null)
                        //{

                        string email = "vanphamlan@gmail.com";
                        // Gửi email sau khi cập nhật
                        await SendEmailAsync(
                            to: email,
                            subject: title,
                            body: request.content ?? ""
                        );
                        //}
                    }
                }
                catch (Exception)
                {
                    throw;
                }
                return this.OK(isUpdated);
            }
            catch (Exception ex)
            {
                return this.BadRequest("Lỗi khi update: " + ex.Message);
            }
        }

        public async Task SendEmailAsync(string to, string subject, string body)
        {
            var smtpHost = "smtp.gmail.com";
            var smtpPort = 587;
            var smtpUser = "manhdung81094@gmail.com";
            var smtpPass = "ipvp qnfg ltpf ggzb";
            var fromEmail = "manhdung81094@gmail.com";

            using (var client = new SmtpClient(smtpHost, smtpPort))
            {
                client.EnableSsl = true;
                client.Credentials = new NetworkCredential(smtpUser, smtpPass);

                var mail = new MailMessage(fromEmail, to, subject, body);
                mail.IsBodyHtml = true;

                await client.SendMailAsync(mail);
            }
        }
    }
}

