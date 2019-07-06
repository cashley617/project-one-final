/// --- Core App Functions --- ///


// ------ Site Utilitie -------/

// API: Search Results
function app_api_get_search_results(inputField) {

    // Get Input
    let inputValue = inputField.val();

    // Early Exit if not valid
    if (inputValue === '') {

        // No valid input found
        $('.container-form').css('border-width', '2px');
        $('.container-form').css('border-color', 'red');
        $('#input-field-search').attr('placeholder', 'Please enter something...');

        // Early Exit
        return null;
    }


    // Set User Action
    appData.userActionLast = 'search';

    // Data: Get request
    $.ajax({
        url: `https://unogs-unogs-v1.p.rapidapi.com/aaapi.cgi?q=${inputValue}-!1900,2018-!0,5-!0,10-!0-!Any-!Any-!Any-!gt100-!{downloadable}&t=ns&cl=78&st=adv&ob=Relevance&p=1&sa=and`,
        headers: {
            'X-RapidAPI-Host': 'unogs-unogs-v1.p.rapidapi.com',
            'X-RapidAPI-Key': appData.zalpha.join('')
        },

        success: function (response) {

            // Content Found
            if (response.COUNT > 0) {
                appData.searchLibrary = response.ITEMS;
                app_render_search_results();
            }

            // No Content Found
            if (response.COUNT === 0) {
                // YO! AINT NO CONTENT IN DIS BISH!
            }
        }

    });
}

// API: New Releases
function app_api_get_new_releases() {

    // Set User Action
    appData.userActionLast = 'new';

    $.ajax({
        url: "https://unogs-unogs-v1.p.rapidapi.com/aaapi.cgi?q=get:new7:US&p=1&t=ns&st=adv",
        headers: {
            'X-RapidAPI-Host': 'unogs-unogs-v1.p.rapidapi.com',
            'X-RapidAPI-Key': appData.zalpha.join('')
        },

        success: function (response) {
            appData.newReleaseLibrary = response.ITEMS;
            app_render_new_releases(appData.tempCurrentPage);
        }

    });
}


// API: Single Title Info
function app_api_get_title_info(itemID, catNameIndex, catLibIndex) {
    $.ajax({
        url: `https://unogs-unogs-v1.p.rapidapi.com/aaapi.cgi?t=loadvideo&q=${itemID}`,
        headers: {
            'X-RapidAPI-Host': 'unogs-unogs-v1.p.rapidapi.com',
            'X-RapidAPI-Key': appData.zalpha.join('')
        },

        success: function (response) {

            appData.lastListLibrary.push(response.RESULT);

            // Title truncate
            let itemTitle = response.RESULT.nfinfo.title;
            if (itemTitle.length > 22) {
                itemTitle = itemTitle.slice(0, 22) + "...";
            }

            let itemRuntime = response.RESULT.nfinfo.runtime;
            let myHTML = `
                    <div class="card app-content-item">
                        <img class="card-img-top loading" src="${response.RESULT.nfinfo.image1}" alt="Card image cap">
                        <div class="card-body app-content-item-body">
                            <div>
                                <p>${itemTitle}</p>
                            </div>

                            <div class="d-flex justify-content-between">
                                <div>
                                    <p><i class="fas fa-clock">&nbsp;</i>${itemRuntime}</p>
                                </div>
                                <div class="d-flex align-items-center">
                                    <p><a href="#" onclick="app_list_remove_item(${catNameIndex},${catLibIndex})"><i class="fas fa-minus-circle btn-add-fav"></i></a></p>
                            </div>
                        </div>
                    </div>
                </div>`;

            $('#app-content').append(myHTML);
        }
    });
}

