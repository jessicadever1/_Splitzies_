SET IDENTITY_INSERT [UserProfile] ON
INSERT INTO [UserProfile]
  ([Id], [FirebaseId], [FirstName], [LastName], [DisplayName], [Email], [ProfilePic])
VALUES 
  (1, 'TBD', 'Jess', 'Dever','jessicaDever1', 'jessicaDever1@email.com', 'https://scontent-atl3-1.xx.fbcdn.net/v/t1.6435-9/121741309_10106969277788398_6017154893440164771_n.jpg?_nc_cat=111&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=3LxxcYBk57cAX9c3Zwp&_nc_ht=scontent-atl3-1.xx&oh=79e7a0f186488cd21fce7855b56995ed&oe=60B029CD'),
  (2, 'TBD2', 'Holly', 'Pizza', 'hollyPizza1', 'hollyPizza1@email.com', 'https://scontent-atl3-1.xx.fbcdn.net/v/t1.18169-9/17458194_10101028018230419_8602242080435408364_n.jpg?_nc_cat=110&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=lQu_Ot5XLvAAX-ybj-k&_nc_ht=scontent-atl3-1.xx&oh=81cef231d2924882219f30e436d8e2da&oe=60AFD5B4'),
  (3, 'TBD3', 'Nikki', 'Simps', 'nikkiSimps1', 'nikkiSimps1@email.com', 'https://scontent-atl3-1.xx.fbcdn.net/v/t1.6435-9/116434435_10217197624988313_1823661361022328864_n.jpg?_nc_cat=111&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=96hTW-enDBkAX_Ie7fm&_nc_ht=scontent-atl3-1.xx&oh=0db83653baa5b31b8615c0c790e8381b&oe=60B08BFC'),
  (4, 'TBD4', 'Dennis', 'Palms', 'dennisPalms1', 'dennisPalms1@email.com', 'https://scontent-atl3-1.xx.fbcdn.net/v/t1.6435-9/125797886_10104588465221173_6545111523512399190_n.jpg?_nc_cat=102&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=qIbEMmCCdHcAX9A_qt7&_nc_ht=scontent-atl3-1.xx&oh=a21569f27a18069df55d59899a39113d&oe=60AF8494'),
  (5, 'TBD5', 'Steph', 'Sander', 'stephSander1', 'stephSander1@email.com', 'https://scontent-atl3-1.xx.fbcdn.net/v/t1.6435-9/72555850_10215777289050738_6761054276602036224_n.jpg?_nc_cat=100&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=k2J0NQ8WKq0AX_olgMD&_nc_ht=scontent-atl3-1.xx&oh=b48e1ab5ef60b34f99ede9b825fd1be8&oe=60AFED2C'),
  (6, 'TBD6', 'Heather', 'Moh', 'heatherMoh1', 'heatherMoh1@email.com', 'https://scontent-atl3-1.xx.fbcdn.net/v/t1.18169-9/10351573_835106766500234_5576815135466811313_n.jpg?_nc_cat=100&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=-FlWCvHm9KcAX_9Qi-R&_nc_ht=scontent-atl3-1.xx&oh=ce0692fa615d8f49f0f1e412bcd40cbc&oe=60AF5926'),
  (7, 'TBD7', 'Christy', 'Rich', 'christyRich1', 'christyRich1@email.com', 'https://scontent-atl3-1.xx.fbcdn.net/v/t31.18172-8/26240147_10215159227399064_3265403966548555266_o.jpg?_nc_cat=106&ccb=1-3&_nc_sid=cdbe9c&_nc_ohc=CkqN5KW8lLUAX85unqB&_nc_ht=scontent-atl3-1.xx&oh=e7a259e93bec2e28851f59cdc84bb2b4&oe=60B0CE64');
SET IDENTITY_INSERT [UserProfile] OFF
SET IDENTITY_INSERT [Splitz] ON
INSERT INTO [Splitz]
  ([Id], [SplitzName], [Date], [SplitzDetails], [UserSplitzId], [SplitzExpenseId], [IsDeleted])
VALUES 
  (1, 'Atlanta Getaway', '04-23-2018', 'This was a weekend getaway to get out of town. Stayed with Hollys parents. Went to Marietta Diner and Park.', 1, 1, 0),
  (2, 'Hollys B-Day', '03-30-2019', 'Celebrated Holly with a dinner at Uncle Julios.', 3, 2, 0),
  (3, 'Vanessas Bach Weekend', '03-30-2020', 'Went to Louisville to do some dancing, adventuring and hanging out. V and Jess dominated in flip cup. Obviously.', 5, 3, 0),
  (4, '4th of July in Destin', '07-04-2019', 'Celebrated Jess turning 30 in sunny FL! Heli ride, dinner out, beaching.', 9, 4, 0),
  (5, 'Sushi Night', '04-01-2021', 'Night of sushi and hanging out!', 12, 5, 0);
SET IDENTITY_INSERT [Splitz] OFF
SET IDENTITY_INSERT [UserSplitz] ON
INSERT INTO [UserSplitz]
  ([Id], [UserProfileId], [SplitzId])
VALUES
  (1, 1, 1),
  (2, 2, 1),
  (3, 1, 2),
  (4, 4, 2),
  (5, 1, 3),
  (6, 2, 3),
  (7, 5, 3),
  (8, 6, 3),
  (9, 1, 4),
  (10, 2, 4),
  (11, 3, 4),
  (12, 1, 5),
  (13, 7, 5);
SET IDENTITY_INSERT [UserSplitz] OFF
SET IDENTITY_INSERT [Expense] ON
INSERT INTO [Expense]
  ([Id], [ExpenseName], [CategoryId], [Amount], [UserWhoPaidId], [SplitzId], [IsDeleted])
VALUES
  (1, 'Gas', 1, 30, 2, 1, 0),
  (2, 'Gas', 1, 25, 1, 1, 0),
  (3, 'Dinner', 2, 40, 4, 2, 0),
  (4, 'Ice Cream', 2, 20, 1, 2, 0),
  (5, 'Gas', 1, 30, 2, 3, 0),
  (6, 'Cave Adventure', 3, 50, 6, 3, 0),
  (7, 'Air BnB', 4, 500, 6, 3, 0),
  (8, 'Gas', 1, 150, 2, 4, 0),
  (9, 'Air BnB', 4, 500, 1, 4, 0),
  (10, 'Heli Ride', 3, 250, 3, 4, 0),
  (11, 'Sushi', 2, 40, 7, 5, 0);
SET IDENTITY_INSERT [Expense] OFF
SET IDENTITY_INSERT [Category] ON
INSERT INTO [Category]
  ([Id], [CategoryName])
VALUES 
  (1, 'Transportation'),
  (2, 'Food'),
  (3, 'Tour'),
  (4, 'Lodging');
SET IDENTITY_INSERT [Category] OFF