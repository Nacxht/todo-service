## To-Do Service (API)

This API is a simple API that I use to practice. I intend to build this API from the simplest version and then add new features over time (I hope so).

## Features

This API has the following features:

**1. Authentication**

This API has authentication, which includes registration and login. Here is the explanation:

- **Register** is for users who do not have an account yet. This feature accepts the following body structure:
  - username
  - password
  - confirmPassword
- **Login** is for users who have already registered or have an account. This feature accepts the following body structure:
  - username
  - password
- After the user successfully logs in, the user will be given a JWT (JsonWebToken). This API uses JWT as a system to check whether the user has logged in or not, and as a security for interaction.

**2. Todo**

"Todo" is the main thing of this API. Here is an explanation of its features:

- **Todo - List** is used to display all "todo lists" owned by the user. Of course, the todo lists displayed are only those created by the user.
- **Todo - Create** is used to create a new todo. This feature accepts the following body structure:
  - title
  - description
- **Todo - Delete** is used to delete a todo. This feature accepts the following body structure:
  - todoId
- **Todo - Update:** Coming Soon

**3. Coming Soon: Unit Testing**

To be honest, I'm lazy to create unit testing features, because I prefer to test it using an API Tester application (I use [Bruno](https://www.usebruno.com/)).

## Framework & Libraries Used

**1. Framework:**

- [Express.JS](https://expressjs.com/)

**2. Libraries:**

- [body-parser](https://github.com/expressjs/body-parser)
- [dotenv](https://github.com/motdotla/dotenv)
- [bcrypt](https://github.com/kelektiv/node.bcrypt.js)
- [joi](https://github.com/hapijs/joi)
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)
- [mongoose](https://github.com/Automattic/mongoose)
- [winston](https://github.com/winstonjs/winston)

## How to Install / Use This API

I'm still lazy to add this.

I hope this is helpful! Let me know if you have any other questions.
