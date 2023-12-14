# webanku
an intelligent e-banking system where loan processing will be based on universal transaction tracking, it can be used by nbfc's to manage their bank partners and users.
Additional Features in progress:
1. Centralized access to user documents.
2. Loan Approval Steging
this is built using mern stack,

commands to run:

client: cd client && npm i && npm run start

server: cd api-layer && npm i && node index.js

database: you can setup on premise or cloud db both but the db should be of mongoDB

queue service: docker-compose -f ./docker-compose.rabbitmq.yaml up -d

withdrawl-microservice: cd withdrawlservice && npm i && npm run start

