const username = localStorage.getItem('mchat_username');
const user_name = localStorage.getItem('mchat_user_name');
const user_profile = localStorage.getItem('mchat_user_profile');

view('main');
localStorage.removeItem("mchat_receiver");

function signout() {
    localStorage.removeItem('mchat_username');
    localStorage.removeItem('mchat_user_name');
    localStorage.removeItem('mchat_user_profile');
    window.location.href = "index.html";
}

$('#user-name').html(user_name);
if (user_profile == 1)
    $('#user-profile').attr('src', url_profile + username)


var allUsersData = [];

function fetchAllUsers() {
    $.ajax({
        url: url_user,
        type: "POST",
        data: { fetchAllUsers: 1 },
        success: function (e) {
            allUsersData = JSON.parse(e);
        },
        error: function () {
            ajax_error();
            view('main');
        }
    });
}

fetchAllUsers();

//-----------------------------Main Chats-----------------------------


function checkInteractions() {
    $.ajax({
        type: "POST",
        url: url_user,
        data: { u: username, checkInteractions: 1 },
        success: function (e) {
            e = JSON.parse(e);
            $('#allChats').html('');
            for (i = 0; i < e.length; i++) {
                x = e[i].split(',');
                for (j = 0; j < allUsersData.length; j++) {
                    y = allUsersData[j].split(',');
                    if (y[0] == x[1])
                        addChatTile(y[0], y[1], y[2], x[0]);
                }
            }
        },
        error: function () {
            ajax_error();
        }
    });
}

checkInteractions();

function addChatTile(u, n, i, no) {
    t = $('#allChats');
    if (i == 1 || i == '1') {
        if (no > 0)
            t.append("<div class=\"tile\" onclick=\"chat('" + u + "','" + n + "','" + i + "')\"><img src=\"" + url_profile + u + "\" class=\"icon\"><div><div class\s-u-n\">" + n + "</div></div><hr><div class=\"notifi\">" + no + "</div></div>");
        else
            t.append("<div class=\"tile\" onclick=\"chat('" + u + "','" + n + "','" + i + "')\"><img src=\"" + url_profile + u + "\" class=\"icon\"><div><div class\s-u-n\">" + n + "</div></div></div>");
    } else {
        if (no > 0)
            t.append("<div class=\"tile\" onclick=\"chat('" + u + "','" + n + "','" + i + "')\"><img src=\"res/icons/profile.png\" class=\"icon\"><div><div class\s-u-n\">" + n + "</div></div><hr><div class=\"notifi\">" + no + "</div></div>");
        else
            t.append("<div class=\"tile\" onclick=\"chat('" + u + "','" + n + "','" + i + "')\"><img src=\"res/icons/profile.png\" class=\"icon\"><div><div class\s-u-n\">" + n + "</div></div></div>");
    }
}

//-----------------------------Search----------------------------

function searchInit() {
    $('#user-search').html('');
    $('#user-search').hide();
    for (i = 0; i < allUsersData.length; i++) {
        let a = allUsersData[i].split(',');
        if (a[0] != username)
            addSearchTile(a[0], a[1], a[2]);
    }
}

function addSearchTile(u, n, i) {
    t = $('#user-search');
    if (i == '1')
        t.append("<div class=\"tile\" onclick=\"chat('" + u + "','" + n + "','" + i + "')\"><img src=\"" + url_profile + u + "\" class=\"icon\"><div><div class=\"s-u-n\">" + u + "</div><div class=\"small-head\">" + n + "</div></div></div>");
    else
        t.append("<div class=\"tile\" onclick=\"chat('" + u + "','" + n + "','" + i + "')\"><img src=\"res/icons/profile.png\" class=\"icon\"><div><div class=\"s-u-n\">" + u + "</div><div class=\"small-head\">" + n + "</div></div></div>");
}

function searchUser(f) {
    var s = $('#user-search');
    if (f == "")
        s.hide();
    else
        s.show();
    users = document.getElementsByClassName('s-u-n');
    for (i = 0; i < users.length; i++) {
        x = users[i].innerText;
        if (x.indexOf(f.toLowerCase()) > -1)
            users[i].parentElement.parentElement.style.display = "";
        else
            users[i].parentElement.parentElement.style.display = "none";
    }

}

//--------------------------------chat pane-----------------------

function chat(u, n, i) {
    view('conversation');
    localStorage.setItem('mchat_receiver', u);
    fetchMessages();
    $('#receiver-name').html(n);
    if (i == "1")
        $('#receiver-profile').attr('src', url_profile + u);
    else
        $('#receiver-profile').attr('src', 'res/icons/profile.png');
}


function addMessage(se, m, s, ti) {
    t = $('#messages');
    ti = ti.split(' ')[1];
    ti = ti.split(':')[0] + ":" + ti.split(':')[1];
    if (se == username) {
        if (s == '0')
            t.append("<div class=\"m-sen\"><div class=\"m-msg\">This message was deleted</div></div>");
        else if (s == '1')
            t.append("<div class=\"m-sen\"><div class=\"m-msg\">" + m + "<div class=\"m-ext\"><div class=\"m-time\">" + ti + "</div><div><img src=\"res/icons/m-sent.png\" class=\"m-status\"></div></div></div></div>");
        else if (s == '2')
            t.append("<div class=\"m-sen\"><div class=\"m-msg\">" + m + "<div class=\"m-ext\"><div class=\"m-time\">" + ti + "</div><div><img src=\"res/icons/m-del.png\" class=\"m-status\"></div></div></div></div>");
        else if (s == '3')
            t.append("<div class=\"m-sen\"><div class=\"m-msg\">" + m + "<div class=\"m-ext\"><div class=\"m-time\">" + ti + "</div><div><img src=\"res/icons/m-seen.png\" class=\"m-status\"></div></div></div></div>");
    } else {
        if (s == '0')
            t.append("<div class=\"m-rec\"><div class=\"m-msg\">This message was deleted</div></div>");
        else
            t.append("<div class=\"m-rec\"><div class=\"m-msg\">" + m + "<div class=\"m-ext\"><div class=\"m-time\">" + ti + "</div></div></div></div>");
    }
}


function fetchMessages() {
    $.ajax({
        type: "POST",
        url: url_user,
        data: { u1: username, u2: localStorage.getItem('mchat_receiver'), fetchMessages: 1 },
        success: function (e) {
            e = JSON.parse(e);
            $('#messages').html('');
            for (i = 0; i < e.length; i++) {
                x = e[i].split('^');
                addMessage(x[0], x[1], x[2], x[3]);
            }
        },
        error: function () {
            ajax_error();
        }
    });
}


function sendMessage() {
    m = $('#messageFeild').val();
    $.ajax({
        type: "POST",
        url: url_user,
        data: { m: m, u1: username, u2: localStorage.getItem('mchat_receiver'), sendMessage: 1 },
        success: function () {
            $('#messageFeild').val('');
            fetchMessages();
        },
        error: function () {
            ajax_error();
        }
    });
}

setInterval(function () {
    if (localStorage.getItem('mchat_receiver') == null)
        checkInteractions();
    else fetchMessages();
}, 4000);

document.addEventListener("backbutton", function () {
    view('main');
    localStorage.removeItem('mchat_receiver');
    checkInteractions();
}, false);