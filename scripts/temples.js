// currentyear and lastModified are used in the footer to display the current year and the last modification date of the document, respectively. mainNav is the navigation element that will be toggled when the hamburger button is clicked. hamButton is the button that will trigger the toggle of the navigation menu.
const currentYearSpan = document.getElementById("currentyear");
const lastModifiedParagraph = document.getElementById("lastModified");
const mainNav = document.querySelector(".navigation");
const hamButton = document.querySelector("#menu");

// automatically update the year in the footer and display the last modification date of the document
currentYearSpan.textContent = new Date().getFullYear();
lastModifiedParagraph.textContent = `Last Modification: ${document.lastModified}`;

// logic for the hamburger menu to toggle the navigation menu on smaller screens
hamButton.addEventListener("click", () => {
    mainNav.classList.toggle("open");
    hamButton.classList.toggle("open");
});