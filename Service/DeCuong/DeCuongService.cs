
using System.Text;
using Contract.Repository.Category;
using Contract.Service.DeCuong;
using Model.Request.DeCuong;
using Model.Table;
using Service.Base;

namespace Service.DeCuong
{
    public class DeCuongService : CRUDService<CDR_DeCuong>, IDeCuongService
    {

        public DeCuongService(IServiceProvider serviceProvider) : base(serviceProvider)
        {
            this._repositoryBase = _repositoryWrapper.DeCuong.DeCuong;
        }

        public Task<bool> CheckExistHocPhan(int idHocPhan)
        {
            return _repositoryWrapper.DeCuong.DeCuong.CheckExistHocPhan(idHocPhan);
        }

        public Task<int> InsertDeCuongAsync(CDR_DeCuong deCuong)
        {
            return _repositoryWrapper.DeCuong.DeCuong.InsertDeCuongAsync(deCuong);
        }

        public Task<bool> ProgressAsync(DeCuongProgressRequest request)
        {
            return _repositoryWrapper.DeCuong.DeCuong.ProgressAsync(request);
        }

        public async Task<string> ViewDeCuongAsync(DeCuongRequest request, dmMonHoc hptq, dmMonHoc hpkt)
        {
            try
            {
                string htmlContent = string.Empty;
                string finalContent = string.Empty;
                var filePath = Path.Combine(Directory.GetCurrentDirectory(), "Asset/", "template.html");

                if (File.Exists(filePath))
                {
                    htmlContent = await File.ReadAllTextAsync(filePath);
                }
                if (string.IsNullOrEmpty(htmlContent))
                {
                    return "Mẫu đề cương không tìm thấy hoặc trống.";
                }
                finalContent = htmlContent;

                var deCuongs = request.de_cuong;
                var giangViens = request.giang_viens;
                var clos = request.clos;
                var moTas = request.mo_tas;
                var taiLieus = request.tai_lieus;
                var danhGias = request.danh_gias;
                var mucTieus = request.muc_tieus;
                var chuongs = request.chuongs;
                var phuongPhaps = request.phuong_phaps;
                var quyTacs = request.quy_tacs;

                //De Cuong
                if (deCuongs != null)
                {
                    finalContent = finalContent.Replace("{ten_hoc_phan}", deCuongs.ten_mon);
                    finalContent = finalContent.Replace("{ten_hoc_phan_en}", deCuongs.ten_mon_en);
                    finalContent = finalContent.Replace("{ma_hoc_phan}", deCuongs.ma_hoc_phan);
                    finalContent = finalContent.Replace("{so_tin_chi}", deCuongs.so_tin_chi.ToString());
                    finalContent = finalContent.Replace("{loai_hoc_phan}", deCuongs.loai_hoc_phan == 0 ? "Tự chọn" : "Bắt buộc");
                    finalContent = finalContent.Replace("{hoc_phan_tien_quyet}", hptq.ten_mon + " (" + hptq.ky_hieu + ")");
                    finalContent = finalContent.Replace("{hoc_phan_ke_tiep}", hpkt.ten_mon);
                    finalContent = finalContent.Replace("{yeu_cau_giang_day}", deCuongs.yeu_cau);
                    finalContent = finalContent.Replace("{phuong_thuc_giang_vien}", deCuongs.phuong_thuc);
                }


                //Giang Vien
                var contentHtml = new StringBuilder();
                string dataGiangVien = @"
                <p>{stt}.Họ và tên: {ten_giang_vien}</p>
                <p>-Đơn vị công tác: {don_vi_cong_tac}</p>
                <p>-Điện thoại: {sdt}</p>
                <p>-Email: {email}</p>
                ";

                var giangVienRows = new StringBuilder();
                if (giangViens.Any())
                {
                    for (int i = 0; i < giangViens.Count(); i++)
                    {
                        //char label = (char)('A' + i);
                        int stt = i + 1;
                        string data = dataGiangVien.Replace("{stt}", stt.ToString())
                                                   .Replace("{ten_giang_vien}", giangViens[i].ten_cb)
                                                   .Replace("{don_vi_cong_tac}", giangViens[i].don_vi_cong_tac)
                                                   .Replace("{sdt}", giangViens[i].sdt)
                                                   .Replace("{email}", giangViens[i].email);
                        giangVienRows.AppendLine(data);
                    }
                }

                finalContent = finalContent.Replace("{data_giang_vien}", giangVienRows.ToString());

                //Mo Ta
                StringBuilder moTaHocPhan = new StringBuilder();
                if (moTas.Any())
                {
                    foreach (var item in moTas)
                    {
                        moTaHocPhan.AppendLine($"<p>{item.noi_dung.Trim()}</p>");
                    }
                }

                finalContent = finalContent.Replace("{mo_ta_hoc_phan}", moTaHocPhan.ToString());

                //Quy Tac
                StringBuilder quyTac = new StringBuilder();
                if (quyTacs.Any())
                {
                    foreach (var item in quyTacs)
                    {
                        quyTac.AppendLine($"<p>{item.noi_dung.Trim()}</p>");
                    }
                }

                finalContent = finalContent.Replace("{quy_tac}", quyTac.ToString());

                //Muc Tieu
                string dataMucTieu = @"
                <tr>
                  <td>{ma}</td>
                  <td>{noi_dung}</td>
                  <td>{cdr}</td>
                </tr>";
                StringBuilder mucTieuRows = new StringBuilder();
                if (mucTieus.Any())
                {
                    foreach (var item in mucTieus)
                    {
                        string maCdr = string.Join("",
                            item.id_clos.Split(',')
                                 .Select(x => $"<p>{x}</p>")
                        );
                        string data = dataMucTieu.Replace("{ma}", item.ma)
                                            .Replace("{noi_dung}", item.noi_dung)
                                            .Replace("{cdr}", maCdr);
                        mucTieuRows.AppendLine(data);
                    }
                }
                finalContent = finalContent.Replace("{table_muc_tieu}", mucTieuRows.ToString());

                //CDR
                string dataCDR = @"
                <tr>
                  <td>{ma}</td>
                  <td>{noi_dung}</td>
                  <td>{muc_tieu}</td>
                </tr>";
                StringBuilder cdrRows = new StringBuilder();
                if (clos.Any())
                {
                    foreach (var item in clos)
                    {
                        string data = dataCDR.Replace("{ma}", item.ma)
                                             .Replace("{noi_dung}", item.noi_dung)
                                             .Replace("{muc_tieu}", item.muc_tieu);
                        cdrRows.AppendLine(data);
                    }
                }
                finalContent = finalContent.Replace("{table_cdr}", cdrRows.ToString());


                //Noi Dung 
                string dataNoiDung = @"
                <tr>
                  <td>{noi_dung}</td>
                  <td>{cdr}</td>
                  <td>{tai_lieu}</td>
                </tr>";
                StringBuilder noiDungRows = new StringBuilder();

                int total_tc = 0, total_lt = 0, total_th = 0, total_tuhoc = 0;
                if (chuongs.Any())
                {
                    for (int i = 0; i < chuongs.Count(); i++)
                    {
                        foreach (var item in chuongs[i].chuongSub)
                        {
                            string maCdr = string.Join("",
                                   item.id_clos.Split(',')
                                        .Select(x => $"<p>{x}</p>")
                            );
                            string data = dataNoiDung.Replace("{noi_dung}", item.hoat_dong_gv)
                                                     .Replace("{cdr}", maCdr)
                                                     .Replace("{tai_lieu}", item.tai_lieu);
                            noiDungRows.AppendLine(data);
                        }
                    }

                }

                //Phuong Phap
                string dataPhuongPhap = @"
                <tr>
                  <td>{tt}</td>
                  <td>{phuong_phap}</td>
                  <td>{cdr}</td>
                </tr>";
                StringBuilder phuongPhapRows = new StringBuilder();

                if (phuongPhaps.Any())
                {
                    int count = 0;
                    foreach (var item in phuongPhaps)
                    {
                        count++;
                        string maCdr = string.Join("",
                           item.id_clos.Split(',')
                                .Select(x => $"<p>{x}</p>")
                        );
                        string data = dataPhuongPhap.Replace("{tt}", (count + 1).ToString())
                                                 .Replace("{phuong_phap}", item.noi_dung)
                                                 .Replace("{cdr}", maCdr);
                        phuongPhapRows.AppendLine(data);
                    }
                }

                total_lt = request.de_cuong.ly_thuyet ?? 0;
                total_th = request.de_cuong.thuc_hanh ?? 0;
                total_tuhoc = request.de_cuong.tu_hoc ?? 0;

                total_tc = total_lt + total_tuhoc + total_th;
                finalContent = finalContent.Replace("{table_noi_dung}", noiDungRows.ToString());
                finalContent = finalContent.Replace("{table_phuong_phap}", phuongPhapRows.ToString());
                finalContent = finalContent.Replace("{total_tc}", total_tc.ToString());
                finalContent = finalContent.Replace("{total_lt}", total_lt.ToString());
                finalContent = finalContent.Replace("{total_th}", total_th.ToString());
                finalContent = finalContent.Replace("{total_tuhoc}", total_tuhoc.ToString());

                //Danh gia
                string danhGiaHtml = @"
                <tr>
                  <td>{hinh_thuc}</td>
                  <td>{noi_dung}</td>
                  <td>{trong_so}</td>
                  <td>{cdr}</td>
                </tr>";
                StringBuilder danhGiaRows = new StringBuilder();

                if (danhGias != null && danhGias.Any())
                {
                    foreach (var item in danhGias)
                    {
                        if (item.subs != null)
                        {
                            var sub = item.subs;
                            string maCdr = string.Join("",
                               sub.ma_clo.Split(',')
                                    .Select(x => $"<p>{x}</p>")
                            );
                            string data = danhGiaHtml.Replace("{hinh_thuc}", sub.hinh_thuc)
                                                     .Replace("{noi_dung}", sub.noi_dung)
                                                     .Replace("{trong_so}", (sub.trong_so.ToString() + " %"))
                                                     .Replace("{cdr}", maCdr);
                            danhGiaRows.AppendLine(data);
                        }
                    }
                }
                finalContent = finalContent.Replace("{table_danh_gia}", danhGiaRows.ToString());

                //Tai lieu
                string taiLieuHtml = @"
                <p>{tai_lieu}</p>";
                StringBuilder taiLieuBatBuocRows = new StringBuilder();
                StringBuilder taiLieuThamKhaoRows = new StringBuilder();
                if (taiLieus.Any())
                {
                    foreach (var item in taiLieus)
                    {
                        if (item.is_tai_lieu_chinh)
                        {
                            string data = taiLieuHtml.Replace("{tai_lieu}", item.noi_dung_tai_lieu);
                            taiLieuBatBuocRows.AppendLine(data);
                        }
                        else
                        {
                            string data = taiLieuHtml.Replace("{tai_lieu}", item.noi_dung_tai_lieu);
                            taiLieuThamKhaoRows.AppendLine(data);
                        }
                    }
                }
                finalContent = finalContent.Replace("{data_tai_lieu_bat_buoc}", taiLieuBatBuocRows.ToString());
                finalContent = finalContent.Replace("{data_tai_lieu_tham_khao}", taiLieuThamKhaoRows.ToString());

                return finalContent;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}