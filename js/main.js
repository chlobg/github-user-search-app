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
  locationEl.textContent = data.location || "Not Available";
  twitter.textContent = data.twitter_username || "Not Available";
  blog.textContent = data.blog || "Not Available";
  blog.href = data.blog || "#";
  company.textContent = data.company || "Not Available";
}

function showError(show = true) {
  searchError.style.display = show ? "block" : "none";
}

function getData() {
  const username = searchInput.value.trim();
  if (!username) return;

  fetch(`https://api.github.com/users/${username}`)
    .then((res) => {
      if (!res.ok) {
        throw new Error("User not found");
      }
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

function toggleTheme() {
  document.body.classList.toggle("dark");
  const darkMode = document.body.classList.contains("dark");
  localStorage.setItem("devfinder-theme", darkMode ? "dark" : "light");
  themeText.textContent = darkMode ? "LIGHT" : "DARK";
  themeIcon.src = darkMode ? "./assets/icon-sun.svg" : "./assets/icon-moon.svg";
}

function initTheme() {
  const saved = localStorage.getItem("devfinder-theme");
  if (saved === "dark") {
    document.body.classList.add("dark");
  }
  toggleTheme(); // to set text + icon
  toggleTheme();
}

// ========== Event Listeners ==========
themeToggle.addEventListener("click", toggleTheme);
searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") getData();
});

// ========== Init ==========
initTheme();
getData("octocat");
