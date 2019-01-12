# LoginCode


## Introduction
This repository contains a javascript collection of routes, controllers, and models for 
an authentication engine which is portable to applications built in the MVC development 
pattern and leveraging the MERN architecture.  


## Overview
As this project is built in the MVC pattern it contains the following essential elements:
* routes - The express routing which serves the various authentication functions.
* controllers - The logic handling the various functions require to authenticate users.
* models - The data definitions used to intereact with the backend Mongo database.


## Requirements
This project requires you to load the following libraries:
* mongoose - An ODM which uses the models to write to and read from the database.
* bcryptjs - A library which hashes passwords leveraging built in salting.


## To Use
The steps below define the minimum set of steps needed to use the library.  Be sure to 
review the included components and develop an understanding of how it functions to be
able to integrate with your code and directory setup.  

1.  Clone this library to an empty working directory: 
    `git clone https://github.com/Steven-M-Carpenter/LoginCode.git`

2.  Review the routes directory.  The default uses a couple of `index.js` files to funnel 
    routes to the API folder.  Determine if this fits your need or adjust as needed. The 
    `login.js` file is critical to the operation of the library and is the only file which 
    must be required or imported from the routes directory.

3.  Review the models directory.  The library is using an `index.js` file to reference the
    `User.js` and `UserSession.js` files.  Determine if this aligns to your library 
    convention and adjust as needed.  The `User.js` and `UserSession.js` files are both
    required elements for the function library and should be integrated with your models as 
    appropriate.

4.  Review the controllers directory.  The `loginController.js` file contains the methods
    to service the various authentication calls.  By default the library contains code to
    record a session token to local storage for any login action.  Remove or adapt this to
    the needs of your application.  
    
    Additionally, the storage key was assigned a default 
    value of `SMC_authkey` to avoid possible conflicts.  You can adjust that key to fit 
    the needs of your application.  There are 2 references to that value and both should 
    be changed.  

    The messages for both success and failure which are included in the `loginController.js`
    file will work as provided or  can be tailored to your specific needs.

5.  Be sure the `mongoose` and `bcryptjs` libraries are installed on the server side of
    your application.  These can be installed using either of the following commands:

    `npm install mongoose bcryptjs`

    or

    `yarn add mongoose bcryptjs`


## License
This library is maintained in the public GitHub repository listed below. It is free for use
in your own projects and may be adapted or altered in any way to suit your purposes.  The 
only requests made of the users of this library are:
1.  You retain the provided Developer.md file within your models library.
2.  Maybe give it a star in my repository if it helps you.

    https://github.com/Steven-M-Carpenter/LoginCode.git 


## Notes to Users

* This library currently contains no validation beyond whether or not a value exists or not.
  If you have a need to confirm the validity of email address or intend to impose password
  length or content limitations, you'll need to integrate that to fit your intent.

* This library does not provide enterprise strenth authentication.  It is a basic utility
  for the authentication of application users.  There is no support nor warranty expressed
  nor implied with the usage of this library.  
