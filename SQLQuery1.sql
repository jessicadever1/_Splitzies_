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
                    WHERE UP.FirebaseId = VfL1t0g0O2eV3Lyttnj3b54ydu82
                    ORDER BY S.Date DESC

