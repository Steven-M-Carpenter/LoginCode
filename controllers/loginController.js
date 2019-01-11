const db = require("../models");
const User = require("../models/User")
const UserSession = require("../models/UserSession")

//*************************************************************************/
//* This is a basic library to handle user authentication.  It uses a 
//* MongoDB backend and requires both mongoose ODM and the bcryptjs npm 
//* package.  
//*************************************************************************/


// Defining methods for the loginController
module.exports = {


  //************************************************************/
  //* Allow users to self register
  //************************************************************/
  signUp: (req, res) => {
    const { body } = req;
    const {
      firstName,
      lastName,
      password
    } = body;
    let { email } = body;


    if (!firstName) {
      return res.send({
        success: false,
        message: 'ERROR: You must specify a first name.'
      });
    };
    if (!lastName) {
      return res.send({
        success: false,
        message: 'ERROR: You must specify a last name.'
      });
    };
    if (!email) {
      return res.send({
        success: false,
        message: 'ERROR: You must specify an email address.'
      });
    };
    if (!password) {
      return res.send({
        success: false,
        message: 'ERROR: You must specify a password.'
      });
    };
    email = email.toLowerCase();


    db.User.find({
      email: email
    }, (err, exists) => {
      if (err) {
        return res.send({
          success: false,
          message: 'ERROR:  Server error'
        });
      } else if (exists.length > 0) {
        return res.send({
          success: false,
          message: 'ERROR:  Account requested does not meet requriements'
        });
      };
    });


    const newUser = new User();
    newUser.email = email;
    newUser.firstName = firstName;
    newUser.lastName = lastName;
    newUser.password = newUser.generateHash(password);
    newUser.save((err, user) => {
      if (err) {
        return res.send({
          success: false,
          message: 'ERROR:  Server error'
        });
      }
      return res.send({
        success: true,
        message: 'Signup complete!'
      });
    });
    if (success) {
    localStorage.setItem("SMC_authkey", token);
    };
  },



  //************************************************************/
  //* Process user Sign-in and create auth token for them
  //************************************************************/
  signIn: (req, res) => {
    const { body } = req;
    const { password } = body;
    let { email } = body;


    if (!email) {
      return res.send({
        success: false,
        message: 'ERROR: You must specify an email address.'
      });
    };
    if (!password) {
      return res.send({
        success: false,
        message: 'ERROR: You must specify a password.'
      });
    };
    email = email.toLowerCase();

    /*Let's see if we can find the user */
    User.find({
      email: email
    }, (err, users) => {
      console.log("Found user = " + users);
      if (err) {
        return res.send({
          success: false,
          message: 'ERROR:  Server error'
        });
      };
      if (users.length != 1) {
        return res.send({
          success: false,
          message: 'ERROR:  Unable to process login.'
        });
      };

      /*Having found the user, let's compare the password*/
      const user = users[0];
      console.log("password supplied = " + password);
      if (!user.validPassword(password, user.password)) {
        return res.send({
          success: false,
          message: 'ERROR:  Invalid login.'
        });
      };


      /*Record a user session inthe session table*/
      const userSession = new UserSession();
      userSession.userId = user._id;
      userSession.save((err, doc) => {
        if (err) {
          return res.send({
            success: false,
            message: 'ERROR:  Server error'
          });
        };


        /*Return success and the token from the user session*/
        return res.send({
          success: true,
          message: "User login is complete",
          token: doc._id
        });
      });
      localStorage.setItem("SMC_authkey", token);
    });
  },
  /* I haven't created the "store session token" capability yet - Don't forget
  
  
  
  //************************************************************/
  //* Verify validity of a user's token if presented 
  //************************************************************/
  verify: (req, res) => {
    const { query } = req;
    const { token } = query;


    /*Let's see if we can find the user */
    UserSession.find({
      _id: token,
      isDeleted: false
    }, (err, sessions) => {
      if (err) {
        return res.send({
          success: false,
          message: "ERROR:  Unable to obtain user token."
        });
      };

      /*If you can't find the session or find too many */
      if (sessions.length != 1) {
        return res.send({
          success: false,
          message: "ERROR:  Unable to verify session."
        });
      } else {
        return res.send({
          success: true,
          message: "Successfully verified session token."
        });
      };
    });
  },



  //************************************************************/
  //* Process logout and invalidate user token in DB 
  //************************************************************/
  logout: (req, res) => {
    const { query } = req;
    const { token } = query;

    /*When the user elects to logout, invalidate the session token */
    UserSession.findOneAndUpdate({
      _id: token,
      isDeleted: false
    }, {
        $set: { isDeleted: true }
      }, null, (err, sessions) => {
        if (err) {
          return res.send({
            success: false,
            message: "ERROR:  Unable to obtain user token."
          });
        };

        /*Send the logout message when successful */
        return res.send({
          success: true,
          message: "Successfully logged out."
        });
      });
  },
};
