import * as func from "./content/FUNCTION.js";

document.addEventListener("DOMContentLoaded", () => {
    window.location.replace("https://dantolu33.vercel.app/");
});

//document.addEventListener("DOMContentLoaded", () => {    
//    if(confirm("Do you want to be redirected to my new portfolio") === true)
//       window.location.replace("https://dantolu33.vercel.app/");
//    else{
//       docum.querySelector(".banner-section").classList.add("bounceInDown");
//        fixN//avHeader();
//        func.n//avBtnToggle();
//        func.the//meControl();
//        func.socia//lBtnToggle();
//        func.addSkills();
//        func.addProj//ects();
//        scrollEffect();
//        scrollTo(//);
//    }
//});

let sections = document.querySelectorAll("section.other");
let position;
let stylesA = ["bounceInDown", "slideInUp", "zoomIn"];

window.addEventListener("scroll", () => {
    scrollEffect();
    fixNavHeader();
});

window.addEventListener("reload", () => {
    scrollEffect();
    fixNavHeader();
});

function scrollEffect() {
    position = window.scrollY;

    sections.forEach((section, index) => {
        if (position >= section.offsetTop - 80) {
            section.children[1].classList.remove("hideF");
            section.children[1].classList.add("showF", stylesA[0]);
        } else {
            section.children[1].classList.add("hideF");
            section.children[1].classList.remove("showF", stylesA[0]);
        }
    });
}

function fixNavHeader() {
    let header = document.querySelector("header");
    position = window.scrollY;
    if (position > header.getBoundingClientRect().bottom) {
        header.children[0].classList.add(
            "fixed-element-top",
            "inverse",
            "box-shadow-5-w"
        );
    } else {
        header.children[0].classList.remove(
            "fixed-element-top",
            "inverse",
            "box-shadow-5-w"
        );
    }
}

function scrollTo() {
    let header = document.querySelector("header");
    let headerHeight = header.getBoundingClientRect().height;
    let nav_links = document.querySelectorAll(".nav-link");
    let nav_linksBox = document.querySelector(".nav-links-box");
    let nav_btn = document.querySelector(".bars.menu-btn");

    nav_links.forEach((nav_link) => {
        nav_link.addEventListener("click", (e) => {
            e.preventDefault();
            let id = e.currentTarget.getAttribute("href");

            let elementLinkPositionTop = document.querySelector(id).offsetTop;
            let position = elementLinkPositionTop - headerHeight;

            if (nav_linksBox.classList.contains("show-nav-links-box")) {
                nav_linksBox.classList.remove("show-nav-links-box");
                nav_btn.classList.remove("close");
            }

            window.scrollTo({
                top: position,
                left: 0,
            });
        });
    });
}
