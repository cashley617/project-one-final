/// --- Core Application --- ///


// App Data Object
const appData = {

    // Local Profile Info
    profileID: 0,
    profileName: 'Visitor',
    profileIcon: '0',

    
    // Data

    // Movie Item Librares
    favLibrary: [],
    partyLibrary: [],
    bingeLibrary: [],

    // Categories
    favCategories: [],
    
    iconLibrary: [
        'profile_1.png',
        'profile_2.png',
        'profile_3.png',
        'profile_4.png',
        'profile_5.png',
        'profile_6.png',
    ]

}



// Document Ready
$(document).ready(function () {

    
    // Update Profile Name
    $('#app-welcome-name').text('Visitor');

    // Set Listener on button
    $('#btn-submit-profile').on('click', function () {
        app_profile_submit_name();
    });

    // Set Listener on button
    $('#btn-submit-profile-icon').on('click', function () {
        app_profile_submit_icon();
    });

    app_initialize();

});