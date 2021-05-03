using System;

namespace Splitzies.Models
{
    public class Splitz
    {
        public int Id { get; set; }
        public string SplitzName { get; set; }
        public DateTime Date { get; set; }
        public string SplitzDetails { get; set; }
        public DateTime DeletedDate { get; set; }
        public UserProfile UserProfile { get; set; }
        public UserSplitz UserSplitz { get; set; }
    }
}
