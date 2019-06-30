/// --- Core Application --- ///


// App Data Object
const appData = {

    // Temporary data storage for profile creation
    tempProfileSelected: 0,
    
    // Data storage app identifier prefix
    appPrefix: 'app-favflix-',

    // Local Profile Info
    profileID: 0,
    profileName: 'Visitor',
    profileIcon: '0',

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

    app_initialize();

});