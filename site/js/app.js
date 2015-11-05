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
                console.log('prutje');

                 $.ajax({
                        type: "GET",
                        url: "http://localhost:3000/proxy/" + $("#uri").val() + "/infostore/20",
                        headers: {'X-SAP-LogonToken':response.xSapLogonToken},

                        contentType: "text/xml",
                        success: function(response) {
                            console.log(response);
                            $("#response").text(response);
                        }
                    });
            }
        });

    });

});