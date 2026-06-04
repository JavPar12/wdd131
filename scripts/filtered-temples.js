// 1. Array of Temple Objects populated with valid live internet URLs
const temples = [
  {
    templeName: "Aba Nigeria",
    location: "Aba, Nigeria",
    dedicated: "2005, August, 7",
    area: 11500,
    imageUrl: "https://www.churchofjesuschrist.org/imgs/7210c09be95c4474772ae52e5f31c23c08112784/full/640%2C/0/default"
  },
  {
    templeName: "Manti Utah",
    location: "Manti, Utah, United States",
    dedicated: "1888, May, 21",
    area: 74792,
    imageUrl: "https://www.churchofjesuschrist.org/imgs/d9c313eb96c173d0ad32f21f461ce994129c9e8d/full/640%2C/0/default"
  },
  {
    templeName: "Payson Utah",
    location: "Payson, Utah, United States",
    dedicated: "2015, June, 7",
    area: 96630,
    imageUrl: "https://www.churchofjesuschrist.org/imgs/7b998062094c11eca393eeeeac1e50df07c8fd34/full/640%2C/0/default"
  },
  {
    templeName: "Yigo Guam",
    location: "Yigo, Guam",
    dedicated: "2020, May, 2",
    area: 6861,
    imageUrl: "https://www.churchofjesuschrist.org/imgs/9f541175bcfc11eca77eeeeeac1ea52488fbff2f/full/640%2C/0/default"
  },
  {
    templeName: "Washington D.C.",
    location: "Kensington, Maryland, United States",
    dedicated: "1974, November, 19",
    area: 156558,
    imageUrl: "https://churchofjesuschrist.org/imgs/9bbc2a18ee4b11eb90efeeeeac1e68824aabff60/full/640%2C/0/default"
  },
  {
    templeName: "Lima Perú",
    location: "Lima, Perú",
    dedicated: "1986, January, 10",
    area: 9600,
    imageUrl: "https://www.churchofjesuschrist.org/imgs/b800f5245ce311fb987aabd6ee6b2230b7c8b04f/full/640%2C/0/default"
  },
  {
    templeName: "Mexico City Mexico",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    imageUrl: "https://www.churchofjesuschrist.org/imgs/2dbb637a01da374959e9b50dd072294645917ea4/full/640%2C/0/default"
  },
  {
    templeName: "Guadalajara Mexico",
    location: "Guadalajara, Jalisco, Mexico",
    dedicated: "2001, April, 29",
    area: 10700,
    imageUrl: "https://www.churchofjesuschrist.org/imgs/a1fb15c2f9532c712eaa069cdfd9d23c63f910d9/full/640%2C/0/default"
  },
  {
    templeName: "Colonia Juarez Chihuahua Mexico",
    location: "Colonia Juarez, Chihuahua, Mexico",
    dedicated: "1999, March, 6",
    area: 6800,
    imageUrl: "https://www.churchofjesuschrist.org/imgs/9130468c8099ce6d57d408945a4d94ebc97d969a/full/640%2C/0/default"
  },
  {
    templeName: "Sao Paulo Brazil",
    location: "São Paulo, Brazil",
    dedicated: "1978, October, 30",
    area: 59246,
    imageUrl: "https://www.churchofjesuschrist.org/imgs/940f3e201364433a3d5d3dc14b0cacee38d41d1d/full/640%2C/0/default"
  }
];

// 2. Select DOM layout container nodes
const gridContainer = document.querySelector(".res-grid");
const filterTitle = document.querySelector("#filter-title");
const hamburgerButton = document.querySelector("#menu");
const navigationMenu = document.querySelector(".navigation");

// 3. Toggle mobile navigation menu logic
if (hamburgerButton && navigationMenu) {
  hamburgerButton.addEventListener("click", () => {
    navigationMenu.classList.toggle("show");
    hamburgerButton.classList.toggle("show");
  });
}

// Helper function to auto-close menu when a link is clicked on mobile view
function closeMenu() {
  if (navigationMenu && hamburgerButton) {
    navigationMenu.classList.remove("show");
    hamburgerButton.classList.remove("show");
  }
}

// 4. Dynamic function block to render template cards onto the DOM
function displayTemples(filteredTemples) {
  gridContainer.innerHTML = ""; 
  
  filteredTemples.forEach(temple => {
    const card = document.createElement("section");
    card.classList.add("temple-card");
    
    card.innerHTML = `
      <h3>${temple.templeName}</h3>
      <p><span>Location:</span> ${temple.location}</p>
      <p><span>Dedicated:</span> ${temple.dedicated}</p>
      <p><span>Area:</span> ${temple.area.toLocaleString()} sq ft</p>
      <img src="${temple.imageUrl}" alt="${temple.templeName} Temple" loading="lazy" width="400" height="250">
    `;
    
    gridContainer.appendChild(card);
  });
}

// 5. Initial draw setup stream execution on initial window load
displayTemples(temples);

// 6. Filtering listeners mapped to anchor click interactions
document.querySelector("#home").addEventListener("click", (e) => {
  e.preventDefault();
  filterTitle.textContent = "Home";
  displayTemples(temples);
  closeMenu();
});

document.querySelector("#old").addEventListener("click", (e) => {
  e.preventDefault();
  filterTitle.textContent = "Old Temples (Built before 1900)";
  displayTemples(temples.filter(temple => parseInt(temple.dedicated.split(",")[0]) < 1900));
  closeMenu();
});

document.querySelector("#new").addEventListener("click", (e) => {
  e.preventDefault();
  filterTitle.textContent = "New Temples (Built after 2000)";
  displayTemples(temples.filter(temple => parseInt(temple.dedicated.split(",")[0]) > 2000));
  closeMenu();
});

document.querySelector("#large").addEventListener("click", (e) => {
  e.preventDefault();
  filterTitle.textContent = "Large Temples (Over 90,000 sq ft)";
  displayTemples(temples.filter(temple => temple.area > 90000));
  closeMenu();
});

document.querySelector("#small").addEventListener("click", (e) => {
  e.preventDefault();
  filterTitle.textContent = "Small Temples (Under 10,000 sq ft)";
  displayTemples(temples.filter(temple => temple.area < 10000));
  closeMenu();
});

// 7. Dynamic footer information injections
document.getElementById("currentyear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;