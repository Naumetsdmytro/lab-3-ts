interface Category {
  id: number;
  name: string;
  shortname: string;
  notes: string;
}

interface Item {
  id: number;
  name: string;
  shortname: string;
  description: string;
  price: number;
}

interface CategoriesResponse {
  categories: Category[];
}

interface CategoryResponse {
  categoryName: string;
  items: Item[];
}

async function fetchJSON<T>(url: string): Promise<T> {
  const res: Response = await fetch(url);
  return res.json() as Promise<T>;
}

async function showCategory(shortname: string, title: string): Promise<void> {
  const data = await fetchJSON<CategoryResponse>(`data/${shortname}.json`);
  const content = document.getElementById("content") as HTMLElement;

  content.innerHTML = `<h2>${title}</h2><div class="items-grid"></div>`;
  const grid = content.querySelector(".items-grid") as HTMLElement;

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

async function showCatalog(): Promise<void> {
  const data = await fetchJSON<CategoriesResponse>("data/categories.json");
  const content = document.getElementById("content") as HTMLElement;

  content.innerHTML = "<h2>Каталог</h2><ul class='category-list'></ul>";
  const list = content.querySelector(".category-list") as HTMLUListElement;

  for (const cat of data.categories) {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = "#";
    a.textContent = cat.name;
    a.addEventListener("click", (e: MouseEvent) => {
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
  specialsLink.addEventListener("click", (e: MouseEvent) => {
    e.preventDefault();
    const cat: Category = data.categories[Math.floor(Math.random() * data.categories.length)];
    showCategory(cat.shortname, cat.name);
  });
  specials.appendChild(specialsLink);
  list.appendChild(specials);
}

document.addEventListener("DOMContentLoaded", (): void => {
  const navCatalog = document.getElementById("nav-catalog") as HTMLAnchorElement;
  navCatalog.addEventListener("click", (e: MouseEvent) => {
    e.preventDefault();
    showCatalog();
  });
});
