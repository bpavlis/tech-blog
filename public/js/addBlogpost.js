async function addBlogpost(event) {
  event.preventDefault()
  const blog = document.querySelector('#text').value
  const text = document.querySelector('#content').value.trim()
  const payload = await fetch(`/api/blogpost`, {
    method: 'POST',
    body: JSON.stringify({blog, text}),
    headers: {
      'Content-Type': 'application/json'
    }
  })


  if (payload.ok) {
    document.location.replace('/dashboard');
  } else {
    alert('Failed');
  }
}
document.querySelector('.blogpost').addEventListener('submit', addBlogpost);