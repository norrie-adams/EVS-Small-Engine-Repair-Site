document.querySelector("form").addEventListener("submit", function (e) {
    e.preventDefault();

    document.querySelector(".form-container").style.display = "none";

    document.querySelector(".message").textContent =
        "Thanks, we will get back to you soon!";
});