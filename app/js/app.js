/// --- Core Application --- ///


// App Data Object
const appData = {

    // Temporary data storage for profile creation
    tempProfileSelected: 0,

    // Data storage app identifier prefix
    appPrefix: 'app-favflix',

    iconLibrary: [
        'profile_1.png',
        'profile_2.png',
        'profile_3.png',
        'profile_4.png',
        'profile_5.png',
        'profile_6.png',
    ]

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
        { catName: 'Christmas Movies', catLibrary: [] },
    ]
}

// Document Ready
$(document).ready(function () {
    app_initialize();


    // Add Category Modal Button Listener
    $('#modal-add-category-btn').click(function (event) {
        
        // Unfocus, stop default.
        this.blur();
        event.preventDefault();

        // Set modal config
        let modalProp = {
            showClose: false,
            clickClose: false,
            fadeDuration: 200
        }

        // Get the modal file and render
        $.get(this.href, function (html) {
            $(html).appendTo('body').modal(modalProp);
        });
    });
});