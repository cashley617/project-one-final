/// --- Core Application --- ///

// Preload Gif
var loadGif = new Image();
loadGif.src = 'app/imgs/loading_icons/loading_spinner.gif';

// App Data Object
const appData = {

    // Break up API key to hide from repo-sniffing bot assholes
    zalpha: ['4d121bd', '4f5', 'mshafce', '35864f', '40836p1d8', '96cjsn', '949371', '756abd'],

    // Temporary data storage for profile creation
    tempProfileSelected: 0,
    tempCurrentPage: 0,

    // Flag if list needs updated
    listNeedsUpdate: true,

    // Data storage app identifier prefix
    appPrefix: 'app-favflix',

    iconLibrary: [
        'profile_1.png',
        'profile_2.png',
        'profile_3.png',
        'profile_4.png',
        'profile_5.png',
        'profile_6.png',
    ],

    searchLibrary: [],
    newReleaseLibrary: [],
    lastListLibrary: [],
    itemModalStorage: {}

}

// User Profile Object
let appProfile = {

    // Local Profile Info
    profileID: 0,
    profileName: 'Visitor',
    profileIcon: '0',

    // Movie Item Librares
    partyLibrary: [],
    bingeLibrary: [],

    // Favorites
    // Movie ID ex: favLibrary[0].catLibrary[0]
    favLibrary: [
        { catName: 'My Favorites', catLibrary: [] },
    ]
}

// Document Ready
$(document).ready(function () {
    app_initialize();

    app_modal_rebind_listeners();

    // Get New Releases
    app_api_get_new_releases();
});