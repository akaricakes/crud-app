document.querySelectorAll('.delete-button').forEach(btn => {
  btn.addEventListener('click', () => {
    const li = btn.closest('li')        // only the row for this button
    const trackData = {
      track: li.querySelector('.track-name').textContent,
      artist: li.querySelector('.track-artist').textContent,
      album: li.querySelector('.track-album').textContent,
      duration: li.querySelector('.track-duration').textContent
    }

    if (!confirm(`Delete "${trackData.track}" by ${trackData.artist}?`)) return

    fetch('/tracks', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(trackData)
    })
      .then(res => res.json())
      .then(() => window.location.reload())
  })
})

document.querySelectorAll('.edit-button').forEach(btn => {
  btn.addEventListener('click', () => {
    const li = btn.closest('li')
    const oldTrack = {
      track: li.querySelector('.track-name').textContent,
      artist: li.querySelector('.track-artist').textContent,
      album: li.querySelector('.track-album').textContent,
      duration: li.querySelector('.track-duration').textContent
    }

    const newTrack = prompt('Track name:', oldTrack.track) || oldTrack.track
    const newArtist = prompt('Artist name:', oldTrack.artist) || oldTrack.artist
    const newAlbum = prompt('Album:', oldTrack.album) || oldTrack.album
    const newDuration = prompt('Duration:', oldTrack.duration) || oldTrack.duration

    fetch('/tracks', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ oldTrack, newTrack: { track: newTrack, artist: newArtist, album: newAlbum, duration: newDuration } })
    })
      .then(res => res.json())
      .then(() => window.location.reload())
  })
})