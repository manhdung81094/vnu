namespace Model.Request.Account
{
    public class LoginOIDCRequest
    {
        public string id_token { get; set; }
        public string access_token { get; set; }
        public string refresh_token { get; set; }
        
        public LoginOIDCRequest()
        {
        }
    }
}

