# Be The Change

Be the change aims to be a directory of websites whose products help us reduce our impact on the environment.
In this directory, you will find web pages that sell different products, Clothing, Cosmetics, Shoes, Food, etc ... but that have a common concern for the environmental and social impact of their products.

#### User Stories

- **404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault.
- **500** - As a user I want to see a nice error page so that I know that is not my fault.
- **homepage** - As a user I want to be able to access the homepage and start searching for the best webs that are aiming to help me save the World!...I also want to log in and sign up...:D
- **sign up** - As a business owner I want to sign up on the web page so that I can have access to the business profile page.
- **login** - As a business owner I want to be able to log in on the web page so that I can get back to my account.
- **logout** - As a business owner I want to be able to log out from the web page so that I can make sure no one will access my account.
- **create profile** - As business owner I want to create and register my business filling business informations.
- **edit user/business profile** - As a business owner I want to be able to edit my business profile including username and password.
- **delete business** - As a business owner I want to be able to delete my business profile.
- **profile** - As business owner I want to check my business profile page and check my personal information.

## Getting started 🚀

### Setup 📋

- Fork this repo
- Clone this repo

```
$ cd bethechange_Server
$ npm install
$ npm run start
```

### Models

- User Model

```javascript
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  }
```

- Business Model

```javascript
name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  certifications: {
    type: [String],
    required: true,
    default: undefined,
  },
  shipping: {
    type: [String],
    required: true,
    default: undefined,
  },
  categories: {
    type: [String],
    required: true,
    default: undefined,
    enum: [
      'Cosmetics',
      'Bags',
      'Accessories',
      'Clothes',
      'Basics',
      'Shoes',
      'Food'
    ]
  },
  tags: {
    type: [String],
    required: true,
    default: undefined,
    enum: [
      'eco',
      'vegan',
      'vegetarian',
      'ethic',
      'bio',
      'circular economy'
    ]
  }
```

### Endpoints (backend routes)

| Method | Route                                | Description                                                  |
| ------ | ------------------------------------ | :----------------------------------------------------------- |
| POST   | `/auth/signup`                       | Sends Sign Up info to the server and then create user in the DB with encrypted password. |
| POST   | `/auth/login`                        | Sends Login form data to the server.                         |
| POST   | `/auth/logout`                       | Logs out the user. Renders de Home index view.               |
| GET    | `/api/business/categories/:category` | Returns business list for the selected category              |
| GET    | `/user/profile/:businessid`          | Private route. Returns specific business by id               |
| GET    | `/user/profile/:userId`              | Private route.Get the business profile of the current user (via JWT) |
| PUT    | `/user/profile/:userId`              | Private route. Updates email and password info from the current user in the DB. |
| DELETE | `/user/profile`                      | Private route. Deletes the profile from the server and updates DB. |
| POST   | `user/profile/newBusiness`           | Private route. Sends Business info to the server and creates business in the DB. |
| PUT    | `user/profile/:businessId`           | Private route. Updates one specific business from the current user in the DB. |
| DELETE | `user/profile/:businessId`           | Private route. Deletes one specific business from the server and updates DB. |

## Running the tests ⚙️

\*\*

### Break down into end to end tests 🔩

```

```

## Built With 🛠️

- Javascript
- Node.js
- Express.js
- MongoDB

## Backlog

-

## Author ✒️

- **Alberto Pagoria** - [alpagor](https://github.com/alpagor)
