let backDrop;
let class_list;
let countEnable = 0;

const root = document.body;
const menuBtn = root.querySelector(".menu-btn");
const socialBtn = root.querySelector(".globe");

document.addEventListener("DOMContentLoaded", () => {
    navBtnToggle();
    themeControl();
    socialBtnToggle();
});

function navBtnToggle() {
    const navContainer = root.querySelector(".nav-links-box");
    menuBtn.addEventListener("click", () => {
        menuBtn.classList.toggle("close");
        navContainer.classList.toggle("show-nav-links-box");
        root.classList.toggle("m-C");
    });
}

function socialBtnToggle() {
    const socialContainer = root.querySelector(".social-links-list");

    socialBtn.addEventListener("click", () => {
        if (!socialBtn.classList.contains("on-social")) {
            socialBtn.classList.add("on-social");
            socialContainer.classList.add("show");
            createBackDrop();
            disableAllXOne(socialBtn, root.querySelectorAll("button"));
            backDrop.addEventListener("click", () => {
                socialBtn.classList.remove("on-social");
                socialContainer.classList.remove("show");
                enableAll(root.querySelectorAll("button"));
                removeBackDrop();
            });
        } else {
            socialBtn.classList.remove("on-social");
            socialContainer.classList.remove("show");
            enableAll(root.querySelectorAll("button"));
            removeBackDrop();
        }
    });
}

function themeControl() {
    const moon = root.querySelector(".moon");
    const themeList = root.querySelector(".theme-list");
    const themeItems = root.querySelectorAll(".theme-item");

    moon.addEventListener("click", () => {
        if (!moon.classList.contains("close")) {
            moon.classList.add("close");
            themeList.classList.add("show-theme-list");
            createBackDrop();
            disableAllXOne(moon, root.querySelectorAll("button"));
            backDrop.addEventListener("click", () => {
                moon.classList.remove("close");
                themeList.classList.remove("show-theme-list");
                enableAll(root.querySelectorAll("button"));
                removeBackDrop(root.querySelectorAll("button"));
            });
        } else {
            moon.classList.remove("close");
            enableAll(root.querySelectorAll("button"));
            themeList.classList.remove("show-theme-list");
            removeBackDrop();
        }
    });
    themeItems.forEach((element) => {
        element.addEventListener("click", (e) => {
            class_list = [];
            root.classList.forEach((value) => {
                if (value !== "m-C") {
                    class_list.push(value);
                }
            });
            clearClass(root, class_list);
            switch (e.currentTarget.id) {
                case "dark_knight":
                    root.className = "dark-knight";
                    break;
                case "blue_hero":
                    root.className = "blue-hero";
                    break;
                case "day_walker":
                    root.className = "";
                    break;
                default:
                    break;
            }
            console.log(root.classList);
            console.log(class_list);
        });
    });
}

function disableToggleElemets(theOne, All) {
    if (countEnable === 0) {
        disableAllXOne(theOne, All);
        countEnable = 1;
    } else if (countEnable === 1) {
        enableAll(All);
        countEnable = 0;
    }
}

function disableAllXOne([theOne], All) {
    All.forEach((element) => {
        if (element !== theOne) {
            element.disabled = true;
        }
    });
}

function enableAll(All) {
    All.forEach((element) => {
        element.disabled = false;
    });
}

function clearClass(element, list) {
    list.forEach((val) => {
        element.classList.remove(val);
    });
}

function createBackDrop() {
    if (backDrop) return;

    backDrop = document.createElement("div");
    backDrop.className = "back-drop";

    root.append(backDrop);
}

function removeBackDrop() {
    backDrop.remove();
    backDrop = null;
}
