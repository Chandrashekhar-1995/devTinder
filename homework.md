# Episode 3 homework

- Create a repository
- Initialize the repository
- Install express
- Create a server
- Listen to port 7777
- write request handlers for /test, /hello
- Install nodemon and update script inside package.json
- What are dependencies
- What is the use of "-g" while npm install
- Difference between caret and tilde (^ vs ~)
  -----All Homework done-----

# Episode 4 homework

- Install Postman and make a test api call
- Write logic to handle GET, POST, PATCH, DELETE API calls and test on postman
- Explore riuting and use of ?, +, (), \* in the routes
- Use of ragex in routes /a/, /.\*fly$/
- Reading the query params in the routes
- Reading the dynamic routes routes
  -----Done----

# Episode 5 homework

- Multipal routes handlers - play with code
- next()
- next function and errors along with the code res.send()
- app.use("/user", rH1, rH2, rH3, rH4, rH5);
- what is middleware
- how express JS besically handles requests behind the scenes
- Diffrece between app.use() and app.all()
- Write a dummy auth middleware for admin
- Write a dummy auth middleware for users except /user/login
- Error handling using app.use("/", (err, req, res, next)=>{})
  -------done------

# Episode 6 homework

- Creat a free cluster
- install mongoose libreary
- Connect your application to the database/devtinder
- Call tha connectBD function and connect to database before starting application on 7777
- Create a User schema and user model
- Create a POST /signup API to add data to database
- Push some document using API calls from postman
  --------dane-------

# Episode 7 homework

- What is diffrence between json object and javascript object
- Add the express.json middleware to your app
- Make your signup Api dynamic to recive data from the end user
- Users.findOne with duplicate emai ids, whitch object returned
- API - get user by email
- API - Feed Api - GET/feed - get all users from database
- Create a API to get user by id
- Create a delete API
- Diffrence between PATCH and PUT
- Create a update API (PATCH)
- Explore mongoose docs specilly Model methods
- What are options in a model.findOneAndUpdate method explore more about it
- API - Update the user with email ID
  ----- done-----

# Episode 8 homework

- Explorer all schematypes from the documentation
- Add required, unique, lowercase, min, minLength, trim,
- add default value
- Create a custom validate function for gender
- Improve the DB schema - PUT all appropiate validations on each field in schema
- Add timestamp to the userSchema
- Add API Level validation on Patch request & Signup post api
- DATA Sanitization - Add API validations for each field
- Explorer the validator functions libreary
- Use validator function for password, email and photo URl
- Never trust req.body

# Episode 9 homework

- Val;idate data in signup API
- Install bcrypt package
- Create PasswordHash using bcrypt.hash & save the user is encrupted password

# Episode 9 homework

- Install cookie-parser
- just send a dummy cookie to user
- create GET / profile API and check if you get the cookie back
- Install jsonwebtoken
- in login API, create a JWT token, sent it to user in cookie
- read the cookies inside your profile API and find the logged in user details
- userAuth middleware
- Add the userAuth middleware in profile API and a new sendConnectionRequest API
- Set the expiry of JWT token and cookies in 7 day
