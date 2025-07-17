// ========== DOM Elements ==========
const themeToggle = document.getElementById("theme-toggle");
const themeText = document.getElementById("theme-text");
const themeIcon = document.getElementById("theme-icon");
const searchInput = document.getElementById("search");
const searchError = document.getElementById("search-err");

const avatar = document.getElementById("avatar");
const name = document.getElementById("name");
const username = document.getElementById("username");
const joined = document.getElementById("joined");
const bio = document.getElementById("obj-bio");
const repos = document.getElementById("repos");
const followers = document.getElementById("followers");
const following = document.getElementById("following");
const locationEl = document.getElementById("location");
const twitter = document.getElementById("twitter");
const blog = document.getElementById("blog");
const company = document.getElementById("company");

// ========== Functions ==========
function formatDate(dateString) {
  const options = { day: "numeric", month: "short", year: "numeric" };
  return new Date(dateString).toLocaleDateString("en-GB", options);
}

function updateUserData(data) {
  avatar.src = data.avatar_url;
  name.textContent = data.name || data.login;
  username.textContent = `@${data.login}`;
  username.href = data.html_url;
  joined.textContent = `Joined ${formatDate(data.created_at)}`;
  bio.textContent = data.bio || "This profile has no bio";
  repos.textContent = data.public_repos;
  followers.textContent = data.followers;
  following.textContent = data.following;
  setTextOrUnavailable(locationEl, data.location);
  setTextOrUnavailable(twitter, data.twitter_username);
  setTextOrUnavailable(company, data.company);

  const listItem2 = document.getElementById("list-item2");

  if (!data.blog) {
    blog.textContent = "Not Available";
    blog.href = "#";
    blog.classList.add("not-available");
    listItem2.classList.add("opacity");
  } else {
    blog.textContent = data.blog;
    blog.href = data.blog;
    blog.classList.remove("not-available");
    listItem2.classList.remove("opacity");
  }
}

function showError(show = true) {
  searchError.style.display = show ? "block" : "none";
}

function setTextOrUnavailable(el, text) {
  const parent = el.closest("li");

  if (!text) {
    el.textContent = "Not Available";
    el.classList.add("not-available");
    if (parent) parent.classList.add("opacity");
  } else {
    el.textContent = text;
    el.classList.remove("not-available");
    if (parent) parent.classList.remove("opacity");
  }
}

function getData(username = "octocat") {
  fetch(`https://api.github.com/users/${username}`)
    .then((res) => {
      if (!res.ok) throw new Error("User not found");
      return res.json();
    })
    .then((data) => {
      updateUserData(data);
      showError(false);
    })
    .catch(() => {
      showError(true);
    });
}

function applyTheme(theme) {
  const html = document.documentElement;
  if (theme === "dark") {
    html.classList.add("dark");
    themeText.textContent = "LIGHT";
    themeIcon.src = "./assets/icon-sun.svg";
  } else {
    html.classList.remove("dark");
    themeText.textContent = "DARK";
    themeIcon.src = "./assets/icon-moon.svg";
  }
  localStorage.setItem("devfinder-theme", theme);
}

function toggleTheme() {
  const isDark = document.documentElement.classList.contains("dark");
  const newTheme = isDark ? "light" : "dark";
  applyTheme(newTheme);
}

function initTheme() {
  const savedTheme = localStorage.getItem("devfinder-theme") || "dark";
  applyTheme(savedTheme);
}

// ========== Event Listeners ==========
themeToggle.addEventListener("click", toggleTheme);

searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") getData(searchInput.value.trim());
});

const searchBtn = document.getElementById("search-btn");
searchBtn.addEventListener("click", () => {
  const username = searchInput.value.trim();
  if (username) {
    getData(username);
  }
});
// ========== Init ==========
initTheme();
getData();
