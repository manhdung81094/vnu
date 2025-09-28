using Model.Base;

namespace Model.Table
{
    public class token_logged_out:modify_infor
    {
         public int id { get; set; }
        public string token_sign { get; set; }
        public string type { get; set; }
    }
}