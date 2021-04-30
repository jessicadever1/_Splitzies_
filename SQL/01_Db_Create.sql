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
  [ProfilePic] nvarchar
)
GO

CREATE TABLE [Splitz] (
  [Id] integer PRIMARY KEY identity NOT NULL,
  [SplitzName] nvarchar(255) NOT NULL,
  [Date] datetime NOT NULL,
  [SplitzDetails] nvarchar(2550),
  [UserSplitzId] integer NOT NULL,
  [SplitzExpenseId] integer NOT NULL,
  [IsDeleted] bit NOT NULL
)
GO

CREATE TABLE [UserSplitz] (
  [Id] integer PRIMARY KEY identity NOT NULL,
  [UserProfileId] integer NOT NULL,
  [SplitzId] integer NOT NULL
)
GO

CREATE TABLE [Expense] (
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


ALTER TABLE [Expense] ADD FOREIGN KEY ([CategoryId]) REFERENCES [Category] ([Id])
GO
ALTER TABLE [Expense] ADD FOREIGN KEY ([UserWhoPaidId]) REFERENCES [UserProfile] ([Id])
GO
ALTER TABLE [Expense] ADD FOREIGN KEY ([SplitzId]) REFERENCES [Splitz] ([Id])
GO
ALTER TABLE [Splitz] ADD FOREIGN KEY ([UserSplitzId]) REFERENCES [UserSplitz] ([Id])
GO
ALTER TABLE [Splitz] ADD FOREIGN KEY ([SplitzExpenseId]) REFERENCES [Expense] ([Id])
GO
ALTER TABLE [UserSplitz] ADD FOREIGN KEY ([UserProfileId]) REFERENCES [UserProfile] ([Id])
GO
ALTER TABLE [UserSplitz] ADD FOREIGN KEY ([SplitzId]) REFERENCES [Splitz] ([Id])
GO
ALTER TABLE [Owed] ADD FOREIGN KEY ([ExpenseId]) REFERENCES [Expense] ([Id])
GO
ALTER TABLE [Owed] ADD FOREIGN KEY ([UserThatOwesId]) REFERENCES [UserProfile] ([Id])
GO
