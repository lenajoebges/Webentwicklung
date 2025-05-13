document.addEventListener("DOMContentLoaded", function () {
  console.log("JS läuft");

  const moodNameInput = document.getElementById("moodName");
  const moodURLInput = document.getElementById("moodURL");
  const addMoodBtn = document.getElementById("addMoodBtn");
  const yourMoodsGrid = document.getElementById("yourMoodsGrid");

  let customMoods = JSON.parse(localStorage.getItem("customMoods")) || [];

  customMoods.forEach(mood => {
    const newCard = createMoodCard(mood.title, mood.src);
    yourMoodsGrid.prepend(newCard);
    addFavoriteButtonHandler(newCard);
  });

  updateEmptyPlaceholder();

  addMoodBtn.addEventListener("click", function () {
    const moodName = moodNameInput.value.trim();
    const moodURL = moodURLInput.value.trim();

    if (!moodName || !moodURL) {
      alert("Bitte gib einen Namen und eine gültige Spotify-URL ein.");
      return;
    }

    if (customMoods.some(m => m.title.toLowerCase() === moodName.toLowerCase())) {
      alert("Ein Mood mit diesem Namen existiert bereits.");
      return;
    }

    const newCard = createMoodCard(moodName, moodURL);

    customMoods.unshift({ title: moodName, src: moodURL });
    localStorage.setItem("customMoods", JSON.stringify(customMoods));

    yourMoodsGrid.prepend(newCard);
    addFavoriteButtonHandler(newCard);

    updateEmptyPlaceholder();

    moodNameInput.value = "";
    moodURLInput.value = "";
  });

  function createMoodCard(title, url) {
    const newCard = document.createElement("div");
    newCard.className = "playlist-card";
    newCard.innerHTML = `
    <div class="card-header">
      <h3 class="mood-title">${title}</h3>
      <div class="card-actions">
        <button class="favorite-button">
          <span class="heart-icon">♡</span>
        </button>
        <button class="delete-button">🗑️</button>
      </div>
    </div>
    <div class="spotify-embed">
      <iframe
      style="border-radius:12px"
      src="${url}"
      width="100%"
      height="152"
      frameborder="0"
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      loading="lazy">
      </iframe>
    </div>
  `;
    const deleteBtn = newCard.querySelector(".delete-button");
    deleteBtn.addEventListener("click", () => {
      customMoods = customMoods.filter(m => !(m.title === title && m.src === url));
      localStorage.setItem("customMoods", JSON.stringify(customMoods));

      newCard.remove();
      updateEmptyPlaceholder();
    });

    return newCard;
  }

  document.querySelectorAll(".playlist-card").forEach(card => {
    addFavoriteButtonHandler(card);

    const allPlaylistCards = document.querySelectorAll(".playlist-card");
    const existingFavorites = JSON.parse(localStorage.getItem("favorites")) || [];

    allPlaylistCards.forEach(card => {
      const title = card.querySelector(".mood-title")?.textContent.trim();
      const iframe = card.querySelector("iframe")?.getAttribute("src");
      const heartIcon = card.querySelector(".heart-icon");

      if (!title || !iframe || !heartIcon) return;

      const isFavorited = existingFavorites.some(fav => fav.src === iframe);

      if (isFavorited) {
        heartIcon.textContent = "❤️";
      } else {
        heartIcon.textContent = "♡";
      }
    });

  });

  const params = new URLSearchParams(window.location.search);
  const selectedMood = params.get("mood");

  const backButton = document.getElementById("showAllMoodsBtn");

  if (selectedMood) {
    const allCards = document.querySelectorAll(".playlist-card");

    allCards.forEach(card => {
      const titleEl = card.querySelector(".mood-title");
      if (!titleEl) return;

      const title = titleEl.textContent.toLowerCase().trim();

      if (title === selectedMood.toLowerCase()) {
        card.classList.add("fullscreen-card");

        const grid = card.closest(".playlist-grid");
        if (grid) {
          grid.classList.add("only-one");
        }

      } else {
        card.classList.add("hidden");
      }
    });

    const allTitles = document.querySelectorAll("h1.section-title");
    if (yourMoodsGrid) yourMoodsGrid.style.display = "none";
    allTitles.forEach(title => {
      if (title.textContent.toLowerCase().includes("your moods")) {
        title.style.display = "none";
      }
    });

    const popularTitle = document.querySelector("h1.section-title:nth-of-type(2)");
    if (popularTitle) {
      popularTitle.textContent = `${selectedMood.charAt(0).toUpperCase() + selectedMood.slice(1)} Mood`;
    }

    const backButton = document.getElementById("showAllMoodsBtn");

    if (backButton && !backButton.classList.contains("bound")) {
      backButton.classList.add("bound");
      backButton.addEventListener("click", () => {
        window.location.href = "moods.html";
      });
    }

    if (backButton) {
      backButton.style.display = selectedMood ? "inline-block" : "none";
    }


    const createMood = document.querySelector(".create-mood");
    if (selectedMood && createMood) {
      createMood.style.display = "none";
    }
  }

  function addFavoriteButtonHandler(card) {
    const btn = card.querySelector(".favorite-button");
    const heart = btn.querySelector(".heart-icon");
    const title = card.querySelector(".mood-title").textContent.trim();
    const iframe = card.querySelector("iframe").getAttribute("src");

    const playlistData = { title, src: iframe };
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    const isAlreadyFavorite = favorites.some(item => item.src === iframe);
    heart.textContent = isAlreadyFavorite ? "❤️" : "♡";

    if (!btn.classList.contains("favorited-bound")) {
      btn.classList.add("favorited-bound");

      btn.addEventListener("click", () => {
        favorites = JSON.parse(localStorage.getItem("favorites")) || [];
        const isNowFavorite = heart.textContent === "❤️";

        if (isNowFavorite) {
          favorites = favorites.filter(item => item.src !== iframe);
          heart.textContent = "♡";

          updateEmptyPlaceholder();

        } else {
          favorites.unshift(playlistData);
          heart.textContent = "❤️";

          updateEmptyPlaceholder();
        }

        localStorage.setItem("favorites", JSON.stringify(favorites));
      });
    }
  }

  function updateEmptyPlaceholder() {
    const placeholder = document.getElementById("emptyPlaceholder");
    const hasMoodCards = yourMoodsGrid.querySelectorAll(".playlist-card").length > 0;

    const params = new URLSearchParams(window.location.search);
    const selectedMood = params.get("mood");

    if (placeholder) {
      if (!hasMoodCards && !selectedMood) {
        placeholder.style.display = "block";
      } else {
        placeholder.style.display = "none";
      }
    }
  }
});