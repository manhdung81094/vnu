
using Contract.Repository.Base;
using Repository.Base;
using Model.Table;
using Contract.Repository.DeCuong;
using Dapper;
using Model.Request.DeCuong;
using Common;
using System.Net.Mail;
using System.Net;

namespace Repository.DeCuong
{
    public class DeCuongRepository : CRUDRepository<CDR_DeCuong>, IDeCuongRepository
    {
        public DeCuongRepository(IDbConnectionQuerry dbConnection) : base(dbConnection, "id")
        {

        }

        public async Task<bool> CheckExistHocPhan(int idHocPhan)
        {
            var param = new DynamicParameters();
            param.Add("id", idHocPhan);
            var result = await _dbConnection.SelectAsync<CDR_DeCuong>("CDR_DeCuong_check_exist_hoc_phan", param);
            if (result.Count() > 0)
            {
                return true; // Hoc phan exists
            }
            return false;
        }

        public async Task<int> InsertDeCuongAsync(CDR_DeCuong deCuong)
        {
            var param = new DynamicParameters();
            param.Add("id", deCuong.id);
            //param.Add("id_he", deCuong.id_he);
            param.Add("id_mon", deCuong.id_mon);
            //param.Add("id_bm", deCuong.id_bm);
            //param.Add("id_nganh", deCuong.id_nganh);
            //param.Add("so_quyet_dinh", deCuong.so_quyet_dinh);
            //param.Add("ngay_quyet_dinh", deCuong.ngay_quyet_dinh);
            //param.Add("ngay_ban_hanh", deCuong.ngay_ban_hanh);
            //param.Add("nguoi_quyet_dinh", deCuong.nguoi_quyet_dinh);
            //param.Add("id_mon_tien_quyets", deCuong.id_mon_tien_quyets);
            //param.Add("lan_ban_hanh", deCuong.lan_ban_hanh);
            //param.Add("dieu_kien_thuc_hien", deCuong.dieu_kien_thuc_hien);
            param.Add("is_deleted", deCuong.is_deleted);
            param.Add("created_time", deCuong.created_time);
            param.Add("created_user_id", deCuong.created_user_id);
            param.Add("last_modified_times", deCuong.last_modified_times);
            param.Add("last_modified_user_id", deCuong.last_modified_user_id);
            param.Add("is_nop", deCuong.is_nop);
            param.Add("is_bm_duyet", deCuong.is_bm_duyet);
            param.Add("user_bm_duyet", deCuong.user_bm_duyet);
            param.Add("is_khoa_duyet", deCuong.is_khoa_duyet);
            param.Add("user_khoa_duyet", deCuong.user_khoa_duyet);


            var result = await _dbConnection.SelectAsync<CDR_Chuong>("CDR_Chuong_add", param);
            if (result != null && result.Any())
            {
                return result.First().id; // Assuming the first item is the inserted one
            }

            return 0;

        }

        public async Task<bool> ProgressAsync(DeCuongProgressRequest request)
        {
            var param = new DynamicParameters();
            param.Add("status", request.status);
            param.Add("progress_by", request.progress_by);
            param.Add("id_decuongs", request.id_decuongs.ConvertToTableValuedParameter());

            try
            {
                if (request.status != 0 || request.status != 1)
                {
                    // Gửi email sau khi cập nhật
                    await SendEmailAsync(
                        to: "dunghm.iist@gmail.com",
                        subject: "test",
                        body: request.content ?? ""
                    );
                }
            }
            catch (Exception)
            {
                throw;
            }

            return await _dbConnection.ExecuteAsync("CDR_DeCuong_progress", param);
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

