let query = "";
let queryURL = "";

$(document).ready(function() {
    $('#submit').on("click", function() {
        event.preventDefault();
        query = $('#name').val();
        console.log("Query: ", query);
        queryURL = "https://api.duckduckgo.com/?q=" + query + "&format=json&pretty=1";
        console.log("Query submitted.");
        $.ajax({
            url: queryURL,
            method: "GET"
          }).then(function(response) {
            console.log(response)
          });
    });
});

