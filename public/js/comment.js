$(document).ready(function() {

  $(document).on("submit", "#commentForm", handleNewCommentForm);

  //Comment Form Handler Function//
  function handleNewCommentForm(event) {
    event.preventDefault();
    var userid = $('#userid').val().trim();
    var newComment = {
      body: $('#comment').val().trim(),
      links: $('#citedlink').val().trim(),
      PostId: parseInt($('#postid').val().trim()),
      UserId: $("#userid").val().trim()
    }
    if(!userid || userid === "") {
      newComment.UserId = "anonymous" //doesn't work with UUID DataType, has to be 36Char and unique//
    } else {
      newComment.UserId = userid
    }
    $('#comment').val("");
    $('#citedlink').val("");
    $('#commentModal').modal('toggle');

    $.post("/add", newComment).then(function(data) {
       return data;
    }).catch(function(err) {
      console.log(err);
    });
  }

});
