# Back-end for WRATH OF ANUBIS


## INSTRUCTIONS:
1. ## GIT CLONE REPO
    ### git clone <repo name>
2. ## INSTALL DEPENDENCIES
    ### npm install



## SCRIPT COMMANDS
1. ## SEED DATABASE WITH 50 USERS
    ### npm run seed
2. ## RUN IN DEV MODE WITH NODEMON
    ### npm run dev




## ROUTES
### Base Path
```httpg
/blueocean/api/v1/
```

```httpg
GET /users/
```
+ Response 200 (application/json)
```json
{
    "message": "Success",
      "users": [
        {
          "_id": "627943e704269d70e06d1556",
          "userName": "dwight",
          "email": "anjali6@hotmail.com",
          "score": 0,
          "friends": [
            "627943e704269d70e06d155a"
          ],
          "validated": false,
          "img": "https://www.example.com/image.jpg",
          "createdAt": "1652114407057",
          "__v": 0
        },]
}
```
```
POST /users/
```
| Parameter | Type     | Description               |
| --------- | -------- | ------------------------- |
|  UserName     | `string` | **Required**  JSON Body |
|  email    | `string` | **Required**  JSON Body |
|  password   | `string` | **Required**  JSON Body |

+ Response 200 (application/json)

```json
{
  "message": "Successfully signed up",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyODAxYmIxMDgxMmQyOTBiOGIzNjM3YyIsImlhdCI6MTY1MjU2Mjg2NSwiZXhwIjoxNjUyOTIyODY1fQ.lInnkawtDiYq3jRtIqLlM7WDBvfoLKErnuhOrfB9qus",
  "user": {
    "userName": "JohnDoe",
    "email": "johndoe@gmails.com",
    "score": 0,
    "friends": [],
    "validated": false,
    "img": "https://www.example.com/image.jpg",
    "_id": "62801bb10812d290b8b3637c",
    "createdAt": "12345",
  }
}
```
```
put /users/togglefriend/

```

| Parameter | Type     | Description               |
| --------- | -------- | ------------------------- |
|  Header    | Authorization | **Required**  token |
|  user._id    | `string` | **Required**  JSON Body |

+ Response 200 (application/json)

```json
{
  "message": "Successfully add",
  "friends": [
    {
      "_id": "62801bb10812d290b8b3637c",
      "userName": "johndoe",
      "email": "johndoed@gmails.com",
    "score": 0,
    "friends": [
    "62801bb10812d290bdffdec"
    ],
    "validated": false,
    "img": "https://www.example.com/image.jpg",
    "_id": "62801bb10812d290b8b3637c",
    "createdAt": "12345",
  }
  ]
}
```

```
PUT /users/login/
```



| Parameter | Type     | Description               |
| --------- | -------- | ------------------------- |
|  Header    | Authorization | **Required**  token |

+ Response 200 (application/json)

```json
{
  "message": "Successfully logged in",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNzk0M2U3MDQyNjlkNzBlMDZkMTU1NiIsImlhdCI6MTY1MjU2MzUzOSwiZXhwIjoxNjUyOTIzNTM5fQ.bpHWYmWce9_JOvcr0vediWhRncjVnmzI5oj46N4i-qg",
  "user": {
    "_id": "627943e704269d70e06d1556",
    "userName": "johndoe",
    "email": "johndoe@hotmail.com",
    "score": 0,
    "friends": [
      {
        "_id": "627943e704269d70e06d155a",
        "userName": "brant",
        "email": "pansy_kuphal82@hotmail.com",
        "score": 0,
        "friends": [],
        "validated": false,
        "img": "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/47.jpg",
        "createdAt": "12345",
      }
    ],
    "validated": false,
    "img": "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1139.jpg",
    "createdAt": "1652114407057",
  }
}
```


```
GET /games/single/
```
| Parameter | Type     | Description               |
| --------- | -------- | ------------------------- |
|  Query    | `string` | **Required**  id |
+ Response 200 (application/json)
```json
{ 
    "_id" : ObjectId("627fa47ea56fa3b9c64452bc"), 
    "owner" : "627f0b1bc6a3d29f3692e7f5", 
    "ownerName" : "david", 
    "gameName" : "test game", 
    "playerAllowed" : NumberInt(7), 
    "phase" : "night", 
    "winner" : "none", 
    "started" : true, 
    "voted" : [

    ], 
    "guiltyVoted" : [

    ], 
    "players" : [
        {
            "player" : {
                "user_id" : "627f09ccc6a3d29f3692e7d4", 
                "userName" : "david"
            }, 
            "status" : true, 
            "role" : "wolf", 
            "_id" : ObjectId("627fa48fa56fa3b9c64452d7")
        }, 
        {
            "player" : {
                "user_id" : "627f0b1bc6a3d29f3692e7f5", 
                "userName" : "david2"
            }, 
            "status" : true, 
            "role" : "doctor", 
            "_id" : ObjectId("627fa48fa56fa3b9c64452d8")
        }, 
        {
            "player" : {
                "user_id" : "627f0ba3c6a3d29f3692e815", 
                "userName" : "david3"
            }, 
            "status" : true, 
            "role" : "seer", 
            "_id" : ObjectId("627fa48fa56fa3b9c64452d9")
        }, 
        {
            "player" : {
                "user_id" : "627f01a391b79ed151e03f97", 
                "userName" : "ab1212"
            }, 
            "status" : true, 
            "role" : "villager", 
            "_id" : ObjectId("627fa48fa56fa3b9c64452da")
        }, 
        {
            "player" : {
                "user_id" : "627f07bfc6a3d29f3692e7bd", 
                "userName" : "cihad"
            }, 
            "status" : true, 
            "role" : "villager", 
            "_id" : ObjectId("627fa48fa56fa3b9c64452db")
        }, 
        {
            "player" : {
                "user_id" : "627f0924c6a3d29f3692e7ca", 
                "userName" : "joshson"
            }, 
            "status" : true, 
            "role" : "villager", 
            "_id" : ObjectId("627fa48fa56fa3b9c64452dc")
        }
    ], 
    "createdAt" : 1652532350536.0, 
    "playerVoted" : "ab1212"
}
```

```
PUT /games/
```
| Parameter | Type     | Description               |
| --------- | -------- | ------------------------- |
|  Header    | Authorization | **Required**  token |
|  ownerName   | `string` |                        |
|  gameName  | `string`   | **Required**  JSON Body |
|  players  | `number`   | **Required**  JSON Body |

+ Response 200 (application/json)
```json
{
  "message": "Successfully Created Game",
  "newGame": {
    "owner": "627943e704269d70e06d1556",
    "ownerName": "dwight",
    "gameName": "my awesome game",
    "playerAllowed": 10,
    "phase": "pregame",
    "winner": "none",
    "started": false,
    "_id": "628021ac0812d290b8b36386",
    "voted": [],
    "guiltyVoted": [],
    "players": [],
    "createdAt": 1652564396278,
  }
}


# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
