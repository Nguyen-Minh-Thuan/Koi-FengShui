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
	[Duration] [int] NOT NULL,
	[Price] [decimal](18, 2) NULL,
 CONSTRAINT [PK_PackageID] PRIMARY KEY CLUSTERED 
(
	[PackageID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Transaction]    Script Date: 24/09/24 7:10PM  ******/
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
/****** Object:  Table [dbo].[Element]    Script Date:   ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Element](
	[ElementID] [int] IDENTITY(1,1) NOT NULL,
	[Element] [nvarchar] (25) NOT NULL,
	[Description] [nvarchar] (500)  NULL,
	[Status] [bit] NOT NULL,
 CONSTRAINT [PK_Element] PRIMARY KEY CLUSTERED 
(
	[ElementID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[General]    Script Date:   ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[General](
	[GeneralID] [int] IDENTITY(1,1) NOT NULL,
	[ElementID] [int] NOT NULL,
	[KuaID] [int] NOT NULL,
	--[Status] [bit] NOT NULL,
 CONSTRAINT [PK_General] PRIMARY KEY CLUSTERED 
(
	[GeneralID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Kua]    Script Date:   ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Kua](
	[KuaID] [int] IDENTITY(1,1) NOT NULL,
	[KuaName] [nvarchar] (25) NOT NULL,
	[Description] [nvarchar] (500) NOT NULL,
	--[Status] [bit] NOT NULL,
 CONSTRAINT [PK_Kua] PRIMARY KEY CLUSTERED 
(
	[KuaID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Auspicious]    Script Date:   ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Auspicious](
	[AuspiciousID] [int] IDENTITY(1,1) NOT NULL,
	[DirectionID] [int] NOT NULL,
	[KuaID] [int] NOT NULL,
	[Description] [nvarchar] (300) NOT NULL,
	--[Status] [bit] NOT NULL,
 CONSTRAINT [PK_Auspicious] PRIMARY KEY CLUSTERED 
(
	[AuspiciousID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Inauspicious]    Script Date:   ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Inauspicious](
	[InauspiciousID] [int] IDENTITY(1,1) NOT NULL,
	[DirectionID] [int] NOT NULL,
	[KuaID] [int] NOT NULL,
	[Description] [nvarchar] (300) NOT NULL,
	--[Status] [bit] NOT NULL,
 CONSTRAINT [PK_Inauspicious] PRIMARY KEY CLUSTERED 
(
	[InauspiciousID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Direction]    Script Date:   ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Direction](
	[DirectionID] [int] IDENTITY(1,1) NOT NULL,
	[GroupID] [int] NOT NULL,
	[DirectionName] [nvarchar] (25) NOT NULL,
	--[Status] [bit] NOT NULL,
 CONSTRAINT [PK_Direction] PRIMARY KEY CLUSTERED 
(
	[DirectionID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[DirectionGroup]    Script Date:   ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DirectionGroup](
	[GroupID] [int] IDENTITY(1,1) NOT NULL,
	[GroupName] [nvarchar] (25) NOT NULL,
	[Description] [nvarchar] (300) NOT NULL,
	--[Status] [bit] NOT NULL,
 CONSTRAINT [PK_DirectionGroup] PRIMARY KEY CLUSTERED 
(
	[GroupID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Pond]    Script Date:   ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Pond](
	[PondID] [int] IDENTITY(1,1) NOT NULL,
	[ElementID] [int] NOT NULL,
	[ShapeID] [int] NOT NULL,
	--[Status] [bit] NOT NULL,
 CONSTRAINT [PK_Pond] PRIMARY KEY CLUSTERED 
(
	[PondID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Shape]    Script Date:   ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Shape](
	[ShapeID] [int] IDENTITY(1,1) NOT NULL,
	[Shape] [nvarchar] (25) NOT NULL,
	--[Status] [bit] NOT NULL,
 CONSTRAINT [PK_Shape] PRIMARY KEY CLUSTERED 
(
	[ShapeID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ElementColor]    Script Date:   ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ElementColor](
	[ElementColorID] [int] IDENTITY(1,1) NOT NULL,
	[ElementID] [int] NOT NULL,
	[ColorID] [int] NOT NULL,
	[Values] [float] NOT NULL,
	--[Status] [bit] NOT NULL,
 CONSTRAINT [PK_ElementColor] PRIMARY KEY CLUSTERED 
(
	[ElementColorID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Color]    Script Date:   ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Color](
	[ColorID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar] (25) NOT NULL,
	--[Status] [bit] NOT NULL,
 CONSTRAINT [PK_Color] PRIMARY KEY CLUSTERED 
(
	[ColorID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PatternColor]    Script Date:   ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PatternColor](
	[PColorID] [int] IDENTITY(1,1) NOT NULL,
	[PatternID] [int] NOT NULL,
	[ColorID] [int] NOT NULL,
	[Values] [float] NOT NULL,
	--[Status] [bit] NOT NULL,
 CONSTRAINT [PK_PatternColor] PRIMARY KEY CLUSTERED 
(
	[PColorID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Pattern]    Script Date:   ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Pattern](
	[PatternID] [int] IDENTITY(1,1) NOT NULL,
	[VarietyID] [int] NOT NULL,
	[PatternName] [nvarchar] (25) NOT NULL,
	[ImageURL] [nvarchar] (250) NULL,
	--[Status] [bit] NOT NULL,
 CONSTRAINT [PK_Pattern] PRIMARY KEY CLUSTERED 
(
	[PatternID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Variety]    Script Date:   ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Variety](
	[VarietyID] [int] IDENTITY(1,1) NOT NULL,
	[VarietyName] [nvarchar] (50) NOT NULL,
	[ImageURL] [nvarchar] (250) NULL,
	[Description] [nvarchar] (1500) NULL,
	--[Status] [bit] NOT NULL,
 CONSTRAINT [PK_Variety] PRIMARY KEY CLUSTERED 
(
	[VarietyID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ElementQuantity]    Script Date:   ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ElementQuantity](
	[RecID] [int] IDENTITY(1,1) NOT NULL,
	[ElementID] [int] NOT NULL,
	[Quantity] [int] NOT NULL,
	[Bonus] [float] NOT NULL,
	--[Status] [bit] NOT NULL,
 CONSTRAINT [PK_ElementQuantity] PRIMARY KEY CLUSTERED 
(
	[RecID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[QuantityBuff]    Script Date:   ******/
/*
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
Drop TABLE [dbo].[QuantityBuff](
	[BuffID] [int] IDENTITY(1,1) NOT NULL,
	[Description] [nvarchar] (250) NULL,
 CONSTRAINT [PK_QuantityBuff] PRIMARY KEY CLUSTERED 
(
	[BuffID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
*/
/****** ========================================================================================================================================================================================================================================================================================================================================================================  ******/
/****** Insert  ******/
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

SET IDENTITY_INSERT [dbo].[Element] ON 

INSERT [dbo].[Element] ([ElementID], [Element], [Description], [Status]) VALUES (1, N'Kim', N'Hành Kim tượng trưng cho sức mạnh, tính cách kiên định và nghiêm túc.', 1)
INSERT [dbo].[Element] ([ElementID], [Element], [Description], [Status]) VALUES (2, N'Thủy', N'Hành Thủy tượng trưng cho nước, có tính tàng chứa.', 1)
INSERT [dbo].[Element] ([ElementID], [Element], [Description], [Status]) VALUES (3, N'Hỏa', N'Hành Hỏa tượng trưng cho sự may mắn, hạnh phúc, danh vọng và thành công.', 1)
INSERT [dbo].[Element] ([ElementID], [Element], [Description], [Status]) VALUES (4, N'Thổ', N'Hành Thổ tượng trưng cho sự nuôi dưỡng, màu mỡ và được coi là trung tâm của sự cân bằng, ổn định.', 1)
INSERT [dbo].[Element] ([ElementID], [Element], [Description], [Status]) VALUES (5, N'Mộc', N'Hành Mộc tượng trưng cho cây, có tính động, khởi đầu.', 1)

SET IDENTITY_INSERT [dbo].[Element] OFF
GO

SET IDENTITY_INSERT [dbo].[Kua] ON 

INSERT [dbo].[Kua] ([KuaID], [KuaName], [Description]) VALUES (1, N'Khảm', N'Cung khảm là cung đứng thứ nhất trong sơ đồ bát quái. Dựa vào cung này chúng ta có thể biết được vận mệnh, tính cách của một người thuộc cung này. Cung khảm thuộc hành Thủy và mang nhiều ý nghĩa, ví dụ như mưa, mặt trăng, tuyết rơi, sương mù, rượu. Cung khảm trong dịch lý có nghĩa hay lý sự, mưu gian và hoạn nạn.')
INSERT [dbo].[Kua] ([KuaID], [KuaName], [Description]) VALUES (2, N'Khôn', N'Cung Khôn là một trong 8 cung của sơ đồ bát quái, hay còn gọi là bát trạch. Cũng tương như nhiều cung mệnh khác, cung này sẽ đại diện  cho tính cách, vận mệnh, phong thuỷ của một nhóm người nào đó. Cung Khôn thuộc về hành Thổ và mang các ý nghĩa như: mây u ám, khí mù, nhà kho, chợ búa. Trong Dịch Lý: Khôn là Địa tức đất, nhún nhường khiêm tốn, cưu mang.')
INSERT [dbo].[Kua] ([KuaID], [KuaName], [Description]) VALUES (3, N'Chấn', N'Cung chấn là cung đứng vị trí thứ 3 trong sơ đồ Cung Mệnh. Cung chấn hay còn được gọi là Cung Phi Bát Trạch. Trong Dịch Lý, Chấn tức là Lôi, có nghĩa dũng mãnh, hiên ngang, khí phách, thành đạt. Cung này sẽ thuộc hành Mộc, có ý nghĩa tượng trưng cho cây cối, thảo mộc, sấm sét. ')
INSERT [dbo].[Kua] ([KuaID], [KuaName], [Description]) VALUES (4, N'Tốn', N'Cung Tốn là cung mang ý nghĩa gió, cái quạt, thuận chiều và tươi tốt. Còn trong Dịch lý là thì “Tốn” là Phong, có nghĩa là chịu phục tùng, tươi tốt. ')
INSERT [dbo].[Kua] ([KuaID], [KuaName], [Description]) VALUES (6, N'Càn', N'Cung Càn được xem là tượng trưng cho băng tuyết, nước đá và vàng. Theo Dịch lý, “càn” có nghĩa là “thiên” chỉ cốt cứng rắn, ý sáng suốt và tâm đức rạng ngời.')
INSERT [dbo].[Kua] ([KuaID], [KuaName], [Description]) VALUES (7, N'Đoài', N'Cung Đoài là một cung hoàng đạo thuộc hành Kim, mang đến nhiều ý nghĩa như ao dầm, mưa dầm, trăng non, nhạc khí, tinh tú hay giấy bút. Đây là cung mệnh thuộc hành Âm Kim, thể hiện sự vui mừng, sự dưỡng dục đối với các loài vật.')
INSERT [dbo].[Kua] ([KuaID], [KuaName], [Description]) VALUES (8, N'Cấn', N'Cung này mang ý nghĩa mây mù, khí bốc lên từ núi, đá. Theo như Dịch Lý thì “Cấn” tức là Sơn hay cũng chính là núi đá, trì trệ nhưng yên tĩnh và tâm đức.')
INSERT [dbo].[Kua] ([KuaID], [KuaName], [Description]) VALUES (9, N'Ly', N'Cung Ly mang ý nghĩa là mặt trời, lửa, tia chớp, cây khô, cái bóng và ấn tín. Còn theo như Dịch lý thì “Ly” tức là Hỏa, thể hiện sự trí tuệ, sáng suốt, văn minh và hào nhoáng.')


SET IDENTITY_INSERT [dbo].[Kua] OFF
GO

SET IDENTITY_INSERT [dbo].[Direction] ON 

INSERT [dbo].[Direction] ([DirectionID], [DirectionName]) VALUES (1, N'Đông')
INSERT [dbo].[Direction] ([DirectionID], [DirectionName]) VALUES (2, N'Tây')
INSERT [dbo].[Direction] ([DirectionID], [DirectionName]) VALUES (3, N'Nam')
INSERT [dbo].[Direction] ([DirectionID], [DirectionName]) VALUES (4, N'Bắc')
INSERT [dbo].[Direction] ([DirectionID], [DirectionName]) VALUES (5, N'Đông Bắc')
INSERT [dbo].[Direction] ([DirectionID], [DirectionName]) VALUES (6, N'Đông Nam')
INSERT [dbo].[Direction] ([DirectionID], [DirectionName]) VALUES (7, N'Tây Bắc')
INSERT [dbo].[Direction] ([DirectionID], [DirectionName]) VALUES (8, N'Tây Nam')

SET IDENTITY_INSERT [dbo].[Direction] OFF
GO

SET IDENTITY_INSERT [dbo].[DirectionGroup] ON 

INSERT [dbo].[DirectionGroup] ([GroupID], [GroupName], [Description]) VALUES (1, N'Đông Tứ Trạch', N'Đông Tứ Trạch bao gồm các cung: Tốn – Chấn – Khảm – Ly, tương ứng với các hướng Đông Nam – Đông – Bắc – Nam.')
INSERT [dbo].[DirectionGroup] ([GroupID], [GroupName], [Description]) VALUES (2, N'Tây Tứ Trạch', N'Tây Tứ Trạch bao gồm các cung: Khôn – Càn – Cấn – Đoài, tương ứng với các hướng Tây Nam – Tây Bắc – Đông Bắc – Tây.')

SET IDENTITY_INSERT [dbo].[DirectionGroup] OFF
GO

SET IDENTITY_INSERT [dbo].[Pond] ON 

INSERT [dbo].[Pond] ([PondID], [ElementID], [ShapeID]) VALUES (1, 1, 1)
INSERT [dbo].[Pond] ([PondID], [ElementID], [ShapeID]) VALUES (2, 1, 2)
INSERT [dbo].[Pond] ([PondID], [ElementID], [ShapeID]) VALUES (3, 2, 2)
INSERT [dbo].[Pond] ([PondID], [ElementID], [ShapeID]) VALUES (4, 2, 1)
INSERT [dbo].[Pond] ([PondID], [ElementID], [ShapeID]) VALUES (5, 2, 5)
INSERT [dbo].[Pond] ([PondID], [ElementID], [ShapeID]) VALUES (6, 2, 6)
INSERT [dbo].[Pond] ([PondID], [ElementID], [ShapeID]) VALUES (7, 3, 5)
INSERT [dbo].[Pond] ([PondID], [ElementID], [ShapeID]) VALUES (8, 3, 7)
INSERT [dbo].[Pond] ([PondID], [ElementID], [ShapeID]) VALUES (9, 4, 2)
INSERT [dbo].[Pond] ([PondID], [ElementID], [ShapeID]) VALUES (10, 4, 5)
INSERT [dbo].[Pond] ([PondID], [ElementID], [ShapeID]) VALUES (11, 5, 3)
INSERT [dbo].[Pond] ([PondID], [ElementID], [ShapeID]) VALUES (12, 5, 4)
INSERT [dbo].[Pond] ([PondID], [ElementID], [ShapeID]) VALUES (13, 5, 5)
INSERT [dbo].[Pond] ([PondID], [ElementID], [ShapeID]) VALUES (14, 5, 6)

SET IDENTITY_INSERT [dbo].[Pond] OFF
GO

SET IDENTITY_INSERT [dbo].[Shape] ON 

INSERT [dbo].[Shape] ([ShapeID], [Shape]) VALUES (1, N'Hình lục giác')
INSERT [dbo].[Shape] ([ShapeID], [Shape]) VALUES (2, N'Hình tròn')
INSERT [dbo].[Shape] ([ShapeID], [Shape]) VALUES (3, N'Hình oval')
INSERT [dbo].[Shape] ([ShapeID], [Shape]) VALUES (4, N'Hình bán nguyệt')
INSERT [dbo].[Shape] ([ShapeID], [Shape]) VALUES (5, N'Hình vuông')
INSERT [dbo].[Shape] ([ShapeID], [Shape]) VALUES (6, N'Hình chữ nhật')
INSERT [dbo].[Shape] ([ShapeID], [Shape]) VALUES (7, N'Hình tam giác')

SET IDENTITY_INSERT [dbo].[Shape] OFF
GO


/****** ========================================================================================================================================================================================================================================================================================================================================================================  ******/
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

/*
ALTER TABLE [dbo].[Transaction]  WITH CHECK ADD  CONSTRAINT [FK_Transaction_Package] FOREIGN KEY([PackageID])
REFERENCES [dbo].[Package] ([PackageID])
GO
ALTER TABLE [dbo].[Transaction] CHECK CONSTRAINT [FK_Transaction_Package]
GO
*/


/****** Object:  Table [dbo].[Pond]    Script Date:   ******/

ALTER TABLE [dbo].[Pond]  WITH CHECK ADD  CONSTRAINT [FK_Pond_Element] FOREIGN KEY([ElementID])
REFERENCES [dbo].[Element] ([ElementID])
GO
ALTER TABLE [dbo].[Pond] CHECK CONSTRAINT [FK_Pond_Element]
GO

ALTER TABLE [dbo].[Pond]  WITH CHECK ADD  CONSTRAINT [FK_Pond_Shape] FOREIGN KEY([ShapeID])
REFERENCES [dbo].[Shape] ([ShapeID])
GO
ALTER TABLE [dbo].[Pond] CHECK CONSTRAINT [FK_Pond_Shape]
GO

/****** Object:  Table [dbo].[ElementQuantity]    Script Date:   ******/

ALTER TABLE [dbo].[ElementQuantity]  WITH CHECK ADD  CONSTRAINT [FK_ElementQuantity_Element] FOREIGN KEY([ElementID])
REFERENCES [dbo].[Element] ([ElementID])
GO
ALTER TABLE [dbo].[ElementQuantity] CHECK CONSTRAINT [FK_ElementQuantity_Element]
GO

/****** Object:  Table [dbo].[Direction]    Script Date:   ******/

ALTER TABLE [dbo].[Direction]  WITH CHECK ADD  CONSTRAINT [FK_Direction_DirectionGroup] FOREIGN KEY([GroupID])
REFERENCES [dbo].[DirectionGroup] ([GroupID])
GO
ALTER TABLE [dbo].[Direction] CHECK CONSTRAINT [FK_Direction_DirectionGroup]
GO

/****** Object:  Table [dbo].[General]    Script Date:   ******/

ALTER TABLE [dbo].[General]  WITH CHECK ADD  CONSTRAINT [FK_General_Kua] FOREIGN KEY([KuaID])
REFERENCES [dbo].[Kua] ([KuaID])
GO
ALTER TABLE [dbo].[General] CHECK CONSTRAINT [FK_General_Kua]
GO

ALTER TABLE [dbo].[General]  WITH CHECK ADD  CONSTRAINT [FK_General_Element] FOREIGN KEY([ElementID])
REFERENCES [dbo].[Element] ([ElementID])
GO
ALTER TABLE [dbo].[General] CHECK CONSTRAINT [FK_General_Element]
GO

/****** Object:  Table [dbo].[Auspicious]    Script Date:   ******/

ALTER TABLE [dbo].[Auspicious]  WITH CHECK ADD  CONSTRAINT [FK_Auspicious_Kua] FOREIGN KEY([KuaID])
REFERENCES [dbo].[Kua] ([KuaID])
GO
ALTER TABLE [dbo].[Auspicious] CHECK CONSTRAINT [FK_Auspicious_Kua]
GO

ALTER TABLE [dbo].[Auspicious]  WITH CHECK ADD  CONSTRAINT [FK_Auspicious_Direction] FOREIGN KEY([DirectionID])
REFERENCES [dbo].[Direction] ([DirectionID])
GO
ALTER TABLE [dbo].[Auspicious] CHECK CONSTRAINT [FK_Auspicious_Direction]
GO

/****** Object:  Table [dbo].[Inauspicious]    Script Date:   ******/

ALTER TABLE [dbo].[Inauspicious]  WITH CHECK ADD  CONSTRAINT [FK_Inauspicious_Kua] FOREIGN KEY([KuaID])
REFERENCES [dbo].[Kua] ([KuaID])
GO
ALTER TABLE [dbo].[Inauspicious] CHECK CONSTRAINT [FK_Inauspicious_Kua]
GO

ALTER TABLE [dbo].[Inauspicious]  WITH CHECK ADD  CONSTRAINT [FK_Inauspicious_Direction] FOREIGN KEY([DirectionID])
REFERENCES [dbo].[Direction] ([DirectionID])
GO
ALTER TABLE [dbo].[Inauspicious] CHECK CONSTRAINT [FK_Inauspicious_Direction]
GO

/****** Object:  Table [dbo].[Pattern]    Script Date:   ******/

ALTER TABLE [dbo].[Pattern]  WITH CHECK ADD  CONSTRAINT [FK_Pattern_Variety] FOREIGN KEY([VarietyID])
REFERENCES [dbo].[Variety] ([VarietyID])
GO
ALTER TABLE [dbo].[Pattern] CHECK CONSTRAINT [FK_Pattern_Variety]
GO

/****** Object:  Table [dbo].[PatternColor]    Script Date:   ******/

ALTER TABLE [dbo].[PatternColor]  WITH CHECK ADD  CONSTRAINT [FK_PatternColor_Pattern] FOREIGN KEY([PatternID])
REFERENCES [dbo].[Pattern] ([PatternID])
GO
ALTER TABLE [dbo].[PatternColor] CHECK CONSTRAINT [FK_PatternColor_Pattern]
GO

ALTER TABLE [dbo].[PatternColor]  WITH CHECK ADD  CONSTRAINT [FK_PatternColor_Color] FOREIGN KEY([ColorID])
REFERENCES [dbo].[Color] ([ColorID])
GO
ALTER TABLE [dbo].[PatternColor] CHECK CONSTRAINT [FK_PatternColor_Color]
GO

/****** Object:  Table [dbo].[ElementColor]    Script Date:   ******/

ALTER TABLE [dbo].[ElementColor]  WITH CHECK ADD  CONSTRAINT [FK_ElementColor_Color] FOREIGN KEY([ColorID])
REFERENCES [dbo].[Color] ([ColorID])
GO
ALTER TABLE [dbo].[ElementColor] CHECK CONSTRAINT [FK_ElementColor_Color]
GO

ALTER TABLE [dbo].[ElementColor]  WITH CHECK ADD  CONSTRAINT [FK_ElementColor_Element] FOREIGN KEY([ElementID])
REFERENCES [dbo].[Element] ([ElementID])
GO
ALTER TABLE [dbo].[ElementColor] CHECK CONSTRAINT [FK_ElementColor_Element]
GO


/**** 


Remember to fix Transaction -> Advertisement Only


****/

select * from [dbo].[User]
select * from [dbo].[Package]
select * from [dbo].[Advertisement]
select * from [dbo].[Transaction]