# Car Factory
## Overview
CarFactory is a back-end application that supports a database that stores the cars produced by the factory. When producing a car, the factory needs to keep a record of the production, and for each car produced, the following information is stored: unique ID, brand, model, registration number and price.

## How to start the application

### 1. Open the repository in stackblitz.com
Clone & Fork the repository in your GitHub.
### 2. In the terminal of StackBlitz write the command:
- npm install && npm start  
- Now the application should be running.  
- The project should be able to be open via http://localhost:3000

## Functionalities and How They Are Used
  
1. **Functionalities**
  
**1.1** The car manufacturer can add new cars to the database via a **POST** request, with the fields model, brand, license plate number and price being mandatory. The model and brand must contain at least 2 characters for the request to be successful. The license plate number must comply with the Bulgarian license plate format.  
**1.2** The car manufacturer can, with a **GET** request containing the brand, retrieve from the database all the characteristics of cars of the desired brand.  
**1.3** The car manufacturer can use a **PUT** request that accepts the unique ID of the car to update any parameter of the given car in Json format.  
**1.4** With a **DELETE** request, the car manufacturer can remove a car from the database using its unique ID.
  
**2. How they are used**
  
**2.1. Open additional terminal in Stackblitz**  
**2.2. Add new car in the database**  
Example:  
```
curl -X POST http://localhost:3000/api/cars \  
-H "Content-Type: application/json" \  
-d '{"model":"A6","brand":"Audi","registrationNumber":"SV12357PA","price":25000}'
```  
When the given curl command is executed in the additional terminal, the back-end application will add the car, Audi A6 with registration number SV12357PA and price 25000, in the database  
  
**2.3. Update a car by unique ID**  
Example:  
```
curl -X PUT http://localhost:3000/api/cars/1 \
-H "Content-Type: application/json" \
-d '{"model":"RS6"}'
```
When the given curl command is executed, the back-end application will edit the model to RS6 of the car with unique ID = 2 in the database  

  **2.4 Display all available cars by a given brand from the database in JSON format**  
Example:  
```
curl -X GET "http://localhost:3000/api/cars/brand?brand=Audi"
```
When the given curl command is executed, the back-end application will return as a result in json format all manufactured cars with their characteristics from the desired brand.  

  **2.5 Remove car from the database**  
Example:  
```
curl usage: curl -X DELETE "http://localhost:3000/api/cars?id=1"
```
When the given curl command is executed, the back-end application will delete the requested car with the unique ID from the database.  
