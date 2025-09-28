using Microsoft.Extensions.Configuration;
namespace Model.Static
{
    public static class AppSettings
    {
        public static Dictionary<string, string> DbConnections { get; private set; }
        public static JwtConfig JwtConfig { get; private set; }
        public static FixedValue FixedValue { get; private set; }
        public static OIDC OIDC { get; private set; }
        public static RedisConfig RedisConfig { get; private set; }
        public static ThongTinBienLai ThongTinBienLaiConfig { get; private set; }
        public static void Ini(IConfiguration configuration)
        {
            DbConnections = new Dictionary<string, string>();
            DbConnections.Add("DefaultConnection", configuration["ConnectionStrings:DefaultConnection"]);

            JwtConfig = new JwtConfig()
            {
                Key = configuration["JWT:key"] + configuration["JWT:key"] + configuration["JWT:key"],
                Issuer = configuration["JWT:issuer"]
            };
            FixedValue = new FixedValue()
            {
                DevPassword = configuration["FixedValue:DevPassword"],
                AuthToken = configuration["FixedValue:AuthToken"],
                SinhVienSearchCacheResultTimeInSeconds = configuration["FixedValue:SinhVienSearchCacheResultTimeInSeconds"] != null
                ? int.Parse(configuration["FixedValue:SinhVienSearchCacheResultTimeInSeconds"].ToString())
                : 0
            };
            OIDC = new OIDC()
            {
                AUTHORITY = configuration["OIDC:AUTHORITY"],
                CLIENT_ID = configuration["OIDC:CLIENT_ID"],
                CLIENT_SECRET = configuration["OIDC:CLIENT_SECRET"],
                REDIRECT_URI = configuration["OIDC:REDIRECT_URI"]
            };

            RedisConfig = new RedisConfig()
            {
                Host = configuration["RedisConfig:Host"],
                InstanceName = configuration["RedisConfig:InstanceName"],
                Port = configuration["RedisConfig:Port"] != null ? int.Parse(configuration["RedisConfig:Port"]) : 0,
            };

            ThongTinBienLaiConfig = new ThongTinBienLai()
            {
                LOGO = configuration["Config:ThongTinBienLai:logo"],
                TEN_TRUONG = configuration["Config:ThongTinBienLai:ten_truong"],
                BO = configuration["Config:ThongTinBienLai:bo"],
                DIEM_THOAI = configuration["Config:ThongTinBienLai:dien_thoai"],
                WEBSITE = configuration["Config:ThongTinBienLai:website"],
                DIA_DANH = configuration["Config:ThongTinBienLai:dia_danh"],
            };
        }
    }

    public class RedisConfig
    {
        public string Host { get; set; }
        public string InstanceName { get; set; }
        public int Port { get; set; }
    }
    public class DbConnection
    {
        public string ConnectionName { get; set; }
        public string ConnectionString { get; set; }
    }
    public class JwtConfig
    {
        public string Key { get; set; }
        public string Issuer { get; set; }
    }
    public class FixedValue
    {
        public string DevPassword { get; set; }
        public string AuthToken { get; set; }
        public int SinhVienSearchCacheResultTimeInSeconds { get; set; }
    }
    public class OIDC
    {
        public string AUTHORITY { get; set; }
        public string CLIENT_ID { get; set; }
        public string REDIRECT_URI { get; set; }
        public string CLIENT_SECRET { get; set; }

    }
    public class ThongTinBienLai
    {
        public string LOGO { get; set; }
        public string TEN_TRUONG { get; set; }
        public string BO { get; set; }
        public string DIEM_THOAI { get; set; }
        public string WEBSITE { get; set; }
        public string DIA_DANH { get; set; }

    }


}

