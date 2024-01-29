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