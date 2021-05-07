using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Splitzies.Models
{
    public class SplitzUsersCreate
    {
        public int Id { get; set; }
        public string SplitzName { get; set; }
        public DateTime Date { get; set; }
        public string SplitzDetails { get; set; }
        public string? SplitzPic { get; set; }
        public UserProfile? UserProfile { get; set; }
        public List<int>? splitzUsers { get; set; }
    }
}
