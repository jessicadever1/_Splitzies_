SELECT  US.Id AS UserSplitzId,
                            US.SplitzId AS SplitzId,
                            US.UserProfileId,
                                
                            S.SplitzName,
                            S.Id AS Id,
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
                        LEFT JOIN UserProfile UP ON US.UserProfileId = UP.Id
                        LEFT JOIN Splitz S ON US.SplitzId = S.Id
                    WHERE S.Id IN (
                    SELECT US.SplitzId
                    FROM UserSplitz US
                    WHERE US.UserProfileId = 7 )