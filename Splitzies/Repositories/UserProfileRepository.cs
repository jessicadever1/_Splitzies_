using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using Splitzies.Models;
using Splitzies.Utils;

namespace Splitzies.Repositories
{
    public class UserProfileRepository : BaseRepository, IUserProfileRepository
    {
        public UserProfileRepository(IConfiguration configuration) : base(configuration) { }



        public List<UserProfile> GetAllUserProfiles()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                         SELECT up.Id as UserProfileId, 
                                                up.FirebaseId, 
                                                up.DisplayName, 
                                                up.FirstName, 
                                                up.LastName, 
                                                up.Email, 
                                                up.ProfilePic
                                              
                                         FROM UserProfile up
                                         
                                         ORDER BY up.DisplayName";

                    var reader = cmd.ExecuteReader();
                    var userProfiles = new List<UserProfile>();
                    while (reader.Read())
                    {
                        userProfiles.Add(new UserProfile()
                        {
                            Id = DbUtils.GetInt(reader, "UserProfileId"),
                            FirebaseId = DbUtils.GetString(reader, "FirebaseId"),
                            DisplayName = DbUtils.GetString(reader, "DisplayName"),
                            FirstName = DbUtils.GetString(reader, "FirstName"),
                            LastName = DbUtils.GetString(reader, "LastName"),
                            Email = DbUtils.GetString(reader, "Email"),
                            ProfilePic = DbUtils.GetString(reader, "ProfilePic")
                        });
                    }
                    reader.Close();
                    return userProfiles;
                }
            }
        }



        public UserProfile GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                        SELECT up.Id as UserProfileId, 
                                               up.FirebaseId, 
                                               up.DisplayName, 
                                               up.FirstName, 
                                               up.LastName, 
                                               up.Email, 
                                               up.ProfilePic

                                         FROM UserProfile up
                                         
                                        WHERE up.Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    var reader = cmd.ExecuteReader();
                    UserProfile userProfile = null;
                    while (reader.Read())
                    {
                        userProfile = new UserProfile()
                        {
                            Id = DbUtils.GetInt(reader, "UserProfileId"),
                            FirebaseId = DbUtils.GetString(reader, "FirebaseId"),
                            DisplayName = DbUtils.GetString(reader, "DisplayName"),
                            FirstName = DbUtils.GetString(reader, "FirstName"),
                            LastName = DbUtils.GetString(reader, "LastName"),
                            Email = DbUtils.GetString(reader, "Email"),
                            ProfilePic = DbUtils.GetString(reader, "ProfilePic")
                        };
                    }
                    reader.Close();
                    return userProfile;
                }
            }
        }


        public UserProfile GetByFirebaseId(string firebaseId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT up.Id, 
                               up.FirebaseId, 
                               up.FirstName, 
                               up.LastName, 
                               up.DisplayName, 
                               up.Email, 
                               up.ProfilePic 

                          FROM UserProfile up
                               
                         WHERE FirebaseId = @FirebaseId";

                    DbUtils.AddParameter(cmd, "@FirebaseId", firebaseId);

                    UserProfile userProfile = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        userProfile = new UserProfile()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            FirebaseId = DbUtils.GetString(reader, "FirebaseId"),
                            FirstName = DbUtils.GetString(reader, "FirstName"),
                            LastName = DbUtils.GetString(reader, "LastName"),
                            DisplayName = DbUtils.GetString(reader, "DisplayName"),
                            Email = DbUtils.GetString(reader, "Email"),
                            ProfilePic = DbUtils.GetString(reader, "ProfilePic")
                        };
                    }
                    reader.Close();

                    return userProfile;
                }
            }
        }



        public void Add(UserProfile userProfile)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO UserProfile 
                                            (FirebaseId, 
                                             FirstName, 
                                             LastName, 
                                             DisplayName, 
                                             Email, 
                                             ProfilePic)
                                        OUTPUT INSERTED.ID
                                        VALUES 
                                            (@FirebaseId, 
                                             @FirstName, 
                                             @LastName, 
                                             @DisplayName, 
                                             @Email, 
                                             @ProfilePic)";
                    DbUtils.AddParameter(cmd, "@FirebaseId", userProfile.FirebaseId);
                    DbUtils.AddParameter(cmd, "@FirstName", userProfile.FirstName);
                    DbUtils.AddParameter(cmd, "@LastName", userProfile.LastName);
                    DbUtils.AddParameter(cmd, "@DisplayName", userProfile.DisplayName);
                    DbUtils.AddParameter(cmd, "@Email", userProfile.Email);
                    DbUtils.AddParameter(cmd, "@ProfilePic", userProfile.ProfilePic);

                    userProfile.Id = (int)cmd.ExecuteScalar();
                }
            }
        }


        /* 
         
        -In preparation for Version 2.0-
         
        public void Deactivate(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE UserProfile 
                        SET IsDeleted = 1
                        WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

       */
    }
}