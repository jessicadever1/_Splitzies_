USE [master]
GO
IF db_id('Splitzies') IS NULL
  CREATE DATABASE [Splitzies]
GO
USE [Splitzies]
GO

DROP TABLE IF EXISTS [UserProfile];
DROP TABLE IF EXISTS [Splitz];
DROP TABLE IF EXISTS [UserSplitz];
DROP TABLE IF EXISTS [Expenses];
DROP TABLE IF EXISTS [Owed];
DROP TABLE IF EXISTS [Category];

CREATE TABLE [UserProfile] (
  [Id] integer PRIMARY KEY identity NOT NULL,
  [FirebaseId] integer NOT NULL,
  [FirstName] nvarchar(255) NOT NULL,
  [LastName] nvarchar(255),
  [DisplayName] nvarchar(255) NOT NULL,
  [Email] nvarchar(255) NOT NULL,
  [ProfilePic] nvarchar NOT NULL,
  [UserTypeId] integer NOT NULL
)
GO

CREATE TABLE [Splitz] (
  [Id] integer PRIMARY KEY identity NOT NULL,
  [SplitzName] nvarchar(255) NOT NULL,
  [Date] datetime NOT NULL,
  [SplitzDetails] nvarchar(2550),
  [UserSplitzId] integer NOT NULL,
  [SplitzExpensesId] integer NOT NULL,
  [IsDeleted] bit NOT NULL
)
GO

CREATE TABLE [UserSplitz] (
  [Id] integer PRIMARY KEY identity NOT NULL,
  [UserProfileId] integer NOT NULL,
  [splitzId] integer NOT NULL
)
GO

CREATE TABLE [Expenses] (
  [Id] integer PRIMARY KEY identity NOT NULL,
  [ExpenseName] nvarchar(255) NOT NULL,
  [CategoryId] integer NOT NULL,
  [Amount] integer NOT NULL,
  [UserWhoPaidId] integer NOT NULL,
  [SplitzId] integer NOT NULL,
  [IsDeleted] bit NOT NULL
)
GO

CREATE TABLE [Owed] (
  [Id] integer PRIMARY KEY identity NOT NULL,
  [ExpenseId] integer NOT NULL,
  [UserThatOwesId] integer NOT NULL,
  [Amount] integer NOT NULL,
  [Paid] bit NOT NULL
)
GO

CREATE TABLE [Category] (
  [Id] integer PRIMARY KEY identity NOT NULL,
  [CategoryName] nvarchar(255) NOT NULL
)
GO

ALTER TABLE [Splitz] ADD FOREIGN KEY ([UserSplitzId]) REFERENCES [UserProfile] ([Id])
GO
ALTER TABLE [Comment] ADD FOREIGN KEY ([PostId]) REFERENCES [Post] ([Id])
GO
ALTER TABLE [Comment] ADD FOREIGN KEY ([UserProfileId]) REFERENCES [UserProfile] ([Id])
GO
ALTER TABLE [Subscription] ADD FOREIGN KEY ([SubscriberId]) REFERENCES [UserProfile] ([Id])
GO
ALTER TABLE [Subscription] ADD FOREIGN KEY ([ProviderId]) REFERENCES [UserProfile] ([Id])
GO
SET IDENTITY_INSERT [UserProfile] ON
INSERT INTO [UserProfile]
  ([Id], [Name], [Email], [ImageUrl], [Bio], [DateCreated])
VALUES 
  (1, 'Oliver Hardy', 'olie@email.com', null, null, '06-21-2020');
INSERT INTO [UserProfile]
  ([Id], [Name], [Email], [ImageUrl], [Bio], [DateCreated])
VALUES 
  (2, 'Stan Laurel', 'stan@email.com', null, null, '04-20-2020');
SET IDENTITY_INSERT [UserProfile] OFF
SET IDENTITY_INSERT [Post] ON
INSERT INTO [Post]
  ([Id], [Title], [ImageUrl], [Caption], [UserProfileId], [DateCreated])
VALUES
  (1, 'Wait...what?', 'https://media.giphy.com/media/j609LflrIXInkLNMts/giphy.gif', null, 1, '06-22-2020'),
  (2, 'Stop that', 'https://media.giphy.com/media/jroyKTvw89Dh3J1sss/giphy.gif', 'There''s this guy. He''s in a hall. He want''s you to stop', 1, '06-23-2020'),
  (3, 'Paintball', 'https://media.giphy.com/media/l2R09jc6eZIlfXKlW/giphy.gif', 'I believe I will win', 1, '06-29-2020'),
  (4, 'People!', 'https://media.giphy.com/media/u8mNsDNfHCTUQ/giphy.gif', 'animals are better', 1, '06-29-2020'),
  (5, 'Laughter', 'https://media.giphy.com/media/5vGkcQV9AfDPy/giphy.gif', null, 2, '04-20-2020');
SET IDENTITY_INSERT [Post] OFF
SET IDENTITY_INSERT [Comment] ON
INSERT INTO [Comment]
  ([Id], [UserProfileId], [PostId], [Message])
VALUES
  (1, 2, 1, 'A comment is a comment is a comment');
SET IDENTITY_INSERT [Comment] OFF