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
  $(document).on("submit", "#signOutForm", handleUserFormSignOut);


  function handleUserFormSignOut(e) {
      event.preventDefault();
    console.log("Reached sign out handler");
    $.post("/signout", {}, function(res) {
      console.log("Signed out")
      window.location = res.redirectTo || "/"
    });
  }

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
    $.post("/signin", userCreds, function(data) {
      $('body').html(data);
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

    if (!newUser.username) {

      return;
    }
    if (!newUser.email) {
      //enter email
      return;
    }
    if (!newUser.password) {
      //enter password
      return;
    }

    $('#username').val("");
    $('#inputEmail3').val("");
    $('#inputPassword3').val("");
    console.log(newUser);
    $.post("/signup", newUser).then(function(data) {
      console.log(data);
      console.log(arguments);
      $('body').html(data);
    });
  };

  $.get("/user_data").then(function(data) {
    $("meetthe").text(data.email);
  });
});
