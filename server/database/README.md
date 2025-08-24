# Seting up the Database (Dev)
*** 
> [!IMPORTANT]
> Before setting up the Database, it's important that you have installed docker, as you will use the tool of docker compose to initialize the containers that are used and also to update or remove them in case for any update on the database architecture.


> [!IMPORTANT]
> Before executing any of the forward commands, be sure to be in the database folder of the project. Making sure this is the right path on your terminal:
>
> **<p style="text-align : center; font-size:2em">/modular_project/server/database</p>**
>
> Once in the correct path, you may continue.
>

## Running the Database (DB)

* ### Running it for the First Time
When running the DB from the first time, you'll need to execute the following command using docker:
```
    docker compose up -d
```
Initializing the MariaDB database and also the PHPMyAdmin services.

* ### Stopping the DB without losing data
When you are done of using the DB, you can stop the containers by using:
```
    docker compose stop
```
Stopping the use of the DB and conserving all the new data registered on it. If you want to turn on the container again, make sure to use:
```
    docker compose start
```
Instead of using the command we used when running the containers for the first time.

* ### Updating or Removing the Database with all its data
If the initial architecture of the DB has received an update by future commits, it will be neccesary to update the whole DB. To do this, you'll have to remove the current containers by using:
```
    docker compose down -v
```
Removing all the containers refering to the database and the data saved in them (the *-v* on the command stands for *volumes* in docker, where this are the spaces where data is stored for the respective services and containers used)