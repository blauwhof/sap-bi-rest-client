$( document ).ready(function() {

    $("#get-data-button").click(function() {

        var data = "<iets>hallo</iets>";
        var uri = $("#url").val + '/logon/long'
        $.ajax({
            type: "GET",
            url: "http://localhost:3000/api?username=" + $("#username").val() + "&password=" + $("#password").val() + "&uri=" + $("#uri").val(),
            contentType: "application/json",
            success: function(response) {
                console.log(response);
            }
        });

    });

});