/* Sets up the database, dropping existing tables and creating new ones */

IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[users]') AND type in (N'U'))
DROP TABLE [dbo].[users]
GO

IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[videos]') AND type in (N'U'))
DROP TABLE [dbo].[videos]
GO

IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[channels]') AND type in (N'U'))
DROP TABLE [dbo].[channels]
GO

IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[comments]') AND type in (N'U'))
DROP TABLE [dbo].[comments]
GO

CREATE TABLE users(
    userId VARCHAR(128) PRIMARY KEY NOT NULL,
    userName VARCHAR(256),
    userEmail VARCHAR(256),
    userPhoto VARBINARY(MAX),
)

CREATE TABLE videos(
    videoId VARCHAR(128) PRIMARY KEY NOT NULL,
    streamUrl VARCHAR(512),
    privacy NUMERIC NOT NULL,
    author VARCHAR(128) NOT NULL,
    uploaded DATETIME2,
    title NVARCHAR(1024),
    description NVARCHAR(2048),
    length NUMERIC,
    views NUMERIC NOT NULL,
    thumbnail VARCHAR(512),
    CONSTRAINT fkVidsAuthor FOREIGN KEY (author) REFERENCES users(userId) ON DELETE CASCADE
)

CREATE TABLE channels(
    channelId VARCHAR(128) PRIMARY KEY NOT NULL,
    displayName VARCHAR(256),
    channelPhoto VARBINARY(MAX),
    reported BIT,
    suspended BIT,
    CONSTRAINT fkChannelsAuthor FOREIGN KEY (channelId) REFERENCES users(userId) ON DELETE CASCADE
)

CREATE TABLE comments(
    commentId VARCHAR(128) PRIMARY KEY NOT NULL,
    videoId VARCHAR(128) NOT NULL,
    pubDate DATETIME2,
    timestamp NUMERIC NOT NULL,
    author VARCHAR(128) NOT NULL,
    comment NVARCHAR(1024) NOT NULL,
    reported BIT,
    CONSTRAINT fkCommentsAuthor FOREIGN KEY (author) REFERENCES users(userId) ON DELETE NO ACTION,
    CONSTRAINT fkCommentsVideo FOREIGN KEY (videoId) REFERENCES videos(videoId) ON DELETE CASCADE
)