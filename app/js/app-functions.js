/// --- Core App Functions --- ///

// TEMPORARY AJAX REFERENCE
function call_data() {
    $.ajax({
        url: "https://unogs-unogs-v1.p.rapidapi.com/aaapi.cgi?q=get%3Anew7-!1900,2018-!0,5-!0,10-!0-!Any-!Any-!Any-!gt100-!{downloadable}&t=ns&cl=all&st=adv&ob=Relevance&p=1&sa=and",
        headers: {
            'X-RapidAPI-Host': 'unogs-unogs-v1.p.rapidapi.com',
            'X-RapidAPI-Key': '4d121bd4f5mshafce35864f40836p1d896cjsn949371756abd'
        },

        success: function (response) {
            console.log(response);
        }
    });
}



function app_initialize() {

    // Check local storage
    let profileCheck = localStorage.getItem('app-favflix');

    // If no profile found
    if (profileCheck === null) {

        //  Profile Name: Create suibmit input listener
        $('#btn-submit-profile').on('click', function () {
            app_profile_submit_name();
        });

        // Profile Icon: Create submit button listener
        $('#btn-submit-profile-icon').on('click', function () {
            app_profile_submit_icon();
        });

        // Profile Icons: Create select icon listener
        $('#app-stage-profile-icon img').on('click', function () {
            
            // Unselect other icons
            $('#app-stage-profile-icon img').each(function() {
                $(this).removeClass('app-profile-icon-selected');
            });

            // Select clicked icon
            $(this).addClass('app-profile-icon-selected');

            // Update selected value
            appData.tempProfileSelected = $(this).attr('data-id');
        });


        // Profile Name: Form render. Start of profile creation staging.
        $('#app-stage-profile').fadeIn('slow');
    }

    // Profile Found. Load Data
    else {

        // Local Storage: Load Data
        app_data_profile_store_local();

        // Welcome Name: Update dom
        app_render_welcome_name();

        // Staging Logo: Hide from dom
        $('#app-stage-logo').remove();
        $('#app-stage-content').fadeIn('fast');
    }
}


// Profile Name: Validate input, store and update profile name.
function app_profile_submit_name() {

    // Validate w/ early exit
    let inputValue = $('#input-field-profile-name').val();
    if (inputValue === '') {

        $('#input-field-profile-name').css('border', '2px solid red');
        //$('#app-input-warning').fadeIn('fast');
        return null;
    }

    // Data has been validated
    if (inputValue !== '') {

        // Save profile profile name and generate unique ID
        appProfile.profileName = inputValue;
        appProfile.profileID   =  Math.random().toString(36).substr(2, 9);

        // Save to local storage
        app_data_profile_store_local();

        // Update profile name display
        app_render_welcome_name();

        // Fade out and trigger next stage
        $('#app-stage-profile').fadeOut('fast', function () {
            $('#app-stage-profile-icon').fadeIn('fast');
        });

    }
}

// Player Icon: Submit change
function app_profile_submit_icon() {

    appProfile.profileIcon = appData.tempProfileSelected;
    app_render_profile_icon();
    app_data_profile_store_local();

    // Fade out and trigger next stage
    $('#app-stage-logo').fadeOut('fast');
    $('#app-stage-profile-icon').fadeOut('fast', function () {
        $('#app-stage-content').fadeIn('fast');
    });
}


// ------ Render Utilities ------ //


// Render: Update welcome name
function app_render_welcome_name() {
    $('#app-welcome-name').text(appProfile.profileName);
}

// Render: Update welcome profile icon
function app_render_profile_icon() {
    $('#app-welcome-img').attr('src', 'app/imgs/profile_icons/' + appData.iconLibrary[appProfile.profileIcon]);
}


// ---- DEBUG ---- //
function app_debug_clear_data() {

    event.preventDefault();
    localStorage.removeItem(appData.appPrefix);
    location.reload();
}

// Store Local Data
function app_data_profile_store_local() {
    localStorage.setItem(appData.appPrefix, JSON.stringify(appProfile));
}