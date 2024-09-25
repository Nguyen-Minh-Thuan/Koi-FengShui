USE [master]
GO

--DROP DATABASE [SWP391FengShuiKoiSystem]

/****** Object:  Database [SWP391FengShuiKoiSystem]    Script Date: 24/09/24 7:10PM  ******/
CREATE DATABASE [SWP391FengShuiKoiSystem]
GO

Use [SWP391FengShuiKoiSystem]
GO

/****** Object:  Table [dbo].[User]    Script Date: 24/09/24 7:10PM  ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[User](
	[UserId] [int] IDENTITY(1,1) NOT NULL,
	[UserName] [nvarchar](50) NOT NULL,
	[Password] [nvarchar](50) NOT NULL,
	[Email] [nvarchar](50) NOT NULL,
	[Bio] [nvarchar](250) NULL,
	[ImageUrl] [nvarchar](250) NULL,
	[IsActive] [bit] NULL,
	[Role] [varchar](25) NOT NULL,
 CONSTRAINT [PK_User] PRIMARY KEY CLUSTERED 
(
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

/****** Object:  Table [dbo].[Advertisement]    Script Date: 24/09/24 7:10PM  ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Advertisement](
	[AdsId] [int] IDENTITY(1,1) NOT NULL,
	[UserId] [int] NOT NULL,
	[PackageID] [int] NOT NULL,
	[Title] [nvarchar](50) NULL,
	[Content] [nvarchar](500) NULL,
	[Status] [nvarchar] (50) NOT NULL,
	[ElementID] [int] NOT NULL,
	[ExpiredDate] [datetime] NOT NULL,
	[ImageUrl] [nvarchar](250) NULL,
	[PaymentStatus] [bit] NULL,
 CONSTRAINT [PK_Advertisement] PRIMARY KEY CLUSTERED 
(
	[AdsId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Package]    Script Date: 24/09/24 7:10PM  ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Package](
	[PackageID] [int] IDENTITY(1,1) NOT NULL,
	[PackageName] [nvarchar](50) NULL,
	[Price] [decimal](18, 2) NULL,
 CONSTRAINT [PK_PackageID] PRIMARY KEY CLUSTERED 
(
	[PackageID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Package]    Script Date: 24/09/24 7:10PM  ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Transaction](
	[TransactionID] [int] IDENTITY(1,1) NOT NULL,
	[UserId] [int] NOT NULL,
	[AdsId] [int] NOT NULL,
	[PackageID] [int] NOT NULL,
	[FromDate] [datetime] NOT NULL,
	[ToDate] [datetime] NOT NULL,
	[PaymentMethod] [nvarchar] (50) NOT NULL,
	[TransactionDate] [datetime] NOT NULL,
	[TotalPrice] [decimal](18, 2) NULL,
 CONSTRAINT [PK_Transaction] PRIMARY KEY CLUSTERED 
(
	[TransactionID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

SET IDENTITY_INSERT [dbo].[User] ON 

INSERT [dbo].[User] ([UserId],[UserName],[Password],[Email],[Bio],[ImageUrl],[IsActive],[Role]) VALUES (1, N'Admin', N'1', N'None', N'This is an Admin account', N'None', 1, 'Admin')
INSERT [dbo].[User] ([UserId],[UserName],[Password],[Email],[Bio],[ImageUrl],[IsActive],[Role]) VALUES (2, N'Laazy', N'1', N'None', N'HungDepTrai', N'None', 1, 'Admin')
INSERT [dbo].[User] ([UserId],[UserName],[Password],[Email],[Bio],[ImageUrl],[IsActive],[Role]) VALUES (3, N'User1', N'1', N'None', N'This is an User account', N'None', 1, 'User')
INSERT [dbo].[User] ([UserId],[UserName],[Password],[Email],[Bio],[ImageUrl],[IsActive],[Role]) VALUES (4, N'User2', N'2', N'None', N'This is an User account', N'None', 1, 'User')
INSERT [dbo].[User] ([UserId],[UserName],[Password],[Email],[Bio],[ImageUrl],[IsActive],[Role]) VALUES (5, N'User3', N'3', N'None', N'This is an User account', N'None', 1, 'User')

SET IDENTITY_INSERT [dbo].[User] OFF
GO
SET IDENTITY_INSERT [dbo].[Advertisement] ON 

INSERT [dbo].[Advertisement] ([AdsId],[UserId],[PackageID],[Title],[Content],[Status],[ElementID],[ExpiredDate],[ImageUrl],[PaymentStatus]) VALUES (1,3,1,N'Tiêu đề Quảng cáo #1',N'Nội dung quảng cáo #1',N'Approve',1,CAST(N'2024-09-24T00:00:00.000' AS DateTime),N'None',0)
INSERT [dbo].[Advertisement] ([AdsId],[UserId],[PackageID],[Title],[Content],[Status],[ElementID],[ExpiredDate],[ImageUrl],[PaymentStatus]) VALUES (2,4,1,N'Tiêu đề Quảng cáo #2',N'Nội dung quảng cáo #2',N'Deploying',2,CAST(N'2024-09-25T00:00:00.000' AS DateTime),N'None',1)
INSERT [dbo].[Advertisement] ([AdsId],[UserId],[PackageID],[Title],[Content],[Status],[ElementID],[ExpiredDate],[ImageUrl],[PaymentStatus]) VALUES (3,4,2,N'Tiêu đề Quảng cáo #3',N'Nội dung quảng cáo #3',N'Waiting',3,CAST(N'2024-09-25T00:00:00.000' AS DateTime),N'None',1)
INSERT [dbo].[Advertisement] ([AdsId],[UserId],[PackageID],[Title],[Content],[Status],[ElementID],[ExpiredDate],[ImageUrl],[PaymentStatus]) VALUES (4,5,2,N'Tiêu đề Quảng cáo #4',N'Nội dung quảng cáo #4',N'Expired',4,CAST(N'2024-09-24T00:00:00.000' AS DateTime),N'None',1)

SET IDENTITY_INSERT [dbo].[Advertisement] OFF
GO
SET IDENTITY_INSERT [dbo].[Package] ON 

INSERT [dbo].[Package] ([PackageID],[PackageName],[Price]) VALUES (1,N'Normal Package',20000)
INSERT [dbo].[Package] ([PackageID],[PackageName],[Price]) VALUES (2,N'Exclusive Package',50000)

SET IDENTITY_INSERT [dbo].[Package] OFF
GO
SET IDENTITY_INSERT [dbo].[Transaction] ON 

INSERT [dbo].[Transaction] ([TransactionID],[UserId],[AdsId],[PackageID],[FromDate],[ToDate],[PaymentMethod],[TransactionDate],[TotalPrice]) VALUES (1,3,1,1,CAST(N'2024-09-20T00:00:00.000' AS DateTime),CAST(N'2024-09-30T00:00:00.000' AS DateTime),N'QRCODE',CAST(N'2024-09-19T00:00:00.000' AS DateTime),250000)
INSERT [dbo].[Transaction] ([TransactionID],[UserId],[AdsId],[PackageID],[FromDate],[ToDate],[PaymentMethod],[TransactionDate],[TotalPrice]) VALUES (2,4,2,1,CAST(N'2024-09-20T00:00:00.000' AS DateTime),CAST(N'2024-09-29T00:00:00.000' AS DateTime),N'QRCODE',CAST(N'2024-09-19T00:00:00.000' AS DateTime),300000)
INSERT [dbo].[Transaction] ([TransactionID],[UserId],[AdsId],[PackageID],[FromDate],[ToDate],[PaymentMethod],[TransactionDate],[TotalPrice]) VALUES (3,4,3,2,CAST(N'2024-09-20T00:00:00.000' AS DateTime),CAST(N'2024-09-29T00:00:00.000' AS DateTime),N'QRCODE',CAST(N'2024-09-19T00:00:00.000' AS DateTime),600000)
INSERT [dbo].[Transaction] ([TransactionID],[UserId],[AdsId],[PackageID],[FromDate],[ToDate],[PaymentMethod],[TransactionDate],[TotalPrice]) VALUES (4,5,4,2,CAST(N'2024-09-20T00:00:00.000' AS DateTime),CAST(N'2024-09-30T00:00:00.000' AS DateTime),N'QRCODE',CAST(N'2024-09-19T00:00:00.000' AS DateTime),500000)

SET IDENTITY_INSERT [dbo].[Transaction] OFF
GO

/****** Object:  Table [dbo].[[Advertisement]]    Script Date: 24/09/24 7:10PM  ******/

