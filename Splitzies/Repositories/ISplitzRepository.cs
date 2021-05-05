using Splitzies.Models;
using System.Collections.Generic;

namespace Splitzies.Repositories
{
    public interface ISplitzRepository
    {
        void Add(Splitz splitz);
        Splitz GetById(int id);
        List<Splitz> GetSplitzByFirebaseId(int userProfileId);
        void Update(Splitz splitz);
    }
}