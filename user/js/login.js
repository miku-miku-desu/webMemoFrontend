let default_endpoint = "https://api.staymiku.net/memo/api/";


$("document").ready(() => {
    if (localStorage.getItem("token")) {
        location.href = "../index.html";
    }
    $("#toRegister").click(() => {
        $("register-page").animate({
            "left": "0"
        });
    });
    $("#toLogin").click(() => {
        $("register-page").animate({
            "left": "100%"
        });
    });
    $("#login").click(() => {
        login();
    });
    $("#register").click(() => {
        register();
    });
});


let sha256 = (str) => {
    const hash = CryptoJS.SHA256(str);
    return hash.toString(CryptoJS.enc.Hex);
}

let login = () => {
    let username = $("#username").val();
    let password = $("#password").val();
    let host = $("#host").val();
    if (host === "") {
        host = default_endpoint;
    }
    if (username === "" || password === "") {
        alert("Please fill all fields");
        return;
    }
    let data = {
        username: username,
        passwd: sha256(password)
    };
    $.ajax({
        url: host + "user/login",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(data),
        success: (res) => {
            if (res.status === true) {
                localStorage.setItem("token", res.body.login_token);
                localStorage.setItem("username", username);
                localStorage.setItem("host", host);
                location.href = "../index.html";
            } else {
                alert(res.message);
            }
        },
        error: (err) => {
            if (err.responseJSON) {
                alert(err.responseJSON.message);
            }
            else {
                alert("Something went wrong");

            }
        }
    });
}

let register = () => {
    let username = $("#rUsername").val();
    let password = $("#rPassword").val();
    let host = $("#rHost").val();
    if (host === "") {
        host = default_endpoint;
    }
    if (username === "" || password === "") {
        alert("Please fill all fields");
        return;
    }
    let data = {
        username: username,
        passwd: sha256(password)
    };
    $.ajax({
        url: host + "user/register",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(data),
        success: (res) => {
            if (res.status === true) {
                localStorage.setItem("token", res.body.login_token);
                localStorage.setItem("username", username);
                localStorage.setItem("host", host);
                location.href = "../index.html";
            } else {
                alert(res.message);
            }
        },
        error: (err) => {
            if (err.responseJSON) {
                alert(err.responseJSON.message);
            }
            else {
                alert("Something went wrong");
            }
        }
    });
}
