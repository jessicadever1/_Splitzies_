using System.Collections.Generic;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Splitzies.Models;
using Splitzies.Utils;
using System;
using System.Linq;

namespace Splitzies.Repositories
{
    public class SplitzRepository : BaseRepository, ISplitzRepository
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
                        SELECT  US.Id AS UserSplitzId,
                            US.SplitzId AS SplitzId,
                            US.UserProfileId,
                                
                            S.SplitzName,
                            S.Id AS Id,
                            S.SplitzDetails,
                            S.[Date],
                            S.DeletedDate,
                            S.SplitzPic,

                            UP.DisplayName,
                            UP.FirstName,
                            UP.LastName,
                            UP.Email,
                            UP.FirebaseId,
                            UP.ProfilePic
                    FROM UserSplitz US
                        LEFT JOIN UserProfile UP ON US.UserProfileId = UP.Id
                        LEFT JOIN Splitz S ON US.SplitzId = S.Id
                    WHERE S.Id IN (
                    SELECT US.SplitzId
                    FROM UserSplitz US
                    WHERE US.UserProfileId = @userProfileId )
                    ORDER BY S.Date DESC";

                    cmd.Parameters.AddWithValue("@userProfileId", userProfileId);

                    SqlDataReader reader = cmd.ExecuteReader();

