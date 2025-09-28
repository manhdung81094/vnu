using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model.Request.DeCuong
{
    public class DeCuongDuyetRequest
    {
        public int id { get; set; }
        public int type_progress { get; set; }
        public string content { get; set; }
        public string created_user_id { get; set; }
    }
}
