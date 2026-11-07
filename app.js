const cars = [
  {
    id: "911",
    make: "Porsche",
    model: "911 Carrera",
    year: 2023,
    body: "Coupe",
    condition: "Certified",
    price: 186500000,
    mileage: "8,400 km",
    color: "GT Silver",
    image: "images/usman.jfif",
  },
  {
    id: "x5",
    make: "BMW",
    model: "X5 xDrive40i",
    year: 2024,
    body: "SUV",
    condition: "New",
    price: 98500000,
    mileage: "12 km",
    color: "Carbon Black",
    image: "images/2024-bmw-x5-5.webp",
  },
  {
    id: "sclass",
    make: "Mercedes-Benz",
    model: "S 500",
    year: 2022,
    body: "Sedan",
    condition: "Certified",
    price: 112000000,
    mileage: "21,000 km",
    color: "Obsidian",
    image:
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "model3",
    make: "Tesla",
    model: "Model 3 Long Range",
    year: 2024,
    body: "Sedan",
    condition: "New",
    price: 54000000,
    mileage: "18 km",
    color: "Pearl White",
    image:
      "https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "rx",
    make: "Lexus",
    model: "RX 350",
    year: 2023,
    body: "SUV",
    condition: "Certified",
    price: 72000000,
    mileage: "14,200 km",
    color: "Atomic Silver",
    image:
      "https://6ae485a308d55966def64bcb.imgix.net/sandbox/2023-lexus-rx_100854342_l.jpg",
  },
  {
    id: "camry",
    make: "Toyota",
    model: "Camry XSE",
    year: 2025,
    body: "Sedan",
    condition: "New",
    price: 24800000,
    mileage: "5 km",
    color: "Supersonic Red",
    image: "images/suraj.jfif",
  },
  {
    id: "ranger",
    make: "Ford",
    model: "Ranger Wildtrak",
    year: 2024,
    body: "Truck",
    condition: "New",
    price: 41500000,
    mileage: "40 km",
    color: "Cyber Orange",
    image: "images/2024-01-ford-ranger-wildtrak-v6hero-16x9-1.webp",
  },
  {
    id: "golf",
    make: "Volkswagen",
    model: "Golf GTI",
    year: 2021,
    body: "Hatchback",
    condition: "Certified",
    price: 19800000,
    mileage: "36,800 km",
    color: "Tornado Red",
    image:
      "https://images.unsplash.com/photo-1471444928139-48c5bf5173f8?auto=format&fit=crop&w=1200&q=80",
  },
];

const naira = new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
  maximumFractionDigits: 0,
});

const grid = document.getElementById("car-grid");
const countEl = document.getElementById("results-count");
const makeSelect = document.getElementById("filter-make");
const bodySelect = document.getElementById("filter-body");
const conditionSelect = document.getElementById("filter-condition");
const priceSelect = document.getElementById("filter-price");
const searchInput = document.getElementById("filter-search");
const modal = document.getElementById("car-modal");

[...new Set(cars.map((car) => car.make))].sort().forEach((make) => {
  const option = document.createElement("option");
  option.value = make;
  option.textContent = make;
  makeSelect.appendChild(option);
});

function filteredCars() {
  const maxPrice = Number(priceSelect.value) || Infinity;
  const query = searchInput.value.trim().toLowerCase();
  return cars.filter((car) => {
    const matchesMake = !makeSelect.value || car.make === makeSelect.value;
    const matchesBody = !bodySelect.value || car.body === bodySelect.value;
    const matchesCondition =
      !conditionSelect.value || car.condition === conditionSelect.value;
    const matchesPrice = car.price <= maxPrice;
    const haystack =
      `${car.make} ${car.model} ${car.year} ${car.color}`.toLowerCase();
    const matchesQuery = !query || haystack.includes(query);
    return (
      matchesMake &&
      matchesBody &&
      matchesCondition &&
      matchesPrice &&
      matchesQuery
    );
  });
}

function renderCars() {
  const list = filteredCars();
  countEl.textContent = `${list.length} vehicle${list.length === 1 ? "" : "s"} available`;
  grid.innerHTML = list
    .map(
      (car) => `
      <button type="button" class="car-card" data-id="${car.id}">
        <img src="${car.image}" alt="${car.year} ${car.make} ${car.model}" />
        <div class="card-body">
          <p class="eyebrow">${car.condition} · ${car.year}</p>
          <h3>${car.make} ${car.model}</h3>
          <p class="price">${naira.format(car.price)}</p>
          <p class="meta"><span>${car.body}</span><span>${car.mileage}</span><span>${car.color}</span></p>
        </div>
      </button>`,
    )
    .join("");
}

function openCar(id) {
  const car = cars.find((item) => item.id === id);
  if (!car) return;
  document.getElementById("modal-image").src = car.image;
  document.getElementById("modal-image").alt = `${car.make} ${car.model}`;
  document.getElementById("modal-tag").textContent =
    `${car.condition} · ${car.body}`;
  document.getElementById("modal-title").textContent =
    `${car.year} ${car.make} ${car.model}`;
  document.getElementById("modal-price").textContent = naira.format(car.price);
  document.getElementById("modal-specs").innerHTML = `
    <li>Mileage: ${car.mileage}</li>
    <li>Color: ${car.color}</li>
    <li>Condition: ${car.condition}</li>
  `;
  modal.hidden = false;
}

grid.addEventListener("click", (event) => {
  const card = event.target.closest(".car-card");
  if (card) openCar(card.dataset.id);
});

document.getElementById("modal-close").addEventListener("click", () => {
  modal.hidden = true;
});

modal.addEventListener("click", (event) => {
  if (event.target === modal) modal.hidden = true;
});

[
  "filter-make",
  "filter-body",
  "filter-condition",
  "filter-price",
  "filter-search",
].forEach((id) =>
  document.getElementById(id).addEventListener("input", renderCars),
);

function updateLoan() {
  const price = Number(document.getElementById("loan-price").value) || 0;
  const down = Number(document.getElementById("loan-down").value) || 0;
  const months = Number(document.getElementById("loan-term").value) || 1;
  const annual = Number(document.getElementById("loan-rate").value) || 0;
  const principal = Math.max(price - down, 0);
  const monthlyRate = annual / 100 / 12;
  const payment =
    monthlyRate === 0
      ? principal / months
      : (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -months));
  document.getElementById("loan-result").textContent =
    `Monthly: ${naira.format(payment || 0)}`;
}

document.getElementById("finance-form").addEventListener("input", updateLoan);

document.getElementById("contact-form").addEventListener("submit", (event) => {
  event.preventDefault();
  document.getElementById("form-status").textContent =
    "Request received. A sales advisor will call you within one business hour.";
  event.target.reset();
});

const themeToggle = document.getElementById("theme-toggle");
function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("mmc-theme", theme);
  themeToggle.textContent = theme === "dark" ? "Light" : "Dark";
}
applyTheme(document.documentElement.getAttribute("data-theme") || "dark");
themeToggle.addEventListener("click", () => {
  applyTheme(
    document.documentElement.getAttribute("data-theme") === "dark"
      ? "light"
      : "dark",
  );
});

const nav = document.getElementById("site-nav");
document.getElementById("menu-btn").addEventListener("click", () => {
  nav.classList.toggle("open");
});
nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => nav.classList.remove("open"));
});

renderCars();
updateLoan();
