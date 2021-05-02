using Splitzies.Models;
using System.Collections.Generic;

namespace Splitzies.Repositories
{
    public interface ISplitzRepository
    {
        void Add(Splitz splitz);
        List<Splitz> GetSplitzByFirebaseId(string firebaseId);
    }
}