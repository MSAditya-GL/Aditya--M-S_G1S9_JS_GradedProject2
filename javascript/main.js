//prevent back page loading
function preventBack() {
    window.history.pushState(null, "", window.location.href);
    window.onpopstate = function () {
        window.history.pushState(null, "", window.location.href);
    }
};
setTimeout("preventBack()", 0);

let loader = document.querySelector('.loader');

//Declare Global Variable
let current_Index = 0;
let resume = applicantData.resume;
let d = resume[current_Index];


//Declare DOM Object

let next_btn = document.querySelector("#next_btn");
let prev_btn = document.querySelector("#prev_btn");

let searchNotFound = document.querySelector(".searchNotFound");
let searchFound = document.querySelector(".searchFound");

let header = document.querySelector('.intro');
let personalInfo = document.querySelector('#personal');
let skill = document.querySelector('#skill');
let hobbies = document.querySelector('#hobbies');
let company_details = document.querySelector('.company_details')
let projects = document.querySelector('.projects');
let education = document.querySelector('.education');
let intern = document.querySelector('.intern');
let achievements = document.querySelector('.achievements');

const btnDisplay = () => {

    if (current_Index + 1 >= resume.length) {
        next_btn.style.display = "none";
    } else {
        next_btn.style.display = "block";
    }
    if (current_Index === 0) {
        prev_btn.style.display = "none";
    } else {
        prev_btn.style.display = "block";

    }
}

function loadData() {
    header.innerHTML = `<h2>${d.basics.name}</h1>
                <br>
                <h3>AppliedFor: ${d.basics.AppliedFor}</h3>`;

    personalInfo.innerHTML = `<li>${d.basics.phone}</li>
                            <li>${d.basics.email}</li>
                            <li><a href="${d.basics.profiles.url}">LinkedIn</a></li>`;

    loadSkills(d.skills.keywords);
    loadHobbies(d.interests.hobbies);
    company_details.innerHTML = `<div>${Object.keys(
        d["work"]
    ).map(
        (key) =>
            `<p class="innerDetail"><b>${key}</b>: ${d["work"][key]}</p>`
    )}</div>`.replaceAll(",", "");
    projects.innerHTML = `<p class="details"><b>${d["projects"]["name"]}</b>:${d["projects"]["description"]}</p>`;
    education.innerHTML = `<ul>${Object.keys(d["education"])
        .map((education) =>
            `<li><b>${education}:</b> ${Object.keys(
                d["education"][education]
            ).map((Key) =>
                `<span> ${d["education"][education][Key]}</span>`
            )}</li>`
        )}</ul>`.replaceAll(",", "");
    intern.innerHTML = `<ul>${Object.keys(d["Internship"])
        .map((key) =>
            `<li><b>${key}</b>: ${d["Internship"][key]}</li>`
        )}</ul>`.replaceAll(",", "");
    achievements.innerHTML = `<ul>${d["achievements"]["Summary"]
        .map((achievements) => `<li>${achievements}</li>`)}</ul>`.replaceAll(",", "");
}

function loadSkills(key) {
    let string = "";
    for (const skill of key) {
        string += `<li id='skill'>${skill}</li>`;
    }
    skill.innerHTML = string;
}

function loadHobbies(key) {
    let string = "";
    for (const hobby of key) {
        string += `<li id='hobbies'>${hobby}</li>`;
    }
    hobbies.innerHTML = string;
}

const searchResult = () => {
    if (resume.length > 0) {
        searchNotFound.style.display = "none";
        searchFound.style.display = "block";
    } else {
        searchNotFound.style.display = "flex";
        searchFound.style.display = "none"
    }
}


function nextApplication() {
    ++current_Index;
    d = resume[current_Index];
    loadData();
    btnDisplay();
}

function prevApplication() {
    --current_Index;
    d = resume[current_Index];
    loadData();
    btnDisplay();
}



next_btn.addEventListener("click", nextApplication);
prev_btn.addEventListener("click", prevApplication);



let input = document.querySelector('#input')
input.oninput = (e) => {
    current_Index = 0;
    let checkInput = e.target.value;

    if (checkInput.length > 0) {
        resume = applicantData["resume"].filter((details) => details["basics"]["AppliedFor"]
            .toLowerCase()
            .includes(checkInput.toLowerCase()));
    } else {
        resume = applicantData["resume"];
    }
    
    if (resume.length > 0) {
        d = resume[current_Index];
        loadData();
    }
    searchResult();
    btnDisplay();
    
}

searchResult();
loadData();
btnDisplay();
