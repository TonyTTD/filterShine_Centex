# Full-stack for filterShine_Centex


## INSTRUCTIONS:
1. ## GIT CLONE REPO
    $ git clone <repo name>
2. ## INSTALL DEPENDENCIES
    $ npm install

## SCRIPT COMMANDS
1. ## RUN BUILD TOOLS
    $ npm start
2. ## RUN IN DEV MODE WITH NODEMON
    $ npm run server-dev

## ROUTES
### Base Path
```httpg
/filtershine/api/
```

```httpg
GET /client/
```
+ Response 200 (application/json)
```json
[   
    {
        service_id: null,
        client_id: null,
        company: '',
        poc: '',
        phone_number: '',
        poc_number: '',
        email: '',
        address: '',
        city: '',
        state: '',
        zip: 76355,
        filter_id:
          { 0: {type: '', installed: null, price: ''},
            100: {type: '', installed: null, price: ''}
          },
        cycle: null,
        createdAt: '',
        serviceon: '',
        route: '',
        title: ''
    },
    ...
]

