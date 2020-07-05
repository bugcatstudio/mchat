function view_hide() {
    let e = document.getElementsByClassName("view");
    for (i = 0; i < e.length; i++)
        e[i].style.display = "none";
}

function view(id) {
    view_hide();
    document.getElementById(id).style.display = "";
}

function views(ids) {
    view_hide();
    for (i = 0; i < ids.length; i++)
        document.getElementById(ids[i]).style.display = "";
}
$('body').append("<div id=\"popup\" class=\"popup\"><div id=\"popup-inner\"></div></div>");
$('body').append("<div id=\"loading\" class=\"loading\"><div></div></div>");

function popup(msg, title = "Alert") {
    pi = $('#popup-inner');
    pi.html(msg);
    pi.prepend("<div id=\"popup-title\">" + title + "</div>");
    pi.append("<br><br><button class=\'btn btn-light border btn-sm w-50 float-right\' onclick='popup_hide()'>Ok</button>");
    $('#popup').addClass('popup-open');
}
function popup_hide() {
    $('#popup').removeClass('popup-open');
}
function loading(e) {
    if (e)
        $('#loading').addClass('loading-on');
    else {
        setTimeout(function () {
            $('#loading').removeClass('loading-on');
        }, 500);
    }
}
