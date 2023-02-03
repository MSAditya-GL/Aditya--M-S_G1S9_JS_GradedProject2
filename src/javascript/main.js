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

//function for display the prev and next btn
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

//function for load the data 
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
            `<p class="details"><b>${key}</b>: ${d["work"][key]}</p>`
    ).join('')}</div>`;

    projects.innerHTML = `<p class="details"><b>
                          ${d["projects"]["name"]}</b>:${d["projects"]["description"]}
                          </p>`;

    education.innerHTML = `<ul>${Object.keys(d["education"])
        .map((education) =>
            `<li><b>${education}:</b> ${Object.keys(
                d["education"][education]
            )
                .map((Key) =>
                    `<span> ${d["education"][education][Key]}</span>`
                )}</li>`
        ).join('')}</ul>`;

    intern.innerHTML = `<ul>${Object.keys(d["Internship"])
        .map((key) =>
            `<li><b>${key}</b>: ${d["Internship"][key]}</li>`
        ).join('')}</ul>`;

    achievements.innerHTML = `<ul>${d["achievements"]["Summary"]
        .map((achievements) => `<li>${achievements}</li>`).join('')}</ul>`;
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

// search/filter the applicant data based on Post applied
const searchResult = () => {
    if (resume.length > 0) {
        searchNotFound.style.display = "none";
        searchFound.style.display = "block";
    } else {
        searchNotFound.style.display = "flex";
        searchFound.style.display = "none"
    }
}

//function for viewing next resume
function nextApplication() {
    ++current_Index;
    d = resume[current_Index];
    loadData();
    btnDisplay();
}

//function for viewing prev resume
function prevApplication() {
    --current_Index;
    d = resume[current_Index];
    loadData();
    btnDisplay();
}

next_btn.addEventListener("click", nextApplication);
prev_btn.addEventListener("click", prevApplication);

//function for search the resume while on input event fires 
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
