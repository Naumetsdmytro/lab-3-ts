"use strict";
async function fetchJSON(url) {
    const res = await fetch(url);
    return res.json();
}
async function showCategory(shortname, title) {
    const data = await fetchJSON(`data/${shortname}.json`);
    const content = document.getElementById("content");
    content.innerHTML = `<h2>${title}</h2><div class="items-grid"></div>`;
    const grid = content.querySelector(".items-grid");
    for (const item of data.items) {
        const card = document.createElement("div");
        card.className = "item-card";
        card.innerHTML = `
      <img src="https://placehold.co/160x160?text=${encodeURIComponent(item.shortname)}" alt="${item.name}">
      <h3>${item.name}</h3>
      <p>${item.description}</p>
      <span class="price">${item.price} ₴</span>
    `;
        grid.appendChild(card);
    }
}
async function showCatalog() {
    const data = await fetchJSON("data/categories.json");
    const content = document.getElementById("content");
    content.innerHTML = "<h2>Каталог</h2><ul class='category-list'></ul>";
    const list = content.querySelector(".category-list");
    for (const cat of data.categories) {
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.href = "#";
        a.textContent = cat.name;
        a.addEventListener("click", (e) => {
            e.preventDefault();
            showCategory(cat.shortname, cat.name);
        });
        li.appendChild(a);
        list.appendChild(li);
    }
    const specials = document.createElement("li");
    const specialsLink = document.createElement("a");
    specialsLink.href = "#";
    specialsLink.textContent = "Specials";
    specialsLink.addEventListener("click", (e) => {
        e.preventDefault();
        const cat = data.categories[Math.floor(Math.random() * data.categories.length)];
        showCategory(cat.shortname, cat.name);
    });
    specials.appendChild(specialsLink);
    list.appendChild(specials);
}
document.addEventListener("DOMContentLoaded", () => {
    const navCatalog = document.getElementById("nav-catalog");
    navCatalog.addEventListener("click", (e) => {
        e.preventDefault();
        showCatalog();
    });
});
