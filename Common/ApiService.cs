using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace Common
{
    public class ApiService
    {
        private static readonly HttpClient client = new HttpClient();
        public static async Task<string> CallApiAsync(string id,string ungDung)
        {
            var url = "https://api-sisvnu.digitaledu.vn/quantri/api/v1/nhom-quyen/nguoi-dung";

            var requestData = new
            {
                NguoiDungId = id,
                MaUngDung = ungDung
            };

            var json = JsonSerializer.Serialize(requestData);
            var content = new StringContent(json, Encoding.UTF8, "application/json");

            var response = await client.PostAsync(url, content);
            var responseContent = await response.Content.ReadAsStringAsync();

            // Parse JSON and extract maCapDoChoPhep
            using JsonDocument doc = JsonDocument.Parse(responseContent);
            var root = doc.RootElement;

            var maCapDoChoPhep = root
                .GetProperty("result")
                .GetProperty("data")[0]
                .GetProperty("maCapDoChoPhep")
                .GetString();

            return maCapDoChoPhep;
        }

    }
}
