view('splash');
localStorage.removeItem('mchat_receiver');
setTimeout(function () {
    loading(true);
    $.ajax({
        url: url + 'valid.php',
        type: "POST",
        cache: false,
        success: function (e) {
            if (e == "ALLOW_ACCESS") {
                if (localStorage.getItem("mchat_username") != null)
                    window.location.href = "main.html";
                else
                    view('newStart');
                loading(false);
            } else {
                view('no-response');
                $('#valid').html(e);
                loading(false);
            }
        },
        error: function () {
            ajax_error();
        }
    });
}, 2200);