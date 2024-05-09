# PayTM app

## Backend

1. Express - HTTP Server

2. Mongoose - ODM to connect to MongoDB

3. Zod - Input validation



## Frontend

1. React - Frontend framework

2. Tailwind - Styling framework

---

## Added cors, body parser, jsonwebtoken

1. Cors is needed since our backend and frontend will be hosted separately.

2. We need body parser to support json body in post requests, add the express body parser middleware.

3. Jsonwebtoken is needed to support authentication



## User Mongoose schemas

We have 3 routes for user authentication.

1. Allow user to signin.
2. Allow user to signup.
3. allow user to update.

## Bank related Schemas
It stores the balance and the userId(from the user table)




## Backend Routes

1. Signup
   * This route needs to get user information, do input validation using zod and store the information in the database provided
     * Inputs are correct (validated via zod)
     * Database doesn’t already contain another user
    
2. Signin
    Let’s an existing user sign in to get back a token.

3. User Routes
   Route to update user information.
   Whatever they send, we need to update it in the database for the user.
   Use the middleware we defined in the last section to authenticate the user

4. Route to filter users from the backend. filter via firstname or lastname.
   This is needed so users can search for their friends and send them money




### Middlewares
Now that we have a user account, we need to gate routes which authenticated users can hit.
For this, we need to introduce an auth middleware


* Create a middleware.js file that  exports an authMiddleware function
  * Checks the headers for an Authorization header (Bearer <token>)
  * Verifies that the token is valid
  * Puts the userId in the request object if the token checks out.
  * If not, return a 403 status back to the user
 
### Transactions in the database
A lot of times, you want multiple databases transactions to be atomic
Either all of them should update, or none should

### Continuing backend routes

1. Endpoint to get their balance.
2. Endpoint for user to transfer money to different account.
   * Session is used to make sure the atomacity is maintained during transfer.


## Try the below routes using postman


1. http://localhost:3000/api/v1/user/signin : Send a body with following details
* username as email.
* firstname
* lastname
* password
```
  Body
  {
    "username": "ashutosh@gmail.com",
    "password": "asd@123"
}
```

2. http://localhost:3000/api/v1/user/bulk?filter= : Route to search a user.
```
Send authorization : Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWNlNjM5ZTdlODg5YTYzYjlmYzBhMzAiLCJpYXQiOjE3MDgwMjQ3MzR9.j8iH86Irb1XQByxZB5WBxmXDaOr6qUR2X8STXlAiRL8
```
3. http://localhost:3000/api/v1/user/signin : Its a PUT request used to update the first and last name. send the body with the updated value, username wont be updated and also need to send a Auth in the headers.

4. http://localhost:3000/api/v1/user/signup : Its a post request to sign in to only those user who has a account, once signed in a auth key would be given in the output.

---

## Frontend

1. /signup - The signup page

2. /signin - The signin page

3. /dashboard - Balances and see other users on the platform.

4. /send - Send money to other users


1. Sign in page
![Screen Shot 2024-05-08 at 11 55 02 PM](https://github.com/Ashutoshdikshit07/paytm/assets/50577992/6336f92f-b544-464b-9788-244a2b94a3f2)

2. Signup page
![Screen Shot 2024-05-08 at 11 55 26 PM](https://github.com/Ashutoshdikshit07/paytm/assets/50577992/440809db-79aa-49aa-ac6e-2a142cef3d1d)


3. Error can be displayed in red. (this error has occured because the backend is not up yet
![Screen Shot 2024-05-08 at 11 56 09 PM](https://github.com/Ashutoshdikshit07/paytm/assets/50577992/ade1124b-078e-4625-bde2-90b97f9bad59)


4. Onced successfully logged in. 

![Screen Shot 2024-05-08 at 11 57 56 PM](https://github.com/Ashutoshdikshit07/paytm/assets/50577992/64db2fd5-575f-45e5-bfae-1f0adc9a0ee3)


5. Transfer.

![Screen Shot 2024-05-08 at 11 59 14 PM](https://github.com/Ashutoshdikshit07/paytm/assets/50577992/af85de45-ccfd-438f-adbf-03a169bcb9b0)

6. Sending wrong amount of money.
   
![Screen Shot 2024-05-09 at 12 00 18 AM](https://github.com/Ashutoshdikshit07/paytm/assets/50577992/7de9eb45-5197-4cb3-8fb7-122889276dd9)

7. Sending money more than your balance

![Screen Shot 2024-05-09 at 12 00 32 AM](https://github.com/Ashutoshdikshit07/paytm/assets/50577992/b91b5481-6eca-4a7d-84cd-63d285e7d39a)

8. Sending correct amount of money.

![Screen Shot 2024-05-09 at 12 01 21 AM](https://github.com/Ashutoshdikshit07/paytm/assets/50577992/e12619f7-8965-4d0c-b172-812d87e36a3e)



### Wiring up the backend calls
 
 Used axios to call to the backend servers
