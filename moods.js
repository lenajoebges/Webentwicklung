document.addEventListener("DOMContentLoaded", function () {
  console.log("JS läuft");

  const moodNameInput = document.getElementById("moodName");
  const moodURLInput = document.getElementById("moodURL");
  const addMoodBtn = document.getElementById("addMoodBtn");
  const yourMoodsGrid = document.getElementById("yourMoodsGrid");

  document.querySelectorAll(".playlist-card").forEach(card => {
    addFavoriteButtonHandler(card);
  });

  renderMoods();

  addMoodBtn.addEventListener("click", function () {
    const moodName = moodNameInput.value.trim();
    const moodURL = moodURLInput.value.trim();

    if (!moodName || !moodURL) {
      alert("Error.");
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

    const placeholder = document.getElementById("emptyPlaceholder");
    if (placeholder) placeholder.remove();

    yourMoodsGrid.prepend(newCard);
    addFavoriteButtonHandler(newCard);

    moodNameInput.value = "";
    moodURLInput.value = "";
    renderMoods();
  });

  document.querySelectorAll(".playlist-card").forEach(card => {
    addFavoriteButtonHandler(card);
  });

  const params = new URLSearchParams(window.location.search);
  const selectedMood = params.get("mood");

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
    if (backButton) {
      backButton.addEventListener("click", function () {
        document.querySelectorAll(".playlist-card").forEach(card => {
          card.classList.remove("hidden", "fullscreen-card");
        });

        document.querySelectorAll(".playlist-grid").forEach(grid => {
          grid.classList.remove("only-one");
          grid.style.display = "";
        });

        const allTitles = document.querySelectorAll("h1.section-title");
        allTitles.forEach(title => {
          if (title.textContent.toLowerCase().includes("your moods")) {
            title.style.display = "block";
          } else {
            title.textContent = "Popular Moods";
          }
        });

        if (yourMoodsGrid) yourMoodsGrid.style.display = "grid";
        backButton.style.display = "none";
      });
    }
    if (selectedMood && backButton) {
      backButton.style.display = "block";
    } else if (backButton) {
      backButton.style.display = "none";
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
        } else {
          favorites.unshift(playlistData);
          heart.textContent = "❤️";
        }
  
        localStorage.setItem("favorites", JSON.stringify(favorites));
      });
    }
  }
});