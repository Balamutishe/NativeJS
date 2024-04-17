import { createPostsNav } from "./post-nav.js";
import { createPostsList } from "./posts-list.js";
import { createPostPage } from "./post-page.js"
import { createPostComment } from "./post-comment.js"


(async function() {
  const postNav = document.getElementById('page-post');
  const postPage = document.getElementById('comments-container');

  if (postNav) {
    createPostsNav();
    createPostsList();
  }

  if (postPage) {
    createPostPage();
    createPostComment();
  }
}());
