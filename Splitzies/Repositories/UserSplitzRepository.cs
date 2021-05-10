using System.Collections.Generic;
using Microsoft.Extensions.Configuration;
using Splitzies.Models;
using Splitzies.Utils;

namespace Splitzies.Repositories
{
    public class UserSplitzRepository : BaseRepository, IUserSplitzRepository
    {
        public UserSplitzRepository(IConfiguration configuration) : base(configuration) { }

        public List<UserProfile> GetUserProfilesByUserSplitzId(int splitzId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                        SELECT  UserSplitz.Id,
                                                UserSplitz.splitzId AS splitzId,
                                                UserProfileId,
                                                UserProfile.DisplayName,
                                                UserProfile.ProfilePic,
                                                UserProfile.FirebaseId
                                        FROM UserSplitz
                                            LEFT JOIN UserProfile ON UserSplitz.UserProfileId = UserProfile.Id
                                        WHERE UserSplitz.SplitzId = @Id
                                        ORDER BY up.DisplayName";

                    DbUtils.AddParameter(cmd, "@splitzId", splitzId);

                    var reader = cmd.ExecuteReader();
                    var userProfiles = new List<UserProfile>();
                    while (reader.Read())
                    {
                        userProfiles.Add(new UserProfile()
                        {
                            Id = DbUtils.GetInt(reader, "UserProfileId"),
                            FirebaseId = DbUtils.GetString(reader, "FirebaseId"),
                            DisplayName = DbUtils.GetString(reader, "DisplayName"),
                            ProfilePic = DbUtils.GetString(reader, "ProfilePic")
                        });
                    }
                    reader.Close();
                    return userProfiles;
                }
            }
        }




        public void Add(UserSplitz userSplitz)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO UserSplitz 
                                            (userProfileId,
                                             slitzId)

                                        OUTPUT INSERTED.ID

                                        VALUES 
                                            (@userProfileId, 
                                             @splitzId)";

                    DbUtils.AddParameter(cmd, "@userProfileId", userSplitz.UserProfileId);
                    DbUtils.AddParameter(cmd, "@splitzId", userSplitz.SplitzId);

                    userSplitz.Id = (int)cmd.ExecuteScalar();
                }
            }
        }








    }
}
