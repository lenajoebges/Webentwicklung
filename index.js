document.addEventListener("DOMContentLoaded", function () {
    const moodButtons = document.querySelectorAll(".mood-btn");

    moodButtons.forEach(button => {
        button.addEventListener("click", function () {
            const url = new URL(button.href);
            const selectedMood = url.searchParams.get("mood");

            localStorage.setItem("lastMood", selectedMood);

            button.classList.add("clicked");
            setTimeout(() => button.classList.remove("clicked"), 200);
        });
    });
});
