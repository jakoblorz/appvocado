# vocado
validate JSON schema e.g. from user input whether it meets your database models

## Usage Situation
Imagine a situation where you just want to implement a **RESTful API** in a lazy manner: database inserts and updates are just the http body.
Can you be sure that the body does actually match your expected database model, especially when you use a **NoSQL DocumentStore** like MongoDB
or RethinkDB where models are not supported? 
This is a **lightweight model libary** based on the effort of Evgeny Poberezkin with his [ajv libary](https://github.com/epoberezkin/ajv) for validation,
that simplifies the usage of database models in typescript environments.

## Sample
#### User-Controller.ts
```typescript
import { Model } from '../../lib/ts-eureka';

export class UserController extends Model {

    constructor(){
        super({
            properties: {
                name : { type: "string" },
                email : { type: "string" },
                age : { type: "number" } 
            },
            required: [ 'name', 'email' ]
        });
    }
    
    /* add your custom CRUD methods here, e.g.: */
    
    insertUser(user : any, cb : (err) => void){
      //implementation depends on the database you chose
    }
    
}
```
#### User-Router.ts
```typescript
import express = require('express');
import { UserController } from '../controller/user-controller';

let router = express.Router();
let controller = new UserController();

/**
 * POST /useradd should add a new user to the database
 */
router.post('/useradd', (req, res, next) => {
  //validate the req.body whether it meets the model requirements (in user-controller.ts) 
  //before inserting it to the database
  let isValid = controller.validate(req.body);
  
  if(isValid){
  
    //the req.body meets the requirements, insert it
    controller.insertUser(req.body, (err) => {
      
      //check for thrown error during insertion
      if(err) next(err);
      else res.status(200).send();
    });
  }
  else {
    next(new Error('validation error occured!'));
  }
});

```
