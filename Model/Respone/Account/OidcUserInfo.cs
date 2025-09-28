
using Newtonsoft.Json;

namespace Model.Respone.Account
{
    public class OidcUserInfo
    {
        [JsonProperty("sub")]
        public string id { get; set; }
        //public string email { get; set; }
        [JsonProperty("preferred_username")]

        public string username { get; set; }
        [JsonProperty("name")]
        public string full_name { get; set; }
        [JsonProperty("email")]
        public string email { get; set; }
        [JsonProperty("role")]
        public string role { get; set; }
    }
}