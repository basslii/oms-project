# oms-project
An improvised and personal version of an office management system.

Be aware that this project is still an ongoing project until I have completed all the requirements based on the clients. stay tuned for more updates in the future.
Basically this is a "for fun" project that could also benefit companies and organizations to help managing their companies.

This Website Applciation is created by using these technologies: 
  1. server side: nestjs
  2. client side: nextJs
  3. Database: postgresql
  4. container: Docker
  
To run this application, first you have to run create a docker-compose.yml and include all the necessary data. There is a docker-compose-example file for reference.
And after you are done with the docker-compose.yml (assuiming the yml file is in the same directory as docker-compose-emaple file), run this in your terminal :
                    
    docker-compose -f server/docker-compose.yml up
  
To run the nestjs server side, run this command line

    npm run start:dev
    
To run the nextJs client side, run this command line

    npm run dev
