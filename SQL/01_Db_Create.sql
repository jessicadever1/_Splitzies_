USE [master]
GO
IF db_id('Splitzies') IS NULL
  CREATE DATABASE [Splitzies]
GO
USE [Splitzies]
GO

DROP TABLE IF EXISTS [UserSplitz];
DROP TABLE IF EXISTS [Owed];
DROP TABLE IF EXISTS [Splitz];
DROP TABLE IF EXISTS [Expense];
DROP TABLE IF EXISTS [Category];
DROP TABLE IF EXISTS [UserProfile];

CREATE TABLE [Category] (
  [Id] integer PRIMARY KEY identity NOT NULL,
  [CategoryName] nvarchar(255) NOT NULL
)
GO

CREATE TABLE [UserProfile] (
  [Id] integer PRIMARY KEY identity NOT NULL,
  [FirebaseId] nvarchar(28) NOT NULL,
  [FirstName] nvarchar(255) NOT NULL,
  [LastName] nvarchar(255),
  [DisplayName] nvarchar(255) NOT NULL,
  [Email] nvarchar(255) NOT NULL,
  [ProfilePic] nvarchar (255),

  CONSTRAINT UQ_FirebaseId UNIQUE(FirebaseId)
)
GO

CREATE TABLE [Splitz] (
  [Id] integer PRIMARY KEY identity NOT NULL,
  [SplitzName] nvarchar(255) NOT NULL,
  [Date] datetime NOT NULL,
  [SplitzDetails] nvarchar(2550),
  [DeletedDate] datetime,
)
GO

CREATE TABLE [UserSplitz] (
  [Id] integer PRIMARY KEY identity NOT NULL,
  [UserProfileId] integer NOT NULL,
  [SplitzId] integer NOT NULL,

  CONSTRAINT [FK_UserSplitz_UserProfile] FOREIGN KEY ([UserProfileId]) REFERENCES [UserProfile] ([Id]),
  CONSTRAINT [FK_UserSplitz_Splitz] FOREIGN KEY ([SplitzId]) REFERENCES [Splitz] ([Id])
)
GO

CREATE TABLE [Expense] (
  [Id] integer PRIMARY KEY identity NOT NULL,
  [ExpenseName] nvarchar(255) NOT NULL,
  [CategoryId] integer NOT NULL,
  [Amount] integer NOT NULL,
  [UserWhoPaidId] integer NOT NULL,
  [SplitzId] integer NOT NULL,
  [DeletedDate] date,

  CONSTRAINT [FK_Expense_Category] FOREIGN KEY ([CategoryId]) REFERENCES [Category] ([Id]),
  CONSTRAINT [FK_Expense_Splitz] FOREIGN KEY ([SplitzId]) REFERENCES [Splitz] ([Id])
)
GO

CREATE TABLE [Owed] (
  [Id] integer PRIMARY KEY identity NOT NULL,
  [ExpenseId] integer NOT NULL,
  [UserThatOwesId] integer NOT NULL,
  [Amount] integer NOT NULL,
  [Paid] bit NOT NULL,

  CONSTRAINT [FK_Owed_Expense] FOREIGN KEY ([ExpenseId]) REFERENCES [Expense] ([Id]),
  CONSTRAINT [FK_Owed_User] FOREIGN KEY ([UserThatOwesId]) REFERENCES [UserProfile] ([Id])
)
GO
