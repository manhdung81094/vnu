using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model.Common
{
    public class SMT_CauTrucDe_Section
    {
        public int row_number { get; set; }
        public int score { get; set; }
        public int so_cau_hoi { get; set; }
        public int total_question { get; set; }
        public string note { get; set; }
        public bool is_fixed { get; set; }
        public int type_answer { get; set; }
        public List<SMT_CauTrucDe_SectionTable> data_table { get; set; }
    }
}
