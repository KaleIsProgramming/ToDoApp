To run app, open the client and server folders in different windows

----SERVER SIDE-----------------------------------------

  ----SETTING UP DATABASE----
    
   the back-end works on mongodb database. To connect it you need to create your own free or paid mongodb database from following website : 
    "https://account.mongodb.com/account/login?n=https%3A%2F%2Fcloud.mongodb.com%2Fv2%2F656f5df212c5f94e505bbe47&nextHash=%23overview&signedOut=true".
    After creating database I would recommend to download mongodb compass from this website -- > "https://www.mongodb.com/try/download/shell",
    ,then u have to connect it with your database. After these steps lets connect your mongodb db with the code. Open on the server side file called database.ts (its in the util folder) and 
    then paste your connect link that you used to connect the compass. In line 8 paste your database name. That's all.

  ----STARTING APP LOCALY----
  
  in your consle type in this command: 'npm i' it will download all needed packages, and after it copy paste the following command: "npm start" it will start the server side app localy on port 3001.





----CLIENT SIDE----------------------------------------
  
  ----RUNNING APP LOCALY----

  In your client side window open the console in your IDE and type in this commend: "npm i" and this one: "npm run dev" its gonna make it run localy on port number 3000.
  
  ----BUILDING APP---- 
  
   To build app type in console of your IDE following command: "npm run build" and then if u wanna run it localy just type in console "npm start".

    
----DOCKER---------------------------------------------


to create image for the client side copy paste this commend to your IDE console : "docker run -d -p 3003:3000 nextjsapp "
to create image for the server side copy paste this commend to your IDE console : "docker run -d -p 3002:3001 serverapi" 
