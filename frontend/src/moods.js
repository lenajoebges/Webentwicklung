document.addEventListener("DOMContentLoaded", async () => {
  const addMoodBtn = document.getElementById("addMoodBtn");
  const moodNameInput = document.getElementById("moodNameInput");
  const moodURLInput = document.getElementById("moodURLInput");
  const yourMoodsGrid = document.getElementById("yourMoodsGrid");
  const emptyPlaceholder = document.getElementById("emptyPlaceholder");
  const backButton = document.getElementById("showAllMoodsBtn");

  let customMoods = [];

  async function fetchFavorites() {
    const res = await fetch("http://localhost:3000/api/favorites");
    return res.ok ? await res.json() : [];
  }

  async function fetchCustomMoods() {
    const res = await fetch("http://localhost:3000/api/moods");
    customMoods = res.ok ? await res.json() : [];
    yourMoodsGrid.innerHTML = "";

    if (customMoods.length === 0) {
      emptyPlaceholder.style.display = "block";
    } else {
      emptyPlaceholder.style.display = "none";
    }

    const favorites = await fetchFavorites();

    customMoods.forEach((mood) => {
      const isFav = favorites.some(f => f.url === mood.url);
      const card = createMoodCard(mood.titel, mood.url, mood.id, isFav);
      yourMoodsGrid.prepend(card);
    });
  }

  async function saveMood(titel, url) {
    await fetch("http://localhost:3000/api/moods", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ titel, url })
    });
  }

  async function deleteMood(id) {
    await fetch(`http://localhost:3000/api/moods/${id}`, {
      method: "DELETE"
    });
  }

  async function saveFavorite(id, titel, url) {
    await fetch("http://localhost:3000/api/favorites", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, titel, url })
    });
  }

  async function deleteFavoriteByUrl(url) {
    const favorites = await fetchFavorites();
    const match = favorites.find(f => f.url === url);
    if (match) {
      await fetch(`http://localhost:3000/api/favorites/${match.id}`, {
        method: "DELETE"
      });
    }
  }

  function createMoodCard(titel, url, id, isFav = false) {
    const card = document.createElement("div");
    card.className = "playlist-card";
    card.dataset.id = id;

    card.innerHTML = `
      <div class="card-header">
        <h3 class="mood-title">${titel}</h3>
        <div class="button-group">
          <button class="favorite-button"><span class="heart-icon">${isFav ? "❤️" : "♡"}</span></button>
          <button class="delete-button">🗑️</button>
        </div>
      </div>
      <div class="spotify-embed">
        <iframe src="${url}" width="100%" height="200" frameborder="0" allowfullscreen=""
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy">
        </iframe>
      </div>
    `;

    const delBtn = card.querySelector(".delete-button");
    delBtn.addEventListener("click", async (e) => {
      e.stopPropagation();
      await deleteMood(id);
      await deleteFavoriteByUrl(url);
      card.remove();
    });

    const favBtn = card.querySelector(".favorite-button");
    const heart = favBtn.querySelector(".heart-icon");

    favBtn.addEventListener("click", async () => {
      if (heart.textContent === "❤️") {
        await deleteFavoriteByUrl(url);
        heart.textContent = "♡";
      } else {
        await saveFavorite(Math.floor(Math.random() * 100000), titel, url);
        heart.textContent = "❤️";
      }
    });

    return card;
  }

  async function markAndAttachStaticFavorites() {
    const favorites = await fetchFavorites();

    document.querySelectorAll(".playlist-card").forEach((card) => {
      if (card.querySelector(".delete-button")) return;

      const title = card.querySelector(".mood-title")?.textContent;
      const url = card.querySelector("iframe")?.src;
      const heart = card.querySelector(".heart-icon");
      const favBtn = card.querySelector(".favorite-button");

      const isFav = favorites.some(f => f.url === url);
      heart.textContent = isFav ? "❤️" : "♡";

      favBtn.addEventListener("click", async () => {
        if (heart.textContent === "❤️") {
          await deleteFavoriteByUrl(url);
          heart.textContent = "♡";
        } else {
          await saveFavorite(Math.floor(Math.random() * 100000), title, url);
          heart.textContent = "❤️";
        }
      });
    });
  }

  addMoodBtn.addEventListener("click", async () => {
    let moodName = moodNameInput.value.trim();
    let moodURL = moodURLInput.value.trim();

    if (!moodName || !moodURL) {
      alert("Bitte gib einen Namen und eine gültige Spotify-URL ein.");
      return;
    }

    if (moodURL.includes("open.spotify.com/playlist/") && !moodURL.includes("/embed/")) {
      const parts = moodURL.split("/playlist/");
      const playlistId = parts[1].split("?")[0];
      moodURL = `https://open.spotify.com/embed/playlist/${playlistId}`;
    }

    moodName = moodName.charAt(0).toUpperCase() + moodName.slice(1);

    const exists = customMoods.some(m => m.titel.toLowerCase() === moodName.toLowerCase() || m.url === moodURL);
    if (exists) {
      alert("Ein Mood mit diesem Namen oder dieser URL existiert bereits.");
      return;
    }

    await saveMood(moodName, moodURL);
    moodNameInput.value = "";
    moodURLInput.value = "";

    await fetchCustomMoods();
  });

  backButton.addEventListener("click", () => {
    document.querySelectorAll(".playlist-card").forEach(c => {
      c.classList.remove("hidden", "fullscreen-card");
    });
    backButton.style.display = "none";
  });

  await fetchCustomMoods();
  await markAndAttachStaticFavorites();

  const params = new URLSearchParams(window.location.search);
  const moodParam = params.get("mood");

  if (moodParam) {
    const moodName = moodParam.toLowerCase();

    const tryShowMood = () => {
      const cards = document.querySelectorAll(".playlist-card");
      let targetCard = null;

      cards.forEach(card => {
        const title = card.querySelector(".mood-title")?.textContent?.toLowerCase();
        if (title === moodName) targetCard = card;
      });

      if (!targetCard) {
        requestAnimationFrame(tryShowMood);
        return;
      }

      cards.forEach(card => {
        if (card !== targetCard) card.classList.add("hidden");
      });

      targetCard.classList.add("fullscreen-card");
      targetCard.style.display = "block";

      document.querySelector(".your-moods-section")?.classList.add("hidden");
      document.querySelector(".create-mood")?.classList.add("hidden");
      document.getElementById("emptyPlaceholder")?.classList.add("hidden");
      document.querySelectorAll(".section-title").forEach(el => el.classList.add("hidden"));

      backButton.style.display = "block";
    };

    requestAnimationFrame(tryShowMood);

    backButton.addEventListener("click", () => {
      document.querySelectorAll(".playlist-card").forEach(c => {
        c.classList.remove("fullscreen-card", "hidden");
        c.style.display = "";
      });

      document.querySelector(".your-moods-section")?.classList.remove("hidden");
      document.querySelector(".create-mood")?.classList.remove("hidden");
      document.getElementById("emptyPlaceholder")?.classList.remove("hidden");
      document.querySelectorAll(".section-title").forEach(el => el.classList.remove("hidden"));

      backButton.style.display = "none";

      const url = new URL(window.location);
      url.searchParams.delete("mood");
      window.history.replaceState({}, document.title, url.pathname);
    });
  }
});