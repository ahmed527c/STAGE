USE [SecurityShopDb]
GO

/****** Object: Table [dbo].[Produits] Script Date: 7/26/2025 4:19:35 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Produits] (
    [Id]          INT            IDENTITY (1, 1) NOT NULL,
    [Titre]       NVARCHAR (MAX) NOT NULL,
    [Type]        NVARCHAR (MAX) NOT NULL,
    [PrixAvant]   FLOAT (53)     NOT NULL,
    [PrixApres]   FLOAT (53)     NOT NULL,
    [Quantite]    INT            NOT NULL,
    [Description] NVARCHAR (MAX) NOT NULL,
    [Image]       NVARCHAR (MAX) NOT NULL
);

SELECT * FROM Produits;

