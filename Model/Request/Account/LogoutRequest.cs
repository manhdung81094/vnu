namespace Model.Request.Account
{
    public class LogoutRequest
    {
        public string refresh_token { get; set; }
        public string? access_token { get; set; }
        // public string device_id { get; set; }

    }
}

