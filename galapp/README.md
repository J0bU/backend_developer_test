## NodeJS Backend Test

#### Requeriments
- Nodejs v18
- Express.js

#### Instructions 
This repository was created to complete the backend nodejs developer test. Here you are going to find the required services. This project was created using Nodejs v18 and Express. There is not more dependencies. 

#### Galapp
- Go to ```galapp``` folder.
- Run ```npm i```
- Run ```npm run start```

#### Database
- Go to ```database``` folder.
- Run ```npm i```
- Run ```node index.js```


## Endpoints
In order to make you easier the way to get the endpoints, here there is a list with each one: 

- *Service number 1* - **(Get)**
    - For this service, the endpoint ```/users/:userId``` was created according to the document, remember that  this project runs on port ```3005```. So, if you want to run this project locally, this is going to be your url: ```http://localhost:3005/users/:userId```

    - *Service response*:  The answer of this service is going to be like this: *This request was made for the user1*
    ```json
    {
        "status": 200,
        "accounts": [
            "account1",
            "account2"
        ],
        "forms": [
            {
                "accountName": "Café",
                "role1": [
                    "form1",
                    "form2"
                ],
                "role2": [
                    "form1",
                    "form2"
                ]
            },
            {
                "accountName": "Cacao",
                "role1": [
                    "form1",
                    "form3"
                ],
                "role3": [
                    "form1",
                    "form3"
                ]
            }
        ]
    }
    ```
- *Service number 2* - **(Post)**
    - For this service, the endpoint ```/accounts/:accountId/harvest```
    - Here there are two important values ```accountId``` which is pass into the route path and ```userId``` which is pass through ```Authorization``` header.
    - ### Important
    - For this service, the date was set using the format ``mm-dd-aa``
    - In this service, a model was created
    ### Harvest Model
    ```json
    - date (Date): date property is going to storage the date.
    - employee (String): employee who created the record
    - quantity (Number): Quantity (KG).
    ```
     - *Service response* - *This request was made using the **user2** and the **account1***.
    ```json 
    {
        "status": 201,
        "message": "Record added",
        "record": {
            "user_id": "user2",
            "account_id": "account1",
            "date": "10-10-2024",
            "quantity": 510,
            "employee": "1312"
        }
    }
    ```

- *Service number 3* - **(Get, Post, Update, Delete)**
    - In this service a refactor was made. Here the main purpose was use the SOLID principles. You can notice the difference between ```harvest.controllers.js``` and ```fermentation.controllers.js```. 

    #### Endpoints
    - **Get** ```/accounts/:accountId/fermentation```: This endpoint returns the list of records created and the summary.
        - *Service response*
        ```json 
        {
            "status": 200,
            "data": {
                "1721337326206": {
                    "user_id": "user1",
                    "account_id": "account2",
                    "startDate": "10-10-2024",
                    "initialQuantity": 400,
                    "endDate": "11-10-2024",
                    "finalQuantity": 300
                },
                "1721337352619": {
                    "user_id": "user1",
                    "account_id": "account2",
                    "startDate": "10-10-2024",
                    "initialQuantity": 400,
                    "endDate": "11-10-2024",
                    "finalQuantity": 300
                },
            },
            "summary": {
                "avg_days": 40,
                "avg_weight_loss": 0.25
            }
        } 
        ```
    - **Post** ```/accounts/:accountId/fermentation```: This endpoint creates a new record into *fermentation* entity.
    ### Fermentation Model
        - startDate (Date)
        - initialQuantity (Number): Total quantity before processing the product.
        - endDate (Date)
        - finalQuantity (Number): Quantity after processing the product.
    - **Payload** 

    ```json
    {
        "startDate": "10-10-2024",
        "initialQuantity": 400,
        "endDate": "11-10-2024",
        "finalQuantity": 300
    }
    ```
    This endpoint has different validations, for that a middleware was created. 
    - The properties are required.
    - The initial quantity should be greather than the final quantity.
    - The startDate should be less than the endDate. 
    - You have to pass the user using ```Authorization``` header.

    - *Service response* 
    ```json
    {
        "status": 201,
        "message": "Record added",
        "record": {
            "user_id": "user1",
            "account_id": "account2",
            "startDate": "10-10-2024",
            "initialQuantity": 400,
            "endDate": "11-10-2024",
            "finalQuantity": 300
        }
    }
    ```
    - **Put** and **Delete**: These services have the same route, the only difference is Put you have to send a payload and send the id. For delete method you have you send the id.

### Summary
This was an excellent test. I really enjoyed doing this, I learn about some process that Galapp does. 
There are different ways to improve the code, however, the code was made using different techniques. 