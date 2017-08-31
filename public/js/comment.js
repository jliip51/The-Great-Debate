$(document).ready(function() {

  $(document).on("submit", "#commentForm", handleNewCommentForm);
  // $(document).on("click", ".upvote", handleUpvote);

  //Comment Form Handler Function//
  function handleNewCommentForm(event) {
    event.preventDefault();
    var userid = $('#userid').val().trim();
    var postid = parseInt($('#postid').val().trim());
    var newComment = {
      body: $('#comment').val().trim(),
      links: $('#citedlink').val().trim(),
      PostId: postid,
      UserId: userid
    }
    // if(!userid || userid === "") {
    //   newComment.UserId = "anonymous" //doesn't work with UUID DataType, has to be 36Char and unique//
    // } else {
    //   newComment.UserId = userid
    // }
    $('#comment').val("");
    $('#citedlink').val("");
    $('#commentModal').modal('toggle');

    $.post("/add", newComment).then(function(data) {
       window.location.href = '/post/' + postid;
       return data;
    }).catch(function(err) {
      console.log(err);
    });
  };

  $('.upvote').on('click', function() {
    var voteCount = $(this).attr('data-count');
    var postid = $(this).attr('data-postid');
    var id = $(this).attr('data-id');
    var newVoteCt = parseInt(voteCount) + 1
    var upvote = {
      id: parseInt(id),
      votes: newVoteCt,
    }
    $.post("/upvote", upvote).then(function(data) {

      $('#comment' + id).removeClass('upvote btn-success').addClass('btn-danger');
      $('#upvote' + id).html(newVoteCt);
    }).catch(function(err) {
      console.log(err);
    });
  });

});
