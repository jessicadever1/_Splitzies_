using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Splitzies.Models;
using Splitzies.Utils;

namespace Splitzies.Repositories
{
    public class SplitzRepository : BaseRepository
    {
        public SplitzRepository(IConfiguration configuration) : base(configuration) { }



        public List<Splitz> GetSplitzByUserProfileId(int userProfileId)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT US.SplitzId,
                            US.UserProfileId,
                            S.SplitzName,
                            S.Id,
                            S.SplitzDetails,
                            S.[Date],
                            S.DeletedDate,
                            UP.DisplayName
                    FROM UserSplitz US
                        LEFT JOIN Splitz S ON US.SplitzId = S.Id
                        LEFT JOIN UserProfile UP ON US.UserProfileId = UP.ID
                    WHERE US.UserProfileId = @userProfileId;";

                    cmd.Parameters.AddWithValue("@userProfileId", userProfileId);

                    SqlDataReader reader = cmd.ExecuteReader();

                    List<Splitz> posts = new List<Splitz>();

                    while (reader.Read())
                    {
                        Splitz post = new Splitz()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            SplitzName = DbUtils.GetString(reader, "SplitzName"),
                            SplitzDetails = DbUtils.GetString(reader, "SplitzDetails"),
                            Date = DbUtils.GetDateTime(reader, "Date"),
                            DeletedDate = DbUtils.GetDateTime(reader, "DeletedDate"),
                            UserProfile = new UserProfile()
                            {
                                Id = DbUtils.GetInt(reader, "UserProfileId"),
                                DisplayName = DbUtils.GetString(reader, "DisplayName"),
                                FirstName = DbUtils.GetString(reader, "FirstName"),
                                LastName = DbUtils.GetString(reader, "LastName"),
                                Email = DbUtils.GetString(reader, "Email"),
                                UserTypeId = DbUtils.GetInt(reader, "UserTypeId"),

                            },
                            UserSplitz = new UserSplitz()
                            {
                                Id = DbUtils.GetInt(reader, "CategoryId"),
                                Name = DbUtils.GetString(reader, "Category")
                            }
                        };

                        post.userProfile = new UserProfile()
                        {
                            DisplayName = reader.GetString(reader.GetOrdinal("DisplayName"))
                        };


                        posts.Add(post);
                    }
                    reader.Close();
                    return posts;

                }
            }
        }

    }
}
