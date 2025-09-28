using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace Model.Common
{
    public class QuestionContent
    {
        [JsonProperty("id")]
        public int id { get; set; }
        [JsonProperty("parent_id")]
        public int parent_id { get; set; }
        [JsonProperty("code")]
        public string code { get; set; }
        [JsonProperty("content")]
        public string content { get; set; }
        [JsonProperty("score")]
        public decimal score { get; set; }
        [JsonProperty("id_mon")]
        public int id_mon { get; set; }
        [JsonProperty("id_chude")]
        public int id_chude { get; set; }
        [JsonProperty("status")]
        public int status { get; set; }
        [JsonProperty("type_answer")]
        public int type_answer { get; set; }
        [JsonProperty("is_mix_answer")]
        public bool is_mix_answer { get; set; }
        [JsonProperty("is_group_question")]
        public bool is_group_question { get; set; }
        [JsonProperty("id_muc_tri_nang")]
        public int id_muc_tri_nang { get; set; }
        [JsonProperty("attach_file_link")]
        public string attach_file_link { get; set; }
        [JsonProperty("attach_file_name")]
        public string attach_file_name { get; set; }
        [JsonProperty("attach_file_type")]
        public string attach_file_type { get; set; }
    }
}
