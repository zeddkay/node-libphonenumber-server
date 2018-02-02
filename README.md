# node-libphonenumber-server
DPS909 Release 0.1 - A small server using node js and google's libphonenumber module.

## Instructions

To get this working on your machine, first clone or download the repo onto your machine, and open it up in your terminal shell.
When you're in the correct directory, type 
``` npm install ```    
To run the app, type
``` node index.js ```

First, check that you receive the message "Server is running" at:    
http://localhost:8000/    
The app supports GET requests, such as:    
http://localhost:8000/api/phonenumbers/parse/text/nothing    
(or whatever text you like)    
It also supports POST requests, such as:    
http://localhost:8000/api/phonenumbers/parse/file    
where you will be redirected to a small form to upload a text file, which will then be parsed.     
As of now, the parsing function uses commas and semicolons as delimiters/splitters.    

For testing purposes on the terminal, type 
``` mocha ```
or
``` mocha test ```

Please feel free to fix any issues or make recommendations. Thank you.
