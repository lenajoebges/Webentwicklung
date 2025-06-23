document.addEventListener("DOMContentLoaded", function () {
  const songList = document.querySelector(".song-list");
  const moodNameInput = document.getElementById("moodName");
  const moodURLInput = document.getElementById("moodURL");
  const saveButton = document.getElementById("save-btn");

  renderFavorites();

  saveButton.addEventListener("click", async function () {
    let mood = moodNameInput.value.trim();
    let url = moodURLInput.value.trim();

    if (!mood) {
      alert("Bitte gib einen Namen ein.");
      return;
    }

    if (!url) {
      alert("Bitte gib eine gültige Spotify-Playlist-URL ein.");
      return;
    }

    if (url.includes("open.spotify.com/playlist/") && !url.includes("/embed/")) {
      const parts = url.split("/playlist/");
      const playlistId = parts[1].split("?")[0];
      url = `https://open.spotify.com/embed/playlist/${playlistId}`;
    }

    const res = await fetch("http://localhost:3000/api/favorites");
    const existing = await res.json();

    if (existing.some(f => f.url === url)) {
      alert("Diese Playlist wurde bereits als Favorit gespeichert.");
      return;
    }

    await fetch("http://localhost:3000/api/favorites", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: Math.floor(Math.random() * 100000),
        titel: mood.charAt(0).toUpperCase() + mood.slice(1),
        url: url
      })
    });
    
    await fetch("http://localhost:3000/api/moods", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ titel: mood.charAt(0).toUpperCase() + mood.slice(1), url })
    });    

    moodNameInput.value = "";
    moodURLInput.value = "";
    renderFavorites();
  });

  async function renderFavorites() {
    const res = await fetch("http://localhost:3000/api/favorites");
    const favorites = (await res.json()).reverse();

    songList.innerHTML = "";

    favorites.forEach((fav, index) => {
      const card = document.createElement("div");
      card.className = "song-item";

      const number = favorites.length - index;

      card.innerHTML = `
        <div class="song-item-header">
          <div class="song-number">${number}</div>
          <div class="song-info">
            <div class="song-mood">${fav.titel}</div>
          </div>
          <button class="like-button">❤️</button>
          <button class="remove-button">🗑️</button>
        </div>
        <div class="spotify-embed">
          <iframe style="border-radius:12px" src="${fav.url}" width="100%" height="352" frameborder="0"
            allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"></iframe>
        </div>
      `;

      card.querySelector(".remove-button").addEventListener("click", async () => {
        await fetch(`http://localhost:3000/api/favorites/${fav.id}`, {
          method: "DELETE"
        });
        renderFavorites();
      });

      songList.prepend(card);
    });
  }
});