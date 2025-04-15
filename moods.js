document.addEventListener("DOMContentLoaded", function () {
    const moodNameInput = document.getElementById("moodName");
    const moodURLInput = document.getElementById("moodURL");
    const addMoodBtn = document.getElementById("addMoodBtn");
    const moodContainer = document.getElementById("moodContainer");
  
    addMoodBtn.addEventListener("click", function () {
      const moodName = moodNameInput.value.trim();
      const moodURL = moodURLInput.value.trim();
  
      if (!moodName || !moodURL) {
        alert("Bitte gib sowohl einen Namen als auch eine Spotify-URL ein.");
        return;
      }
  
      const newCard = document.createElement("div");
      newCard.className = "playlist-card";
      newCard.innerHTML = `
        <div class="card-header">
          <h3 class="mood-title">${moodName}</h3>
          <button class="favorite-button">
            <span class="heart-icon">♡</span>
          </button>
        </div>
        <div class="spotify-embed">
          <iframe style="border-radius:12px" src="${moodURL}" width="100%" height="200" frameborder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
        </div>
      `;
  
      moodContainer.appendChild(newCard);
  
      moodNameInput.value = "";
      moodURLInput.value = "";
    });
  });
  