const yearElement = document.querySelector("#currentyear");
const lastModifiedElement = document.querySelector("#lastmodified");

const today = new Date();
yearElement.textContent = today.getFullYear();

lastModifiedElement.textContent = `Last Modification: ${document.lastModified}`;