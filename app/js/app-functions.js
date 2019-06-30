/// --- Core App Functions --- ///


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
    let profileCheck = localStorage.getItem('app-favflix-profile-id');

    // If no profile found
    if (profileCheck === null) {

        // Animate Main Profile
        $('#app-stage-profile').fadeIn('slow');

    }
 
    // Profile Found. Load Data
    else {
        appData.profileID   = localStorage.getItem('app-favflix-profile-id');
        appData.profileName = localStorage.getItem('app-favflix-profile-name');
        appData.profileIcon = localStorage.getItem('app-favflix-profile-icon');
    }
}

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
        appData.profileName = inputValue;
        appData.profileID   = new Date().valueOf();

        // Save to local storage
        localStorage.setItem('app-favflix-profile-id', appData.profileID);
        localStorage.setItem('app-favflix-profile-name', appData.profileName);

        // Update profile name display
        $('#app-welcome-name').text(appData.profileName);

        // Fade out and trigger next stage
        $('#app-stage-profile').fadeOut('fast', function () {
            $('#app-stage-profile-icon').fadeIn('fast');
        });

    }
}

function app_profile_submit_icon() {

    // Fade out and trigger next stage

    $('#app-stage-logo').fadeOut('fast');
    $('#app-stage-profile-icon').fadeOut('fast', function () {
        $('#app-stage-content').fadeIn('fast');
    });
}