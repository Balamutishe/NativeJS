export const getPostsData = async () => {
  const pageParams = new URLSearchParams(location.search);
  const postPage = pageParams.get('page');

  const response = await fetch(`https://gorest.co.in/public-api/posts?page=${postPage == null ? 1 : postPage}`);
  const dataArr = await response.json();

  return {
    posts: dataArr.data,
    pagination: dataArr.meta.pagination,
  };
}
