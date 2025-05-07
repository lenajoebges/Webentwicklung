document.addEventListener("DOMContentLoaded", function () {
  const songList = document.querySelector(".song-list");
  const moodNameInput = document.getElementById("moodName");
  const moodURLInput = document.getElementById("moodURL");
  const saveButton = document.getElementById("save-btn");

  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  renderFavorites();

  saveButton.addEventListener("click", function () {
    const mood = moodNameInput.value.trim();
    
    const title = mood ? `${mood.charAt(0).toUpperCase() + mood.slice(1)} Mood` : "Custom Mood";
    if (!title.trim()) {
      alert("Bitte gib einen Titel ein.");
      return;
    }

    const url = moodURLInput.value.trim();

    if (!url) {
      alert("Bitte gib eine gültige Spotify-Playlist-URL ein.");
      return;
    }

    const newFavorite = { title, src: url };

    favorites = favorites.filter(item => item.src !== url);
    favorites.unshift(newFavorite);
    localStorage.setItem("favorites", JSON.stringify(favorites));

    moodNameInput.value = "";
    moodURLInput.value = "";
    renderFavorites();
  });

  function renderFavorites() {
    songList.innerHTML = "";

    favorites.forEach((fav, index) => {
      const card = document.createElement("div");
      card.className = "song-item";

      card.innerHTML = `
        <div class="song-item-header">
          <div class="song-number">${index + 1}</div>
          <div class="song-info">
            <div class="song-mood">${fav.title}</div>
            <div class="song-artist">From Moods</div>
          </div>
          <button class="like-button">❤️</button>
          <button class="remove-button">🗑️</button>
        </div>
        <div class="spotify-embed">
          <iframe style="border-radius:12px" src="${fav.src}" width="100%" height="352" frameborder="0"
            allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"></iframe>
        </div>
      `;

      card.querySelector(".remove-button").addEventListener("click", () => {
        favorites.splice(index, 1);
        localStorage.setItem("favorites", JSON.stringify(favorites));
        renderFavorites();
      });

      songList.appendChild(card);
    });
  }
});