// API: Single Title Info
function app_api_get_party_picker_details(itemID) {

    app_render_content_header('Random Selection');
    $('.pagination').remove();
    $('#app-content').empty();
    $('#share-href').remove();
    $('#app-content').append(`<div class="w-100 text-center"><img src="app/imgs/loading_icons/loading_spinner.gif"></div>`);
    $.ajax({
        url: `https://unogs-unogs-v1.p.rapidapi.com/aaapi.cgi?t=loadvideo&q=${itemID}`,
        headers: {
            'X-RapidAPI-Host': 'unogs-unogs-v1.p.rapidapi.com',
            'X-RapidAPI-Key': appData.zalpha.join('')
        },

        success: function (response) {

            console.log(response);

            $('.pagination').remove();
            $('#app-content').empty();
            appData.lastListLibrary.push(response.RESULT);

            // Title truncate
            let itemTitle = response.RESULT.nfinfo.title;
            if (itemTitle.length > 22) {
                itemTitle = itemTitle.slice(0, 22) + "...";
            }

            let itemRuntime = response.RESULT.nfinfo.runtime;
            let myHTML = `
                    <div class="card app-content-item">
                        <img class="card-img-top loading" src="${response.RESULT.nfinfo.image1}" alt="Card image cap">
                        <div class="card-body app-content-item-body text-center">
                            <div>
                                <p>${itemTitle}</p>
                            </div>

                            <div class="d-flex justify-content-center">
                                <div>
                                    <p><i class="fas fa-clock">&nbsp;</i>${itemRuntime}</p>
                                </div>
                        </div>
                    </div>
                </div>`;

            $('#app-content').append(myHTML);

        }
    });
}

// API: Shared Link Info
function app_api_get_shared_link_info(itemID) {
    $.ajax({
        url: `https://unogs-unogs-v1.p.rapidapi.com/aaapi.cgi?t=loadvideo&q=${itemID}`,
        headers: {
            'X-RapidAPI-Host': 'unogs-unogs-v1.p.rapidapi.com',
            'X-RapidAPI-Key': appData.zalpha.join('')
        },

        success: function (response) {

            appData.lastListLibrary.push(response.RESULT);

            // Title truncate
            let itemTitle = response.RESULT.nfinfo.title;
            if (itemTitle.length > 22) {
                itemTitle = itemTitle.slice(0, 22) + "...";
            }

            let itemRuntime = response.RESULT.nfinfo.runtime;
            let myHTML = `
                    <div class="card app-content-item">
                        <img class="card-img-top loading" src="${response.RESULT.nfinfo.image1}" alt="Card image cap">
                        <div class="card-body app-content-item-body">
                            <div>
                                <p>${itemTitle}</p>
                            </div>

                            <div class="d-flex justify-content-between">
                                <div>
                                    <p><i class="fas fa-clock">&nbsp;</i>${itemRuntime}</p>
                                </div>
                        </div>
                    </div>
                </div>`;

            $('#app-content').append(myHTML);
        }
    });
}


function app_list_remove_item(catIndex, catLibIndex) {
    
    appProfile.favLibrary[catIndex].catLibrary.splice(catLibIndex, 1);
    console.log(appProfile.favLibrary[catIndex]);
    
    appData.listNeedsUpdate = true;
    app_data_profile_store_local();
    app_render_favorites(catIndex);

}

// Initialize App: First run
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

        // Setup Enter for input field
        $("#input-field-profile-name").keyup(function (event) {
            if (event.keyCode === 13) {
                $("#btn-submit-profile").click();
            }
        });

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

        // Setup Enter for input field
        $("#input-field-search").keyup(function (event) {
            if (event.keyCode === 13) {
                app_api_get_search_results($(this));
            }
        });
    }
}

// Profile Name Stage: Validate input, store and update profile name.
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
        appProfile.profileID = inputValue + Math.random().toString(36).substr(2, 9);

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

// Add item to app list
function app_data_item_add_to_list() {

    // Get input from selected list
    let inputValue = $('#list-choice').val();
    let movieID = appData.itemModalStorage.netflixid;

    // Add to list library
    appProfile.favLibrary[inputValue].catLibrary.push(movieID);

    // Store to local storage
    app_data_profile_store_local();

    // Flag list update tracker
    appData.listNeedsUpdate = true;
}

// Add item to app binge
function app_data_item_add_to_binge() {

    // Get input from selected list
    let inputValue = $('#list-choice').val();
    let movieID = appData.itemModalStorage.netflixid;

    // Add to list library
    appProfile.bingeLibrary.push(movieID);

    // Store to local storage
    app_data_profile_store_local();
}
function copy_shared_link() {

    let temp = $("<input>");
    $("body").append(temp);
    urlValue = $('#share-href-field').val()
    temp.val(urlValue).select();
    console.log(temp.val());
    document.execCommand("copy");
    temp.remove();
}

// ------ Render Functions ------ //


