import { getPostsData } from "./post-get.js";

export const createPostsNav = async () => {
  const pagination = await getPostsData();
  const postsNav = document.getElementById('page-post');
  let postNav = '';

  for (let i = 1; i <= pagination.pagination.pages; i++) {
    postNav += `
    <li>
      <a class="dropdown-item" href="index.html?page=${i}">
        Страница ${i}
      </a>
    </li>
    `;

    postsNav.innerHTML = postNav;
  }
}
