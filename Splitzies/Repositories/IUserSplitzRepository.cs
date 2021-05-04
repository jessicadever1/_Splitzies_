using Splitzies.Models;
using System.Collections.Generic;

namespace Splitzies.Repositories
{
    public interface IUserSplitzRepository
    {
        List<UserProfile> GetUserProfilesByUserSplitzId(int id);
    }
}