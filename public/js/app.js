// var Handlebars = require('express-handlebars');
//
// Handlebars.registerHelper('each_upto', function(ary, max, options) {
//     if(!ary || ary.length == 0)
//         return options.inverse(this);
//
//     var result = [ ];
//     for(var i = 0; i < max && i < ary.length; ++i)
//         result.push(options.fn(ary[i]));
//     return result.join('');
// });

$(document).ready(function() {

  $(document).on("submit", "#signInForm", handleUserFormSignIn);
  $(document).on("submit", "#signUpForm", handleUserFormSignUp);

  function handleUserFormSignIn(event) {
    event.preventDefault();
    console.log('handler is working');
    var userCreds = {
      email: $('#email').val().trim(),
      password: $('#password').val().trim()
    };
    // When the form is submitted, we validate there's an email and password entered
    if (!userCreds.email || !userCreds.password) {
      return;
    }
    
    // If we have an email and password we run the loginUser function and clear the form
    loginUser(userCreds.email, userCreds.password);
    $('#email').val("");
    $('#password').val("");
    
    // console.log(userCreds);
    // $.post("/signin", userCreds).then(function(data) {
    //   console.log(data); //send to passport?//
    // });
  };
  function loginUser(email, password) {
    $.post("/api/login", {
      email: email,
      password: password
    }).then(function(data) {
      console.log(data);
      // If there's an error, log the error
    }).catch(function(err) {
      console.log(err);
    });
  }
  function handleUserFormSignUp(event) {
    event.preventDefault();
    console.log('working');
    var newUser = {
      username: $('#username').val().trim(),
      email: $('#email').val().trim(),
      password: $('#password').val().trim()
    };
    $.post("/signup", newUser).then(function(data) {
      console.log(data);
    });
  };
});
