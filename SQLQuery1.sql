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