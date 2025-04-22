document.addEventListener("DOMContentLoaded", function () {
    console.log("favoriten.js läuft");
  
    const songList = document.querySelector(".song-list");
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  
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
  
      const removeBtn = card.querySelector(".remove-button");
      removeBtn.addEventListener("click", () => {
        favorites.splice(index, 1);
        localStorage.setItem("favorites", JSON.stringify(favorites));
        card.remove();
      });
  
      songList.prepend(card);
    });
  });
  