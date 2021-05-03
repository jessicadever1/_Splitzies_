SELECT  S.SplitzName,
        S.Id,
        S.SplitzDetails,
        S.[Date],
        S.DeletedDate, 
        US.SplitzId AS USSId
FROM Splitz S
  JOIN UserSplitz US ON S.Id = US.Id
 
WHERE US.UserProfileId = 1

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
WHERE US.UserProfileId = 2


SELECT  US.SplitzId,
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
                    
                    ORDER BY S.Date DESC



SELECT UserSplitz.Id,
       UserProfileId,
       UserProfile.DisplayName,
       UserProfile.ProfilePic
FROM UserSplitz
    LEFT JOIN UserProfile ON UserSplitz.UserProfileId = UserProfile.Id
WHERE UserSplitz.SplitzId = 5

SELECT up.Id as UserProfileId, 
                                                up.FirebaseId, 
                                                up.DisplayName, 
                                                up.FirstName, 
                                                up.LastName, 
                                                up.Email, 
                                                up.ProfilePic
                                              
                                         FROM UserSplitz us
                                            LEFT JOIN UserProfile up ON us.UserProfileId = up.Id
                                            LEFT JOIN Splitz s ON us.SplitzId = s.Id
                                         WHERE UserSplitz.SplitzId = 5