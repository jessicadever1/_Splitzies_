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
       
        /* 
        
        -in preparation for Version 2.0-

        void Deactivate(int id);
       */
    }
}