                    List<Splitz> splitzies = new List<Splitz>();
                    while (reader.Read())
                    {
                        var splitzId = DbUtils.GetInt(reader, "SplitzId");
                        var existingSplitz = splitzies.FirstOrDefault(s => s.Id == splitzId);
                        if (existingSplitz == null)
                        { 
                            existingSplitz = new Splitz()
                            {
                                Id = splitzId,
                                SplitzName = DbUtils.GetString(reader, "SplitzName"),
                                SplitzDetails = DbUtils.GetString(reader, "SplitzDetails"),
                                Date = DbUtils.GetDateTime(reader, "Date"),
                                DeletedDate = DbUtils.IsDbNull(reader, "DeletedDate") ? null : DbUtils.GetDateTime(reader, "DeletedDate"),
                                SplitzPic = DbUtils.IsDbNull(reader, "SplitzPic") ? null : DbUtils.GetString(reader, "SplitzPic"),
                                UserProfile = new UserProfile()
                                {
                                    Id = DbUtils.GetInt(reader, "UserProfileId"),
                                    FirebaseId = DbUtils.GetString(reader, "FirebaseId"),
                                    DisplayName = DbUtils.GetString(reader, "DisplayName"),
                                    FirstName = DbUtils.GetString(reader, "FirstName"),
                                    LastName = DbUtils.GetString(reader, "LastName"),
                                    Email = DbUtils.GetString(reader, "Email"),
                                    ProfilePic = DbUtils.GetString(reader, "ProfilePic"),
                                },
                                UserSplitz = new UserSplitz()
                                {
                                    Id = DbUtils.GetInt(reader, "UserSplitzId"),
                                    SplitzId = DbUtils.GetInt(reader, "SplitzId"),
                                    UserProfileId = DbUtils.GetInt(reader, "UserProfileId")
                                },
                                UserProfiles = new List<UserProfile>()
                            };
                           
                            splitzies.Add(existingSplitz);
                        }
                        if (DbUtils.IsNotDbNull(reader, "UserProfileId"))
                        {
                            existingSplitz.UserProfiles.Add(new UserProfile()
                            {
                                Id = DbUtils.GetInt(reader, "UserProfileId"),
                                ProfilePic = DbUtils.GetString(reader, "ProfilePic"),
                                DisplayName = DbUtils.GetString(reader, "DisplayName")
                            });
                            
                        }
                    }
                    reader.Close();
                    return splitzies;
                }
            }
        }




        public Splitz GetById(int splitzId, int userProfileId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT 
                                            s.Id AS splitzId,
                                            s.splitzName, 
                                            s.splitzDetails, 
                                            s.date,
                                            s.splitzPic, 
                                            s.deletedDate, 

                                            up.Id AS userProfileId,
                                            up.firebaseId,
                                            up.displayName, 
                                            up.firstName, 
                                            up.lastName, 
                                            up.email, 
                                            up.profilePic,
                
                                            us.Id AS userSplitzId,
                                            us.splitzId
                                       FROM UserSplitz US 
                                        LEFT JOIN UserProfile UP ON US.UserProfileId = UP.Id
                                        LEFT JOIN Splitz S ON US.SplitzId = S.Id
                                       WHERE S.Id IN(
                                        SELECT US.SplitzId
                                        FROM UserSplitz US
                                        WHERE US.UserProfileId = @userProfileId
                                        AND US.SplitzId = @splitzId);";

                    DbUtils.AddParameter(cmd, "@splitzId", splitzId);
                    DbUtils.AddParameter(cmd, "@userProfileId", userProfileId);

                    var reader = cmd.ExecuteReader();
                    Splitz splitz = null;
                    while (reader.Read())
                    {
                        
                        if (splitz == null)
                        {
                            splitz = new Splitz()
                            {
                                Id = splitzId,
                                SplitzName = DbUtils.GetString(reader, "SplitzName"),
                                SplitzDetails = DbUtils.GetString(reader, "SplitzDetails"),
                                Date = DbUtils.GetDateTime(reader, "Date"),
                                SplitzPic = DbUtils.IsDbNull(reader, "SplitzPic") ? null : DbUtils.GetString(reader, "SplitzPic"),
                                DeletedDate = DbUtils.IsDbNull(reader, "DeletedDate") ? null : DbUtils.GetDateTime(reader, "DeletedDate"),
                                UserProfile = new UserProfile()
                                {
                                    Id = DbUtils.GetInt(reader, "UserProfileId"),
                                    FirebaseId = DbUtils.GetString(reader, "FirebaseId"),
                                    DisplayName = DbUtils.GetString(reader, "DisplayName"),
                                    FirstName = DbUtils.GetString(reader, "FirstName"),
                                    LastName = DbUtils.GetString(reader, "LastName"),
                                    Email = DbUtils.GetString(reader, "Email"),
                                    ProfilePic = DbUtils.GetString(reader, "ProfilePic"),
                                },
                                UserSplitz = new UserSplitz()
                                {
                                    Id = DbUtils.GetInt(reader, "UserSplitzId"),
                                    SplitzId = DbUtils.GetInt(reader, "SplitzId"),
                                    UserProfileId = DbUtils.GetInt(reader, "UserProfileId")
                                },
                                UserProfiles = new List<UserProfile>()
                            };

                            
                        }
                        if (DbUtils.IsNotDbNull(reader, "UserProfileId"))
                        {
                            splitz.UserProfiles.Add(new UserProfile()
                            {
                                Id = DbUtils.GetInt(reader, "UserProfileId"),
                                ProfilePic = DbUtils.GetString(reader, "ProfilePic"),
                                DisplayName = DbUtils.GetString(reader, "DisplayName")
                            });

                        }
                    }
                    reader.Close();
                    return splitz;
                }
            }
        }



        public void Add(Splitz splitz)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Splitz  (SplitzName, 
                                             SplitzDetails, 
                                             Date,
                                             SplitzPic)

                               OUTPUT INSERTED.ID
                        VALUES (@splitzName, 
                                @splitzDetails,
                                @date,
                                @splitzPic)

                        INSERT INTO UserSplitz (SplitzId,
                                                UserProfileId)
                              OUTPUT INSERTED.ID
                        VALUES (@splitzId
                                @userProfileId)";

                    DbUtils.AddParameter(cmd, "@splitzName", splitz.SplitzName);
                    DbUtils.AddParameter(cmd, "@splitzDetails", splitz.SplitzDetails);
                    DbUtils.AddParameter(cmd, "@date", splitz.Date);
                    DbUtils.AddParameter(cmd, "@splitzPic", splitz.SplitzPic);

                    splitz.Id = (int)cmd.ExecuteScalar();

                }
            }
        }




        public void Delete(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "DELETE FROM Splitz WHERE Id = @Id";
                    DbUtils.AddParameter(cmd, "@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }


        public void Update(Splitz splitz)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE Splitz
                            SET Splitz = @splitzName,
                                
                            WHERE Id = @id";

                 

                    cmd.ExecuteNonQuery();

                }
            }
        }



    }
}
