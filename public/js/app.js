$(document).ready(function() {
  $(document).on("submit", "#signInForm", handleUserFormSignIn);
  $(document).on("submit", "#signUpForm", handleUserFormSignUp);
  $(document).on("submit", "#signOutForm", handleUserFormSignOut);
  $(document).on("submit", "#createPost", handleNewTopicForm);

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

    $.post("/signup", newUser).then(function(data) {
      $('body').html(data);
      window.location.href = "/";
    });
  };

  //New Topic Form Handler Function//
  function handleNewTopicForm(event) {
    event.preventDefault();
    var newTopicPost = {
      category: $('#sel1').val().trim(),
      topic: $('#topic').val().trim(),
      description: $('#description').val().trim(),
    }
    $('#sel1').val("");
    $('#topic').val("");
    $('#description').val("");

    $.post("/admin", newTopicPost).then(function(data) {
       console.log(data);
    }).catch(function(err) {
      console.log(err);
    });
  };

});