// Render Party Picker
// Render favorites list, cached. (NO API PULL)
function app_render_party_picker() {

    let everyItemArray = [];
    // Put every ID into a single array

    for (let i = 0; i < appProfile.favLibrary.length; i++) {
        for (let j = 0; j < appProfile.favLibrary[i].catLibrary.length; j++) {
            everyItemArray.push(appProfile.favLibrary[i].catLibrary[j]);
        }
    }

    // Render item
    if (everyItemArray.length > 0) {

        console.log('t');
        let randomItemIndex = Math.floor(Math.random() * Math.floor(everyItemArray.length));
        app_api_get_party_picker_details(everyItemArray[randomItemIndex]);
    }

    if (everyItemArray.length === 0) {

        $('#app-content').empty();
        $('.pagination').remove();
        let catName = "Party Picker"
        let myHTML = `
        <div class="alert alert-info w-100" role="alert">
            <P><i class="fas fa-exclamation-circle">&nbsp;</i>Oops! <b>${catName}</b> list is empty!</p>
        </div>
        `;

        $('#app-content').append(myHTML);
    }

}

// Render favorites list, cached. (NO API PULL)
function app_render_list_cached() {

    appData.lastListLibrary.forEach(function (data, index) {

        // Title truncate
        let itemTitle = data.nfinfo.title;
        if (itemTitle.length > 22) {
            itemTitle = itemTitle.slice(0, 22) + "...";
        }
        let itemRuntime = data.nfinfo.runtime;
        let myHTML = `
            <div class="card app-content-item">
                <img class="card-img-top loading" src="${data.nfinfo.image1}" alt="Card image cap">
                <div class="card-body app-content-item-body">
                    <div>
                        <p>${itemTitle}</p>
                    </div>

                    <div class="d-flex justify-content-between">
                        <div>
                            <p><i class="fas fa-clock">&nbsp;</i>${itemRuntime}</p>
                        </div>
                        
                        <div class="d-flex align-items-center">
                            <p><a href="#" onclick="app_list_remove_item()"><i class="fas fa-minus-circle btn-add-fav"></i></a></p>
                        </div>
                    </div>
                </div>
        </div>`;
        $('#app-content').append(myHTML);
    });
}

// Render: Generatoe Loading
function app_render_content_loading() {

}

// Render: Breadcrumb page header
function app_render_content_header(headerText) {
    $('#app-content-header').text(headerText);
}

// Render: Add new category to favorites list
function app_render_modal_category_add() {

    let myHTML = `
        <div class="app-modal modal" id="modal-add-category">
            <div class="app-modal-container">
                <h1>Add New Category</h1>
                <input type="text" id="input-field-category-name" class="input-category-name" placeholder="Ex: Christmas Movies"
                    onfocus="this.placeholder = ''" onblur="this.placeholder = 'Ex: Christmas Movies'">
                <button id="btn-add-category" onclick="app_category_add_new()" type="button" class="input-btn">Create Category</button>
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

    $('#modal-add-category').on($.modal.CLOSE, function (event, modal) {
        $(this).remove();
    });

    // Add enter key detection for input field
    $("#input-field-category-name").keyup(function (event) {
        if (event.keyCode === 13) {
            $("#btn-add-category").click();
        }
    });
}

// Render: Modal Add move to list
function app_render_modal_list_add() {

    // Get item information from storage
    let movieTitle = appData.itemModalStorage.title;
    let movieIMG = appData.itemModalStorage.image;
    let optionHTML = ``;

    // Setup HTML of Dropdown Choices
    appProfile.favLibrary.forEach(function (data, index) {

        let selected = '';
        let option = data.catName;
        if (index === 0) { selected = 'selected' }
        optionHTML += `<option value="${index}" ${selected}>${option}</option>`

    });

    let myHTML = `
    <div class="app-modal" id="modal-list-add">
    <div class="app-modal-container-list-add">
        
        <div>
            <img src="${movieIMG}">
        </div>
        <div class="app-modal-list-add-content">
        <h6>Select where to add this item...</h6>
            <div class="modal-content-cell">
                <div class="modal-list-box">
                    <p>Binge Tracker</p>
                </div>
                <div>
                    <button id="btn-add-to-binge" type="button" class="input-btn modal-input-btn">Add</button>
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

    // Binge Tracker
    $('#btn-add-to-binge').click(function () {
        app_data_item_add_to_binge();
        $.modal.close();
    });

    // Favorites Lists
    $('#btn-submit-add-to-list').click(function () {
        app_data_item_add_to_list();
        $.modal.close();
    });

    $('#modal-list-add').on($.modal.CLOSE, function (event, modal) {
        $(this).remove();
    });
}

