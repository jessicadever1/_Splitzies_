using Splitzies.Models;
using System.Collections.Generic;

namespace Splitzies.Repositories
{
    public interface ISplitzRepository
    {
        void Add(Splitz splitz);
        void Delete(int id);
        Splitz GetById(int id, int splitzId);
        List<Splitz> GetSplitzByUserProfileId(int userProfileId);
        void Update(Splitz splitz);
    }
}