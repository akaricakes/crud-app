const update = document.querySelector('#update-button')
const data = {
  name: '',
  track: '',
}
const deleteButton = document.querySelector('#delete-button')
const messageDiv = document.querySelector('#message')

deleteButton.addEventListener('click', _ => {
  fetch('/tracks', {
    method: 'delete',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Darth Vader'
    })
  })
    .then(res => res.json())
    .then(data => {
      if (data === 'No track to delete') {
        messageDiv.textContent = 'No track to delete'
      } else {
        window.location.reload()
      }
    })
    .catch(err => console.error(err))
})

update.addEventListener('click', _ => {
  fetch('/tracks', {
    method: 'put',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: '',
      track: '',
    }),
  })
    .then(res => {
      if (res.ok) return res.json()
    })
    .then(response => {
      window.location.reload(true)
    })
    .catch(err => console.error(err))
})