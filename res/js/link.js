const url = 'https://app.bugcatstudio.ga/mchat/';
const url_profile = url + 'accounts/images/';
const url_auth = url + 'auth.php';
const url_user = url + 'user.php';

document.addEventListener("offline", function () {
    setTimeout(function () {
        popup('Seems you are offline. Please connect back to internet.');
    }, 2200);
}, false);

function ajax_error() {
    popup('Something went wrong. Unable to connect to server. Please try again.');
    loading(false);
}