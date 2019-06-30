/// --- Core App Functions --- ///


function call_data() {
    $.ajax({
        url: "https://unogs-unogs-v1.p.rapidapi.com/aaapi.cgi?q=get%3Anew7-!1900,2018-!0,5-!0,10-!0-!Any-!Any-!Any-!gt100-!{downloadable}&t=ns&cl=all&st=adv&ob=Relevance&p=1&sa=and",
        headers: {
            'X-RapidAPI-Host':'unogs-unogs-v1.p.rapidapi.com',
            'X-RapidAPI-Key':'4d121bd4f5mshafce35864f40836p1d896cjsn949371756abd'
        },
    
        success: function(response) {
            console.log(response);
        }
    });
}


function app_profile_submit_name() {
    $('#app-stage-profile').fadeOut('fast', function() {
        
        $('#app-stage-profile-icon').fadeIn('fast');

    });

}

function app_profile_submit_icon() {
    
    $('#app-stage-profile-icon').fadeOut('fast', function() {
      
        $('#app-stage-content').fadeIn('fast');

    });
}