#Database generation/seeding
You'll need to create a csv file using "npm run csv"
I used MongoDB and PostGreSQL, if you have mongoDB installed use "npm run mongo" once you have created your CSV file.

If you decide to use PostGreSQL run the following code '\COPY <TableName> FROM <PathToCSV> WITH (FORMAT csv);'

**BE SURE TO CHANGE THE PATH, DATABASE, AND TABLE NAMES OR THESES SCRIPTS WILL NOT WORK!**

**THE CSV CREATION SCRIPT IS DEFAULT SET TO CREATE TEN MILLION RECORDS**