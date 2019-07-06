/// --- Core Application --- ///


// Get URL parameters
let urlParamCheck = window.location.search.substr(1);

// Preload Gif
var loadGif = new Image();
loadGif.src = 'app/imgs/loading_icons/loading_spinner.gif';

// App Data Object
const appData = {

    // Break up API keys to hide from repo-sniffing bot assholes 
    xalpha: ['AIzaSy', 'CHl21q', 'CCyGRvGL', 'Gyr0bXu_', 'uGT', '9fBnuAOU'],
    zalpha: ['4d121bd', '4f5', 'mshafce', '35864f', '40836p1d8', '96cjsn', '949371', '756abd'],

    // Temporary data storage for profile creation
    tempProfileSelected: 0,
    tempCurrentPage: 0,

    // Tracker user movement
    userActionLast: '',

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

    // Movie Item Library
    bingeLibrary: [],

    // Favorites
    // Movie ID ex: favLibrary[0].catLibrary[0]
    favLibrary: [
        { catName: 'My Favorites', catLibrary: [] },
    ]
}

// Firebase
var firebaseConfig = {
    apiKey: appData.xalpha.join(''),
    authDomain: "favflix-listshare.firebaseapp.com",
    databaseURL: "https://favflix-listshare.firebaseio.com",
    projectId: "favflix-listshare",
    storageBucket: "favflix-listshare.appspot.com",
    messagingSenderId: "920529453150",
    appId: "1:920529453150:web:1ca57367b9a73b7f"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Document Ready
$(document).ready(function () {

    if (urlParamCheck === 'flush') {
        localStorage.removeItem(appData.appPrefix);
        window.location.replace("/");
    }

    // Initialize core app
    app_initialize();

    // Bind listeners for favorites button (This needs moved)
    app_modal_rebind_listeners();


    // Check if viewing shared list or front page
    if (urlParamCheck.length === 9) {

        // Firestore
        db.collection('userlists').doc(urlParamCheck).get().then(function(data) {
            app_render_shared_link(data.data().items);
        });

    } else {
        // Get New Releases
        app_api_get_new_releases();
    }
});
