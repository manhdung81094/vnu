using Model.Static;

namespace Model.Base
{
    public class CacheKey
    {
        private string _key;
        public CacheKey(string key)
        {
            this._key = key;
        }
        public override string ToString()
        {
            return $"{AppSettings.RedisConfig.InstanceName}{_key}";
        }
    }
}