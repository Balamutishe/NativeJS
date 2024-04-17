export const createPostPage = async () => {
  const postPage = document.getElementById('post-block');
  let postContent = '';

  const pageParams = new URLSearchParams(location.search);
  const postId = pageParams.get('id');

  const response = await fetch(`https://gorest.co.in/public-api/posts/${postId}`);
  const dataArr = await response.json();
  const post = dataArr.data;

  postContent = `
    <div class="card">
      <div class="card-body">
        <h1 class="card-title">
          ${post.title}
        </h1>
        <p class="card-text">
          ${post.body}
        <p>
      </div>
    </div>
  `;

  postPage.innerHTML = postContent;
}
