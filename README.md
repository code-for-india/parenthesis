# parenthesis
Monitoring of Public Loos.

## About
This solution aims to create one of the simplest ways to get public feedback.

**Steps involoved**:
- Governing body registers the Loo
- QR gets generated.
- End user ends to scan the QR and give feedback via a Web App.
- Real Time feed will get displays in the Admin Dashboard.

## Server Code: 

**Middleware** used are: 
 * body-parser *for parsing request body*
 * cors *for cross-origin access*
 * jsonwebtoken *for authentication*
 * multer *for uploading image*
 
### Run: 
```shell 
  npm start
```  

### Run with logging:
```shell 
  DEBUG='main:*' nodemon app.js
```  

### Routes:
- base.route incorporates all the routes,
- api.v2.route is for unauthenticated routes,
- api.v1.route is for authenticated routes.

##ScreenShot:
###Admin DashBoard:
![Admin Dashboard](https://farm2.staticflickr.com/1603/26181716976_dcbea830a4_c.jpg)
###Generated QR Code:
![Generated QR Code](https://farm2.staticflickr.com/1553/26115308612_18909f5ebc_z.jpg)

> Meet the team behind it: [angel.co](https://angel.co/projects/243032-monitoring-of-public-loos)
