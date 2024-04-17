export const createPostComment = async () => {
  const commentsBlock = document.getElementById('comments-block');
  let postComment = '';

  const pageParams = new URLSearchParams(location.search);
  const postId = pageParams.get('id');

  const response = await fetch(`https://gorest.co.in/public-api/comments?post_id=${postId}`);
  const dataArr = await response.json();
  const comments = dataArr.data;

  comments.map(item => {
    postComment = `
      <div class="card">
      <div class="card-header">
        ${item.email}
      </div>
        <div class="card-body">
          <h1 class="card-title">
            ${item.name}
          </h1>
          <p class="card-text">
            ${item.body}
          <p>
        </div>
      </div>
    `;

    commentsBlock.innerHTML = postComment;
  });
}