function app_render_modal_share_link(listIndex) {

    // FireStore
    // Create list ID:
    let listID = Math.random().toString(36).substr(2, 9);

    db.collection('userlists').doc(listID).set({
        items: appProfile.favLibrary[listIndex].catLibrary
    });

    // Setup Url
    let shareURL = `https://${window.location.hostname}/?${listID}`;
    let myHTML = `
        <div class="app-modal text-light h-auto" id="modal-share-link">
            <h4 class="text-center">Share this address</h4>
            <div class="input-group mb-3 d-flex align-items-center">
                <input type="text" id="share-href-field" class="form-control font-weight-bold" placeholder="" value="${shareURL}" disabled>
                <div class="input-group-prepend">
                    <button class="btn btn-dark" type="button" onclick="copy_shared_link()">Copy</button>
                </div>
            </div>
        </div>`;

    $('body').append(myHTML);
    $('#modal-share-link').modal(
        {
            showClose: true,
            clickClose: true,
            fadeDuration: 200
        }
    );

    $('#modal-share-link').on($.modal.CLOSE, function (event, modal) {
        $(this).remove();
    });
}


// Render New Releases
function app_render_new_releases(page) {

    // Remove Share Button
    $('#share-href').remove();

    app_render_content_header('New Releases');


    // Add pagination to list
    switch (page) {
        case 1:
            appData.tempCurrentPage += 10;
            appData.tempCurrentPage = math_clamp(appData.tempCurrentPage, 0, 60);
            page = appData.tempCurrentPage;
            break;

        case -1:
            appData.tempCurrentPage -= 10;
            appData.tempCurrentPage = math_clamp(appData.tempCurrentPage, 0, 100);
            page = appData.tempCurrentPage;
            break;
    }

    let pageNumber = appData.tempCurrentPage / 10 + 1

    //        <li class="page-item"><a class="page-link" href="#">1</a></li>
    let HTML = `
    <ul class="pagination pl-2">
        <li class="page-item"><span class="page-link">Page: ${pageNumber}</span></li>
        <li class="page-item"><a class="page-link" onclick="app_render_new_releases(-1)" href="#">Previous</a></li>
        <li class="page-item"><a class="page-link" onclick="app_render_new_releases(1)"href="#">Next</a></li>
    </ul>`;

    $('.pagination').remove();
    $('#app-content-header').after(HTML);


    $('#app-content').empty();

    for (let i = 0 + page; i < 10 + page; i++) {

        // Title truncate
        let itemTitle = appData.newReleaseLibrary[i].title;
        if (itemTitle.length > 22) {
            itemTitle = itemTitle.slice(0, 22) + "...";
        }

        let itemImage = appData.newReleaseLibrary[i].image;
        let itemRuntime = appData.newReleaseLibrary[i].runtime;
        let itemType = appData.newReleaseLibrary[i].type;
        if (itemType === 'series') {
            itemRuntime = 'Series';
        }

        let myHTML = `
        <div class="card app-content-item">
            <img class="card-img-top loading" src="${itemImage}" alt="Card image cap">
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



// Render: Search Results
function app_render_search_results() {

    app_render_content_header("Search results");

    $('#app-content').empty();
    for (let i = 0; i < appData.searchLibrary.length; i++) {

        // Title truncate
        let itemTitle = appData.searchLibrary[i].title;
        if (itemTitle.length > 22) {
            itemTitle = itemTitle.slice(0, 22) + "...";
        }
        let itemRuntime = appData.searchLibrary[i].runtime;
        let myHTML = `
        <div class="card app-content-item">
            <img class="card-img-top loading" src="${appData.searchLibrary[i].image}" alt="Card image cap">
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
function app_render_binge() {


    // Update section header
    app_render_content_header("Binge");

    // Remove pagination
    $('.pagination').remove();

    // Clear original content
    $('#app-content').empty();


    // Display items from list if there are any
    if (appProfile.bingeLibrary > 0) {

        appProfile.bingeLibrary.forEach(function (data, index) {
            app_api_get_title_info(data);
        });
    }

    console.log(appProfile.bingeLibrary)

    // Display No items
    if (appProfile.bingeLibrary.length === 0) {

        let catName = "Binge Tracker"
        let myHTML = `
            <div class="alert alert-info w-100" role="alert">
                <P><i class="fas fa-exclamation-circle">&nbsp;</i>Oops! <b>${catName}</b> list is empty!</p>
            </div>`;
        $('#app-content').append(myHTML);
    }
}

// Render Favorites
function app_render_favorites(listIndex) {


    // Update section header
    app_render_content_header("Favorites");

    // Remove pagination
    $('.pagination').remove();

    // Clear original content
    $('#app-content').empty();


    // Display items from list if there are any
    if (appProfile.favLibrary[listIndex].catLibrary.length > 0) {

        // Render share link
        let shareLink = `<a id="share-href" class="btn btn-primary text-light mb-3 ml-2" href="#" role="button" onclick="app_render_modal_share_link(${listIndex})"><i class="fas fa-share-alt-square">&nbsp;</i>Share this list!</a>`
        $("#share-href").remove();
        $('#app-content-header').after(shareLink); 2

        // Check if list needs update
        if (appData.listNeedsUpdate) {
            appProfile.favLibrary[listIndex].catLibrary.forEach(function (data, index) {
                app_api_get_title_info(data, listIndex, index);
            });
            appData.listNeedsUpdate = false;
        } else {
            app_render_list_cached();
        }
    }

    // Display No items
    if (appProfile.favLibrary[listIndex].catLibrary.length === 0) {

        let catName = appProfile.favLibrary[listIndex].catName;
        let myHTML = `
        <div class="alert alert-info w-100" role="alert">
            <P><i class="fas fa-exclamation-circle">&nbsp;</i>Oops! <b>${catName}</b> list is empty!</p>
        </div>
        `;
        $('#app-content').append(myHTML);
    }
}

// Render Shared Link
function app_render_shared_link(listArray) {

    // SUPER HACK
    $('.app-content-left').hide();
    $('.app-container-profile-welcome').hide();
    $('.container-form').hide();

    // Update section header
    app_render_content_header("Shared Link");

    // Remove pagination
    $('.pagination').remove();

    // Clear original content
    $('#app-content').empty();


    // Display items from list if there are any
    if (listArray.length > 0) {
        listArray.forEach(function (data, index) {
            app_api_get_shared_link_info(data);
        });
    }

    // Display No items
    if (listArray === 0) {

        let catName = appProfile.favLibrary[listIndex].catName;
        let myHTML = `
        <div class="alert alert-info w-100" role="alert">
            <P><i class="fas fa-exclamation-circle">&nbsp;</i>Oops! <b>${catName}</b> list is empty!</p>
        </div>
        `;
        $('#app-content').append(myHTML);
    }
}

// Render Favorites Categories
function app_render_nav_favorites() {

    // Clear Navigation
    $('#app-nav-content').empty();

    appProfile.favLibrary.forEach(function (value, index) {
        let myHTML = `
            <div class="app-nav-box">
                <p><i class="fas fa-bookmark">&nbsp;</i><a href="#" onclick="app_render_favorites(${index})">${appProfile.favLibrary[index].catName}</a></p>
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
            <p><i class="fas fa-bookmark">&nbsp;</i><a href="#" onclick="app_render_favorites(${index})">${appProfile.favLibrary[index].catName}</a></p>
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

// Store selected item into local object
function app_list_display_add_item(item) {

    switch (appData.userActionLast) {

        case 'new':
            appData.itemModalStorage = appData.newReleaseLibrary[item];
            break;

        case 'search':
            appData.itemModalStorage = appData.searchLibrary[item];
            break;
    }

    app_render_modal_list_add();
}

// Store Local Data
function app_data_profile_store_local() {
    localStorage.setItem(appData.appPrefix, JSON.stringify(appProfile));
}

// Get Local Data
function app_data_profile_get_local() {
    appProfile = JSON.parse(localStorage.getItem(appData.appPrefix));
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

// --- General Utilities --- //

// Number Clamp
function math_clamp(val, min, max) {
    return Math.min(Math.max(min, val), max);
}
