import { SKILLS, PROJECTS } from "./DATALIST.js";

let backDrop;
let class_list;

const root = document.body;

function navBtnToggle() {
    const menuBtn = root.querySelector(".menu-btn");
    const navContainer = root.querySelector(".nav-links-box");

    menuBtn.addEventListener("click", () => {
        menuBtn.classList.toggle("close");
        navContainer.classList.toggle("show-nav-links-box");
        root.classList.toggle("m-C");
    });
}

function socialBtnToggle() {
    const socialBtn = root.querySelector(".globe");
    const socialContainer = root.querySelector(".social-links-list");

    socialBtn.addEventListener("click", () => {
        if (!socialBtn.classList.contains("on-social")) {
            socialBtn.classList.add("on-social");
            socialContainer.classList.add("show");
            socialBtn.parentElement.classList.add("z-over");
            root.parentElement.classList.add("z-below");
            createBackDrop();
            backDrop.addEventListener("click", () => {
                socialBtn.classList.remove("on-social");
                socialContainer.classList.remove("show");
                root.parentElement.classList.remove("z-below");
                socialBtn.parentElement.classList.remove("z-over");
                removeBackDrop();
            });
        } else {
            socialBtn.classList.remove("on-social");
            socialContainer.classList.remove("show");
            root.parentElement.classList.remove("z-below");
            socialBtn.parentElement.classList.remove("z-over");
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
            moon.parentElement.classList.add("z-over");
            root.parentElement.classList.add("z-below");

            createBackDrop();
            backDrop.addEventListener("click", () => {
                moon.classList.remove("close");
                themeList.classList.remove("show-theme-list");
                moon.parentElement.classList.remove("z-over");
                root.parentElement.classList.remove("z-below");
                removeBackDrop();
            });
        } else {
            moon.classList.remove("close");
            themeList.classList.remove("show-theme-list");
            moon.parentElement.classList.remove("z-over");
            root.parentElement.classList.remove("z-below");
            removeBackDrop();
        }
    });
    themeItems.forEach((element) => {
        element.addEventListener("click", (e) => {
            class_list = [];
            root.classList.forEach((value) => {
                if (value !== "m-C") {
                    class_list.push(value);
                    root.classList.remove(value);
                }
            });
            clearClass(root, class_list);
            switch (e.currentTarget.id) {
                case "dark_knight":
                    root.classList.add("dark-knight");
                    break;
                case "blue_hero":
                    root.classList.add("blue-hero");
                    break;
                case "day_walker":
                    root.classList.add("day-walker");
                    break;
                default:
                    break;
            }
        });
    });
}

function addSkills() {
    const skillsContainer = root.querySelector(".skC");

    SKILLS.forEach((value) => {
        let skillCard = document.createElement("div");
        skillCard.innerHTML = skillMarkUp(value);
        skillCard.classList.add(
            "skillModal",
            "modal-card",
            "t-card",
            "inverse",
            "box-rad-8",
            "animated",
            "slideInUp"
        );

        skillsContainer.appendChild(skillCard);
    });
}

function skillMarkUp(item) {
    return `
        <div class="contanier u-flex f-col ali-items-cent just-cont-cent">
            <div class="skil-img img-box">
                <img src="${item.img}" alt="${item.key}" />
            </div>
            <div class="skill-description sub-pad-up">
                <div class="title set-relative">
                    <h3>
                        ${item.value}
                    </h3>
                </div>
                <div class="desrc">
                    <h4>
                        <span>Proficiency:</span>
                        <input type="range" name="skill-range" id="skrange" value="${item.skillLevel}" disabled/>
                    </h4>
                </div>
            </div>
        </div>
    `;
}

