//checking login credentials
document.querySelector('#login').onclick = () => {
    var user_name = document.querySelector('.user_name').value,
        password = document.querySelector('.password').value;
    credentials = JSON.parse(localStorage.getItem('login'));

    if (user_name != credentials.name || password != credentials.password) {
        alert(" Invalid username/password");
        location.reload(true);
        return false;
    }
    return true;
}

//prevent back page loading
function preventback() {
    window.history.forward();
}
setTimeout("preventback()", 0);
window.onunload = function () { null };
