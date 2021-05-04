using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Splitzies.Models
{
    public class UserSplitz
    {
        public int Id { get; set; }
        public int UserProfileId { get; set; }
        public int SplitzId { get; set; }
        public UserProfile UserProfile { get; set; }
    }
}
