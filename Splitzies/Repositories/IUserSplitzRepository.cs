using Splitzies.Models;
using System.Collections.Generic;

namespace Splitzies.Repositories
{
    public interface IUserSplitzRepository
    {
        void Add(UserSplitz userSplitz);
        List<UserProfile> GetUserProfilesByUserSplitzId(int id);
    }
}