ALTER TABLE [dbo].[Advertisement]  WITH CHECK ADD  CONSTRAINT [FK_Advertisement_User] FOREIGN KEY([UserId])
REFERENCES [dbo].[User] ([UserId])
GO
ALTER TABLE [dbo].[Advertisement] CHECK CONSTRAINT [FK_Advertisement_User]
GO

ALTER TABLE [dbo].[Advertisement]  WITH CHECK ADD  CONSTRAINT [FK_Advertisement_Package] FOREIGN KEY([PackageID])
REFERENCES [dbo].[Package] ([PackageID])
GO
ALTER TABLE [dbo].[Advertisement] CHECK CONSTRAINT [FK_Advertisement_Package]
GO

/****** Object:  Table [dbo].[Transaction]    Script Date: 24/09/24 7:10PM  ******/
--Hasn't Constraint to Element Table due to unavailable.

ALTER TABLE [dbo].[Transaction]  WITH CHECK ADD  CONSTRAINT [FK_Transaction_User] FOREIGN KEY([UserId])
REFERENCES [dbo].[User] ([UserId])
GO
ALTER TABLE [dbo].[Transaction] CHECK CONSTRAINT [FK_Transaction_User]
GO

ALTER TABLE [dbo].[Transaction]  WITH CHECK ADD  CONSTRAINT [FK_Transaction_Advertisement] FOREIGN KEY([AdsId])
REFERENCES [dbo].[Advertisement] ([AdsId])
GO
ALTER TABLE [dbo].[Transaction] CHECK CONSTRAINT [FK_Transaction_Advertisement]
GO

ALTER TABLE [dbo].[Transaction]  WITH CHECK ADD  CONSTRAINT [FK_Transaction_Package] FOREIGN KEY([PackageID])
REFERENCES [dbo].[Package] ([PackageID])
GO
ALTER TABLE [dbo].[Transaction] CHECK CONSTRAINT [FK_Transaction_Package]
GO


select * from [dbo].[User]
select * from [dbo].[Package]
select * from [dbo].[Advertisement]
select * from [dbo].[Transaction]