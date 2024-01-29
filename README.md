##
Some explanations of the tasks

Q4:
The Azure Storage emulator is currently deprecated, so I had to use Azurite as emulator.
Some screenshots of the data upload.

Postman

<img width="651" alt="postman-screenshot" src="https://github.com/DonMed00/BG-ASSESSMENT/assets/37997117/edc7704e-b1ea-4502-a534-f1db20b07fdb">

MongoDB
<img width="1065" alt="mongo-screenshot" src="https://github.com/DonMed00/BG-ASSESSMENT/assets/37997117/c7feccdc-9c30-4e3c-83e8-32d28ee6677c">

Azure Storage Explorer
<img width="1881" alt="azurite-screenshot" src="https://github.com/DonMed00/BG-ASSESSMENT/assets/37997117/537bc366-1d55-49c3-a222-941b01888392">


Q5:
Currently, before inserting a new record into the database, a query is performed to check if a record with the same fields already exists. Another option could be to have a trigger inside the table to always check before inserting.
When the service is launched, it displays a menu with 3 options:

1- Start File Monitoring -> Starts monitoring a specific directory, checks all .lpr files and inserts them into the database if it is not already. If a new .lpr file is inserted into the directory, it is also inserted into the database.
<img width="813" alt="database-screen" src="https://github.com/DonMed00/BG-ASSESSMENT/assets/37997117/01a2de65-11ee-42a4-9c01-14fc7daacfa7">

2- Perform Data Queries -> Shows a menu that asks the user for 3 parameters (2 dates and the name of the camera). Then a query is launched and all records that meet the query are displayed.
<img width="1254" alt="queries" src="https://github.com/DonMed00/BG-ASSESSMENT/assets/37997117/3068be95-521c-4372-9609-f5b717a378fa">

3- Exit

Comments:

In a production case, all keys and connections should be in a secure file. Also, if the app were larger, the folder structure should be more organized

In Q5: I don't know if the service was required to check the directory without an observer, but I found it more efficient this way.
