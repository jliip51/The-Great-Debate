$(document).ready(function() {

  $(document).on("submit", "#commentForm", handleNewCommentForm);

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
  //Increments vote count in database for each comment. Incorporates session storage to prevent users from voting on
  //comment more than once in any single browser session//
  $('.upvote').on('click', function() {
    var postid = $(this).attr('data-postid');
    var id = $(this).attr('data-id');
    var userid = $(this).attr('data-user')
    var savedId = sessionStorage.getItem('commentId' + id);
    var savedUserId = sessionStorage.getItem('userId' + id);
    var voteCount = $(this).attr('data-count');

    if (savedId === id && savedUserId === userid) {
      console.log("you already voted on this post");
      $("#comment" + savedId).removeClass('upvote btn-success').addClass('btn-danger').html("Already Voted");
    } else {
      sessionStorage.setItem('commentId' + id, id);
      sessionStorage.setItem('userId' + id, userid);
      var newVoteCt = parseInt(voteCount) + 1
      var upvote = {
        id: parseInt(id),
        votes: newVoteCt,
      }
      $.post("/upvote", upvote).then(function(data) {

        $('#comment' + id).removeClass('upvote btn-success').addClass('btn-danger').html("Already Voted");
        $('#upvote' + id).html(newVoteCt);
      }).catch(function(err) {
        console.log(err);
      });
    }
  });

});
