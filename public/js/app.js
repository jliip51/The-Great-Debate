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

    $('#email').val("");
    $('#password').val("");

    console.log(userCreds);
    $.get("/signin", userCreds).then(function(data) {
      console.log(data); //send to passport?//
    });
  };
  function handleUserFormSignUp(event) {
    event.preventDefault();
    console.log('working');
    var newUser = {
      username: $('#username').val().trim(),
      email: $('#inputEmail3').val().trim(),
      password: $('#inputPassword3').val().trim()
    };
    console.log(newUser);
    $.post("/signup", newUser).then(function(data) {
      console.log(data);
    });
  };
});
