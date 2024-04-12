
---
**URL Shortening Service**

This service provides API endpoints that allow a user to input a url and get a returned, shortened url. The user can then use that shortened url through the API endpoint which will then re-direct them to the original, longer, url.  

---
**Prerequisites**
Before running the project, ensure you have the following installed:

- Node.js (https://nodejs.org/)
- Npm version:  20.11.0 (use other versions at your own debugging leisure)
- Mongodb https://www.mongodb.com/try/download/community

``Optional: For node version manager, i suggest downloading it from the following github repo:  
https://github.com/coreybutler/nvm-windows/releases ``

---
**Setup** 

On windows, you may need to run the following command, in order to allow ``powershell`` to execute scripts if they are signed by a trusted publisher.
```powershell 
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned 
```

After cloning the repo, you should then be able to run 
```powershell
npm install
```
once the node_modules are done installing, run the following: 
```powershell
npm install ts-node -g 
```

you should now be able to run the server by running the following: 

```powershell
cd src
```

```powershell
ts-node index.ts
```

You should now have a running server. 

You will then need to download and install mongodb https://www.mongodb.com/try/download/community. Select your platform. 

---
**Using the Service**

You can access the API enpoints through a few methods: 

**Method 1: (PowerShell)**
```powershell
Invoke-WebRequest -Uri "http://localhost:3000/api/shorten" -Method POST -ContentType "application/json" -Body '{"url": "https://www.google.com"}'
```

You can edit the url to your leisure. 

You should then get a response like the one below: 
```powershell
StatusCode        : 200
StatusDescription : OK
Content           : {"shortenedUrl":"http://localhost:3000/ac6bb669"}
RawContent        : HTTP/1.1 200 OK
                    Connection: keep-alive
                    Keep-Alive: timeout=5
                    Content-Length: 27
                    Content-Type: application/json; charset=utf-8
                    Date: Fri, 12 Apr 2024 12:26:02 GMT
                    ETag: W/"1b-jmgzGhDn5snKmzGMPQuR...
Forms             : {}
Headers           : {[Connection, keep-alive], [Keep-Alive, timeout=5], [Content-Length, 27], [Content-Type, application/json; charset=utf-8]...}
Images            : {}
InputFields       : {}
Links             : {}
ParsedHtml        : System.__ComObject
RawContentLength  : 27
```

you should then be able to access the endpoint get re-directed to www.google.com by putting the url http://localhost:3000/ac6bb669 ``(This is using the above examples output)`` into your browser. 

**Method 2: (Postman)**

Download and Install Postman:

Go to the Postman website (https://www.postman.com/downloads/) and download the appropriate version of Postman for your operating system.
Follow the installation instructions to install Postman on your computer.

You should then be able to create a new request by selecting the request method: "Post" in the dropdown and putting the variable: http://localhost:3000/api/shorten as the url. 

then, in the body, add a raw body: 
```json
{
    "url": "https://www.youtube.com"
}
```

You should then be able to click on the 'send' button and receive the following response: 

```json
{
    "shortenedUrl": "http://localhost:3000/d9331ac1"
}
```

you should then be able to access the endpoint get re-directed to www.youtube.com by putting the url http://localhost:3000/d9331ac1 ``(This is using the above examples output)`` into your browser. 

---
**Unit Tests** 
You can run the Unit tests by running the following command: 

```
npm run test
```