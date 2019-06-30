/// --- Core Application --- ///


// App Data Object
const appData = {


}



// Document Ready
$(document).ready(function () {

    // Animate Main Profile
    $('#app-stage-profile').fadeIn('slow');

    // Set Listener on button
    $('#btn-submit-profile').on('click', function () {
        app_profile_submit_name();
    });

    // Set Listener on button
    $('#btn-submit-profile-icon').on('click', function () {
        app_profile_submit_icon();
    });
});