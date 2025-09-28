using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model.Request.DeCuong
{
    public class DeCuongProgressRequest
    {
        public List<int> id_decuongs { get; set; }
        public int status { get; set; }
        public string? content { get; set; }
        public string progress_by { get; set; } = "";
    }
}
