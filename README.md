# GitHub User Search App

A responsive web application that allows users to search for GitHub profiles by username. This project strictly follows a given UI design, supports light/dark mode, and adapts beautifully across all screen sizes.

## 🔍 Demo

👉 [Live preview](https://carvalhovincent.github.io/GitHub-user-search-app/)

## 🎯 Objective

Recreate the provided UI design into a fully functional GitHub user search web app using:

- API integration
- Modular SCSS with BEM
- JavaScript (ES6+)
- Theme toggling (light/dark)
- Responsive layout

---

## 📦 Technologies Used

- **HTML5**
- **SCSS** with:
  - `$variables`
  - `@mixin`
  - Nesting
  - `@extend`
  - BEM naming convention
- **JavaScript (ES6+)**
- **GitHub API** via `fetch()`

---

## ⚙️ Features

- 🔍 Search GitHub users by username
- 📄 Display profile info:
  - Avatar
  - Name
  - Bio
  - Location
  - Repositories
  - Followers / Following
- ❌ Error message if user not found
- 🌗 Toggle between light and dark mode (saved in `localStorage`)
- 📱 Fully responsive for desktop, tablet, and mobile
- 🖱️ Clear hover states for all interactive elements

---

## 📡 API Used

GitHub REST API  
**Endpoint**: `https://api.github.com/users/{username}`


