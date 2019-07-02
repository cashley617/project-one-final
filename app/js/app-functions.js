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


function app_api_get_new_releases() {
    $.ajax({
        url: "https://unogs-unogs-v1.p.rapidapi.com/aaapi.cgi?q=get:new7:US&p=1&t=ns&st=adv",
        headers: {
            'X-RapidAPI-Host': 'unogs-unogs-v1.p.rapidapi.com',
            'X-RapidAPI-Key': '4d121bd4f5mshafce35864f40836p1d896cjsn949371756abd'
        },

        success: function (response) {
            appData.newReleaseLibrary = response.ITEMS;
            console.log(appData.newReleaseLibrary);
            app_render_new_releases();
        }

    });
}


// Initialize App, first run
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
            $('#app-stage-profile-icon img').each(function () {
                $(this).removeClass('app-profile-icon-selected');
                $(this).removeClass('animate-bounce');
            });

            // Select clicked icon
            $(this).addClass('app-profile-icon-selected');

            setTimeout(() => {
                $(this).addClass('animate-bounce');
            }, 1);

            // Update selected value
            appData.tempProfileSelected = $(this).attr('data-id');
        });


        // Profile Name: Form render. Start of profile creation staging.
        $('#app-stage-profile').fadeIn('slow');
    }

    // Profile Found. Load Data
    else {

        // Get saved profile data and store local
        app_data_profile_get_local();

        // Welcome Name: Update dom
        app_render_welcome_name();

        // Render Navigation
        app_render_nav_favorites();

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
        appProfile.profileID = Math.random().toString(36).substr(2, 9);

        // Save to local storage
        app_data_profile_store_local();

        // Update profile name display
        app_render_welcome_name();

        app_render_nav_favorites();

        // Fade out and trigger next stage
        $('#app-stage-profile').fadeOut('fast', function () {
            $('#app-stage-profile-icon').fadeIn('fast');
        });

    }
}

