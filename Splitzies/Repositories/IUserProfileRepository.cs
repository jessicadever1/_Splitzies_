using Splitzies.Models;
using System.Collections.Generic;

namespace Splitzies.Repositories
{
    public interface IUserProfileRepository
    {
        void Add(UserProfile userProfile);
        List<UserProfile> GetAllUserProfiles();
        UserProfile GetByFirebaseId(string firebaseId);
        UserProfile GetById(int id);
        void Deactivate(int id);
      
    }
}