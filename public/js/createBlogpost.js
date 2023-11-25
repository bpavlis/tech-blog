
async function createBlogpost(x) {
  x.preventDefault()
  document.location.replace("/dashboard/new")
}

document.querySelector('#createBlogpost').addEventListener('click', createBlogpost);