// Add new category
function app_category_add_new() {

    // Validate w/ early exit
    let inputValue = $('#input-field-category-name').val();
    if (inputValue === '') {

        $('#input-field-category-name').css('border', '2px solid red');
        //$('#app-input-warning').fadeIn('fast');
        return null;
    }

    // Data has been validated
    if (inputValue !== '') {

        // Setup new category object with input value and push to local array
        let catObject = { catName: inputValue, catLibrary: [] };
        appProfile.favLibrary.push(catObject);

        // Store profile data to local storage
        app_data_profile_store_local();

        // Render new category addition
        app_render_nav_add_append();

        // Close the modal and clear from dome
        $.modal.close();
        $('#modal-add-category').remove();
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

// Store selected item into local object
function app_list_display_add_item(item) {
    appData.itemModalStorage = appData.newReleaseLibrary[item];
    app_render_modal_list_add();
}


// ------ Render Utilities ------ //

// Update Content Header
function app_render_content_header(headerText) {
    $('#app-content-header').text(headerText);
}


function app_render_modal_category_add() {
    
    let myHTML = `
        <div class="app-modal modal" id="modal-add-category">
            <div class="app-modal-container">
                <h1>Add New Category</h1>
                <input type="text" id="input-field-category-name" class="input-category-name" placeholder="Ex: Christmas Movies"
                    onfocus="this.placeholder = ''" onblur="this.placeholder = 'Ex: Christmas Movies'">
                <button onclick="app_category_add_new()" type="button" class="input-btn">Create Category</button>
                <a href="#" onclick="app_category_add_new()" rel="modal:close">Close This</a>
            </div>
        </div>`;

    $('body').append(myHTML);
    $('#modal-add-category').modal(
        {
            showClose: true,
            clickClose: true,
            fadeDuration: 200
        }
    );

    $('#modal-add-category').on($.modal.CLOSE, function(event, modal) {
        $(this).remove();
    });
}

function app_render_modal_list_add() {

    // Get item information from storage
    let movieTitle = appData.itemModalStorage.title;
    let movieIMG = appData.itemModalStorage.image;
    let optionHTML = ``;

    // Setup HTML of Dropdown Choices
    appProfile.favLibrary.forEach(function(data, index) {
        
        let selected = '';
        let option = data.catName;
        if (index === 0) { selected = 'selected'}
        optionHTML += `<option value="${index}" ${selected}>${option}</option>`

    });
    
    let myHTML = `
    <div class="app-modal" id="modal-list-add">
    <div class="app-modal-container-list-add">
        
        <div>
            <img src="${movieIMG}">
        </div>
        <div class="app-modal-list-add-content">
            <div class="modal-content-cell">
                <div class="modal-list-box">
                    <p>Binge Tracker</p>
                </div>
                <div>
                    <button id="btn-submit-profile" type="button" class="input-btn modal-input-btn">Add</button>
                </div>
            </div>
            <div class="modal-content-cell">
                <div class="modal-list-box">
                    <select id="list-choice" class="modal-input-select">
                    ${optionHTML}
                    </select>
                </div>
                <div>
                    <button id="btn-submit-add-to-list" type="button" class="input-btn modal-input-btn">Add</button>
                </div>
            </div>
        </div>
    </div>
</div>`;

    $('body').append(myHTML);
    $('#modal-list-add').modal(
        {
            showClose: true,
            clickClose: true,
            fadeDuration: 200
        }
    );

    $('#btn-submit-add-to-list').click(function() {
        app_data_item_add_to_list();
    });

    $('#modal-list-add').on($.modal.CLOSE, function(event, modal) {
        $(this).remove();
    });
}

// Render New Releases
function app_render_new_releases() {

    $('#app-content').empty();

    for (let i = 0; i < 8; i++) {

        // Title truncate
        let itemTitle = appData.newReleaseLibrary[i].title.slice(0, 22) + "...";
        let itemRuntime = appData.newReleaseLibrary[i].runtime;
        let myHTML = `
        <div class="card app-content-item">
            <img class="card-img-top loading" src="${appData.newReleaseLibrary[i].image}" alt="Card image cap">
            <div class="card-body app-content-item-body">
            
                <div>
                    <p>${itemTitle}</p>
                </div>

                <div class="d-flex justify-content-between">
                    <div>
                        <p><i class="fas fa-clock">&nbsp;</i>${itemRuntime}</p>
                    </div>
                    <div class="d-flex align-items-center">
                        <p><a href="#" onclick="app_list_display_add_item(${i})"><i class="fas fa-plus-circle btn-add-fav"></i></a></p>
                    </div>
                </div>
            </div>
        </div>`;

        $('#app-content').append(myHTML);
    }
}


// Render Favorites
function app_render_favorites() {

    // Update section header
    app_render_content_header("Favorites")

    let myHTML = `
    <div class="card app-content-item">
        <img class="card-img-top" src="http://art-2.nflximg.net/63fac/79c52ccb0931cc50f51fd8922ecaef551d263fac.jpg" alt="Card image cap">
        <div class="card-body app-content-item-body">
            <div class="d-flex justify-content-between">
                <div>
                    <p>Left Side</p>
                    <p>Left Side</p>
                </div>
                <div class="d-flex align-items-center">
                    <p>Right Side</p>
                </div>
            </div>
        </div>
    </div>`;

    $('#app-content').empty();
    $('#app-content').append(myHTML);
    $('#app-content').append(myHTML);
    $('#app-content').append(myHTML);
    $('#app-content').append(myHTML);
    $('#app-content').append(myHTML);
}


// Render Favorites Categories
function app_render_nav_favorites() {

    // Clear Navigation
    $('#app-nav-content').empty();

    appProfile.favLibrary.forEach(function (value, index) {
        let myHTML = `
            <div class="app-nav-box">
                <p><i class="fas fa-bookmark">&nbsp;</i><a href="#" onclick="app_render_favorites()">${appProfile.favLibrary[index].catName}</a></p>
            </div>
            <hr>`;
        $('#app-nav-content').append(myHTML);
    });
}

// Render Favorites Categories
function app_render_nav_add_append() {

    let index = appProfile.favLibrary.length - 1;
    let myHTML = `
        <div class="app-nav-box animate-puff-in">
            <p><i class="fas fa-bookmark">&nbsp;</i><a href="#" onclick="app_render_favorites()">${appProfile.favLibrary[index].catName}</a></p>
        </div>
        <hr>`;
    $('#app-nav-content').append(myHTML);
}

// Render: Update welcome name
function app_render_welcome_name() {
    $('#app-welcome-name').text(appProfile.profileName);
}

// Render: Update welcome profile icon
function app_render_profile_icon() {
    $('#app-welcome-img').attr('src', 'app/imgs/profile_icons/' + appData.iconLibrary[appProfile.profileIcon]);
}


// --- Data Management --- //

// Store Local Data
function app_data_profile_store_local() {
    localStorage.setItem(appData.appPrefix, JSON.stringify(appProfile));
}

// Store Local Data
function app_data_profile_get_local() {
    appProfile = JSON.parse(localStorage.getItem(appData.appPrefix));
}

function app_data_item_add_to_list() {
    
    // Get input from selected list
    let inputValue = $('#list-choice').val();
    let movieID = appData.itemModalStorage.netflixid;

    // Add to list library
    appProfile.favLibrary[inputValue].catLibrary.push(movieID);
    console.log(appProfile.favLibrary[inputValue]);

    // Store to local storage
    app_data_profile_store_local();
}


// --- Modal ---- //
function app_modal_rebind_listeners() {

    // Grab every modal link and rebind
    $('a.modal-ajax').each(function () {
        $(this).off('click').on('click', function (event) {

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
}
// ---- DEBUG ---- //


function app_debug_clear_data() {

    event.preventDefault();
    localStorage.removeItem(appData.appPrefix);
    location.reload();
}
