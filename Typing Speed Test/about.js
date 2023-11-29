//Navigation buttons redirection
document.addEventListener("DOMContentLoaded",function(){
    const homeButton = document.querySelector('nav ul li:nth-child(1) a');
    const aboutButton = document.querySelector('nav ul li:nth-child(2) a');

    // Highlight Home button as active (blue) by default on the Home page
    homeButton.classList.add('active');
    aboutButton.classList.remove('active');

    // Redirect to About page when About button is clicked
    aboutButton.addEventListener("click", function(event) {
        event.preventDefault();
        window.location.href = "about.html";
    });
});