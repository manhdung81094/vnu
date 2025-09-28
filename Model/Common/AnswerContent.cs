using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace Model.Common
{
    public class AnswerContent
    {
        [JsonProperty("id")]
        public int id { get; set; }
        [JsonProperty("id_question")]
        public int id_question { get; set; }
        [JsonProperty("content")]
        public string content { get; set; }
        [JsonProperty("is_correct")]
        public bool is_correct { get; set; }
        [JsonProperty("order_correct")]
        public int order_correct { get; set; }
        [JsonProperty("is_fixed")]
        public bool is_fixed { get; set; }
        [JsonProperty("score")]
        public decimal score { get; set; }
        [JsonProperty("display_index")]
        public int display_index { get; set; }
        [JsonProperty("note")]
        public string note { get; set; }
        [JsonProperty("attach_file_link")]
        public string attach_file_link { get; set; }
        [JsonProperty("attach_file_name")]
        public string attach_file_name { get; set; }
        [JsonProperty("attach_file_type")]
        public string attach_file_type { get; set; }
    }
}
