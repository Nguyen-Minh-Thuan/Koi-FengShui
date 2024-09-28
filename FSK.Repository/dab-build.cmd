@echo off
@echo This cmd file creates a Data API Builder configuration based on the chosen database objects.
@echo To run the cmd, create an .env file with the following contents:
@echo dab-connection-string=your connection string
@echo ** Make sure to exclude the .env file from source control **
@echo **
dotnet tool install -g Microsoft.DataApiBuilder
dab init -c dab-config.json --database-type mssql --connection-string "@env('dab-connection-string')" --host-mode Development
@echo Adding tables
dab add "Advertisement" --source "[dbo].[Advertisement]" --fields.include "AdsId,UserId,PackageID,Title,Content,Status,ElementID,ExpiredDate,ImageUrl,PaymentStatus" --permissions "anonymous:*" 
dab add "Package" --source "[dbo].[Package]" --fields.include "PackageID,PackageName,Price" --permissions "anonymous:*" 
dab add "Transaction" --source "[dbo].[Transaction]" --fields.include "TransactionID,UserId,AdsId,PackageID,FromDate,ToDate,PaymentMethod,TransactionDate,TotalPrice" --permissions "anonymous:*" 
dab add "User" --source "[dbo].[User]" --fields.include "UserId,UserName,Password,Email,Bio,ImageUrl,IsActive,Role" --permissions "anonymous:*" 
@echo Adding views and tables without primary key
@echo Adding relationships
dab update Advertisement --relationship Package --target.entity Package --cardinality one
dab update Package --relationship Advertisement --target.entity Advertisement --cardinality many
dab update Advertisement --relationship User --target.entity User --cardinality one
dab update User --relationship Advertisement --target.entity Advertisement --cardinality many
dab update Transaction --relationship Advertisement --target.entity Advertisement --cardinality one
dab update Advertisement --relationship Transaction --target.entity Transaction --cardinality many
dab update Transaction --relationship Package --target.entity Package --cardinality one
dab update Package --relationship Transaction --target.entity Transaction --cardinality many
dab update Transaction --relationship User --target.entity User --cardinality one
dab update User --relationship Transaction --target.entity Transaction --cardinality many
@echo Adding stored procedures
@echo **
@echo ** run 'dab validate' to validate your configuration **
@echo ** run 'dab start' to start the development API host **
