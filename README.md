# Arduino Controller

A desktop application that allows you to create a dashboard to control your connected Arduino microcontroller.

Built using Angular and Electron, this works along with the web application to allow you to control your Arduino remotely through a code-less interface.

## Project Structure

Angular application wrapped in electron, built using Angular Material.

### Angular Services

* User-Service

  Responsible for operations on the User object, operates using the user-service graphQL API. API: user-service.speedyiot.tech

* Dashboard-service

  Responsible for operations relating to the state of the dashboard's, uses the dashboard graphQL API: https://dashboard-service.speedyiot.tech/
  
* Board-Broker-Service

  Responsible for calling serial communications to the attached micro-controllers, this is achived via IPC (Inter process communication) calls to the main.js Electron process that then compleates the serial operations with the users connected micro-controller

* Electron-Control-Service
  
  Responsible for exposing Electron operations, this currently just provides the close app functionality


Each of the API's are ran as serverless Node microservices on AWS using DynamoDB as the backing store. These services are each stored in separate repositories.

> This is very much still a work in progress...
