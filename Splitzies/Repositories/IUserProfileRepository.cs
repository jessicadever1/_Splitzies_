using Splitzies.Models;
using System.Collections.Generic;

namespace Splitzies.Repositories
{
    public interface IUserProfileRepository
    {
        void Add(UserProfile userProfile);
        void Deactivate(int id);
        List<UserProfile> GetAllUserProfiles();
        UserProfile GetByFirebaseUserId(string firebaseUserId);
        UserProfile GetById(int id);
    }
}