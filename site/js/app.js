$( document ).ready(function() {

    $("#get-data-button").click(function() {

        var data = "<iets>hallo</iets>";

        $.ajax({
            type: "POST",
            url: "http://localhost:3000/api",
            data: data,
            success: function(response) {
                console.log(response);
            },
            dataType: 'xml'
        });

    });

});