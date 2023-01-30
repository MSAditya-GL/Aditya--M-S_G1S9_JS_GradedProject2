let current_Index = 0;
let resume = applicantData.resume;
let d = resume[current_Index];

let main = document.querySelector(".main");
let next_btn = document.querySelector("#next_btn");
let prev_btn = document.querySelector("#prev_btn");

prev_btn.style.display = "none";

function nextApplication() {
    ++current_Index;
   
    if (current_Index >= resume.length) {
        next_btn.style.display = "none";
    } else {
        next_btn.style.display = "block";
        prev_btn.style.display = "block";
        d = resume[current_Index];
        loadData();
    }

}

function prevApplication() {
    --current_Index;

    if (current_Index < 0) {
        prev_btn.style.display = "none";

    } else {
        prev_btn.style.display = "block";
        next_btn.style.display = "block";
        d = resume[current_Index];
        loadData();
    }
}

next_btn.addEventListener("click", nextApplication);
prev_btn.addEventListener("click", prevApplication);

let header = document.querySelector('.intro');
let personalInfo = document.querySelector('#personal');
let skill = document.querySelector('#skill');
let hobbies = document.querySelector('#hobbies');
let achievements = document.querySelector('.achievements');

function loadData() {
    header.innerHTML = `<h2>${d.basics.name}</h1>
                <br>
                <h3>AppliedFor: ${d.basics.AppliedFor}</h3>`;

    personalInfo.innerHTML = `<li>${d.basics.phone}</li>
                            <li>${d.basics.email}</li>
                            <li><a href="${d.basics.profiles.url}">LinkedIn</a></li>`;

    loadSkills(d.skills.keywords);
    loadHobbies(d.interests.hobbies);
    loadAchievements(d.achievements.Summary);

}

function loadSkills(key) {
    let str = "";
    for (const skill of key) {
        str += `<li class='technical-skills-li'>${skill}</li>`;
    }
    skill.innerHTML = str;
}

function loadHobbies(key) {
    let str = "";
    for (const hobby of key) {
        str += `<li class='hobbies-li'>${hobby}</li>`;
    }
    hobbies.innerHTML = str;
}

function loadAchievements(key) {
    let str = "";
    for (const achievements of key) {
        str += `<li class='ach-li'>${achievements}</li>`;
    }
    achievements.innerHTML = str;
}

loadData();

let input = document.querySelector('#input')

input.addEventListener('keypress', setQuery);

function setQuery(event) {
    if (event.keyCode == 13) {
        result(input.value)
    }

}

function result(input) {
    prev_btn.style.display = "none";
    next_btn.style.display = "none";

    let checkValue = e.target.value;
    resumeData = [];
    for (const resume of applicantDatadata.resume) {
        if (resume.basics.AppliedFor.toLowerCase() === searchedValue.toLowerCase())
            resumeData.push(resume);
    }
    current_Index = 0;
    if (resumeData.length != 0) {
        error.style.display = "none";
        resumeDiv.style.display = "flex";
        if (resumeData.length > 1) nextButton.disabled = false;
        d = resumeData[current_Index];
        loadData();
    } else {
        error.style.display = "block";
        main.innerHTML = '';
    }
}
