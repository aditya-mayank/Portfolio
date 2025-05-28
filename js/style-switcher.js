const styleSwitcherToggle = document.querySelector(".style-switcher-toggler");
styleSwitcherToggle.addEventListener("click", () => {
    document.querySelector(".style-switcher").classList.toggle("open");
});

// Hide style switcher on scroll
const styleSwitcher = document.querySelector(".style-switcher");

function closeStyleSwitcherIfOpen(event) {
    if (styleSwitcher.classList.contains("open") && !styleSwitcher.contains(event.target)) {
        styleSwitcher.classList.remove("open");
    }
}

window.addEventListener("mousewheel", () => {
    if (styleSwitcher.classList.contains("open")) {
        styleSwitcher.classList.remove("open");
    }
});

document.addEventListener("touchstart", closeStyleSwitcherIfOpen);
document.addEventListener("click", closeStyleSwitcherIfOpen);

const alternateStyles = document.querySelectorAll(".alternate-style");

function setActiveStyle(color) {
    alternateStyles.forEach((style) => {
        if (color === style.getAttribute("title")) {
            style.removeAttribute("disabled");
            // Save the selected style to localStorage
            localStorage.setItem("selectedStyle", color);
        } else {
            style.setAttribute("disabled", "true");
        }
    });
}

// Theme toggler
const dayNight = document.querySelector(".day-night");
dayNight.addEventListener("click", () => {
    dayNight.querySelector("i").classList.toggle("fa-sun");
    dayNight.querySelector("i").classList.toggle("fa-moon");
    document.body.classList.toggle("dark");
    
    // Save the current theme to localStorage
    const theme = document.body.classList.contains("dark") ? "dark" : "light";
    localStorage.setItem("theme", theme);
});

// On page load, read the saved theme and apply it
window.addEventListener("load", () => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
        document.body.classList.add("dark");
        dayNight.querySelector("i").classList.remove("fa-moon");
        dayNight.querySelector("i").classList.add("fa-sun");
    } else {
        document.body.classList.remove("dark");
        dayNight.querySelector("i").classList.remove("fa-sun");
        dayNight.querySelector("i").classList.add("fa-moon");
    }

    // Apply the saved style on page load
    const savedStyle = localStorage.getItem("selectedStyle");
    if (savedStyle) {
        setActiveStyle(savedStyle); // Apply the saved style
    }
});
