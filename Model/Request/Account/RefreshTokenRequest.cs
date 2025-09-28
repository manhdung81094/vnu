namespace Model.Request.Account
{
    public class RefreshTokenRequest
    {
        public string access_token { get; set; }
        public string refresh_token { get; set; }
        public int? sub_system_id { get; set; }
        public RefreshTokenRequest()
        {
        }
    }
}