function addProjects() {
    const projectContainer = root.querySelector(".pmC");
    const projectFullInfo = root.querySelector(".pFullInfo");
    PROJECTS.forEach((value, index) => {
        let projectCard = document.createElement("div");
        projectCard.innerHTML = projectMarkUp(value);
        projectCard.classList.add(
            "projectModal",
            "modal-card",
            "t-card",
            "inverse",
            "box-shadow-5",
            "box-rad-8",
            "animated",
            "zoomIn"
        );
        projectCard.id = index;
        projectContainer.appendChild(projectCard);

        projectCard.addEventListener("dblclick", (e) => {
            let identity = e.currentTarget.id;
            projectFullInfo.classList.add("show");
            projectFullInfo.innerHTML = fullProjectMarkup(PROJECTS[identity]);
            createBackDrop();

            const closeBtn = projectFullInfo.querySelector(".close");
            const moveBtns = projectFullInfo.querySelectorAll(".move");
            const fImgBox = projectFullInfo.querySelector("#img-gal-change");

            const imgListNum = PROJECTS[identity].webViewImg.length - 1;
            const slide = ["slideInLeft", "slideInRight"];

            let count = 0;
            moveBtns.forEach((moveBtn, index) => {
                moveBtn.addEventListener("click", (e) => {
                    if (e.currentTarget.classList.contains("prev-btn")) {
                        if (count > 0) {
                            count--;
                        }
                    } else if (e.currentTarget.classList.contains("next-btn")) {
                        if (count < imgListNum) {
                            count++;
                        }
                    }

                    if (count <= 0) {
                        moveBtns[0].classList.add("hide");
                    } else if (count > 0) {
                        moveBtns[0].classList.remove("hide");
                    }

                    if (count < imgListNum && count > 0) {
                        moveBtns[1].classList.remove("hide");
                    } else if (count >= imgListNum) {
                        moveBtns[1].classList.add("hide");
                    }

                    fImgBox.innerHTML = `<img src="${PROJECTS[identity].webViewImg[count]}" alt=".." id="${PROJECTS[identity].key}" class="animated ${slide[index]}"/>`;
                });
            });

            closeBtn.addEventListener("click", resetAll);
            backDrop.addEventListener("click", resetAll);

            function resetAll() {
                projectFullInfo.innerHTML = "";
                projectFullInfo.classList.remove("show");
                removeBackDrop();
            }
        });
    });
}

function projectMarkUp(item) {
    return `
        <div class="contanier u-flex f-col ali-items-cent just-cont-cent">
            <div class="project-img img-box animated zoomIn">
                <img src="${item.previewImg}" alt="${
        item.id
    }" class="animated"/>
            </div>
            <div class="project-description sub-pad-up">
                <div class="title set-relative">
                    <h3>
                        ${item.title}
                    </h3>
                </div>
                <div class="desrc">
                    <p>
                        ${item.description.substring(
                            0,
                            35
                        )}...<strong>more</strong>
                    </p>
                </div>
                <div class="link u-flex just-cont-SB">
                    <button class="git">
                        <a href="${
                            item.link.git
                        }" target="_blank">GitHub Link</a>
                    </button>
                    ${
                        item.link.host &&
                        `<button class="host">
                            <a href="${item.link.host}" target="_blank">Website Link</a>
                        </button>`
                    }
                </div>
            </div>
        </div>
    `;
}

function fullProjectMarkup(item) {
    return `
        <div class="pop-screen u-flex f-col ali-items-cent big-gap">
            <div class="ptn-box u-flex">
                <button class="close">
                    <i class="fa fa-close"></i>
                </button>
            </div>
            <div class="img-box set-relative animated zoomIn">
                <button class="move prev-btn hide">
                    <i class="fa fa-arrow-left"></i>
                </button>
                <div class="img-container" id="img-gal-change">
                    <img src="${item.webViewImg[0]}" alt=".." class="animated"/>
                </div>
                <button class="move next-btn${
                    item.webViewImg.length === 1 ? " hide" : ""
                }">
                    <i class="fa fa-arrow-right"></i>
                </button>
            </div>
            <div class="description-box">
                <div class="title set-relative">
                    <h3>
                        ${item.title}
                    </h3>
                </div>
                <div class="desrc">
                    <p>
                        ${item.description}
                    </p>
                </div>
                <div class="link u-flex just-cont-SB">
                    <button class="git">
                        <a href="${
                            item.link.git
                        }" target="_blank">GitHub Link</a>
                    </button>
                    ${
                        item.link.host &&
                        `<button class="host">
                            <a href="${item.link.host}" target="_blank">Website Link</a>
                        </button>`
                    }
                </div>
            </div>
        </div>
    `;
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

export { navBtnToggle, socialBtnToggle, themeControl, addSkills, addProjects };
