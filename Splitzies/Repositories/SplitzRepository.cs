using System.Collections.Generic;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Splitzies.Models;
using Splitzies.Utils;
using System;

namespace Splitzies.Repositories
{
    public class SplitzRepository : BaseRepository, ISplitzRepository
    {
        public SplitzRepository(IConfiguration configuration) : base(configuration) { }



        public List<Splitz> GetSplitzByFirebaseId(string firebaseId)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT  US.Id AS UserSplitzId,
                                US.SplitzId,
                                US.UserProfileId,
                                
                                S.SplitzName,
                                S.Id,
                                S.SplitzDetails,
                                S.[Date],
                                S.DeletedDate,

                                UP.DisplayName,
                                UP.FirstName,
                                UP.LastName,
                                UP.Email,
                                UP.FirebaseId,
                                UP.ProfilePic

                    FROM UserSplitz US
                        LEFT JOIN Splitz S ON US.SplitzId = S.Id
                        LEFT JOIN UserProfile UP ON US.UserProfileId = UP.ID
                    WHERE UP.FirebaseId = @firebaseId
                    ORDER BY S.Date DESC";

                    cmd.Parameters.AddWithValue("@firebaseId", firebaseId);

                    SqlDataReader reader = cmd.ExecuteReader();

                    List<Splitz> splitzies = new List<Splitz>();

                    while (reader.Read())
                    {
                        splitzies.Add(new Splitz()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            SplitzName = DbUtils.GetString(reader, "SplitzName"),
                            SplitzDetails = DbUtils.GetString(reader, "SplitzDetails"),
                            Date = DbUtils.GetDateTime(reader, "Date"),
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
                            }
                            
                        });
                    }
                    reader.Close();
                    return splitzies;
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
                                             DeletedDate, 
                                             Date)

                               OUTPUT INSERTED.ID
                        VALUES (@splitzName, 
                                @splitzDetails, 
                                @deletedDate, 
                                @date)";

                    DbUtils.AddParameter(cmd, "@splitzName", splitz.SplitzName);
                    DbUtils.AddParameter(cmd, "@splitzDetails", splitz.SplitzDetails);
                    DbUtils.AddParameter(cmd, "@deletedDate", splitz.DeletedDate);
                    DbUtils.AddParameter(cmd, "@date", splitz.Date);

                    splitz.Id = (int)cmd.ExecuteScalar();

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
