document.querySelector('#login').onclick = () => {
    var user_name = document.querySelector('.user_name').value,
        password = document.querySelector('.password').value;
    credentials = JSON.parse(localStorage.getItem('login'));


    if (user_name != credentials.name || password != credentials.password) {
        alert(" Invalid username/password");
        return false;
    }
    return true;
}