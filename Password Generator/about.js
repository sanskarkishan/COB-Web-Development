document.addEventListener("DOMContentLoaded", function() {
    const homeButton = document.querySelector('nav ul li:nth-child(1) a');
    const aboutButton = document.querySelector('nav ul li:nth-child(2) a');

    // Highlight About button as active (blue) by default on the About page
    aboutButton.classList.add('active');
    homeButton.classList.remove('active');

    // Redirect to Home page when Home button is clicked
    homeButton.addEventListener("click", function(event) {
        event.preventDefault();
        window.location.href = "index.html";
    });
});
