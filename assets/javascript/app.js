let query = "";
let queryURL = "";
let text;

$(document).ready(function () {
    $('form').on("submit", function () {
=======
$(document).ready(function() {
    $('#submit').on("click", function() {
        event.preventDefault();
        query = $('#name').val();

        // Debugging
        // console.log("Query: ", query);

        queryURL = "https://api.duckduckgo.com/?q=" + query + "&format=json&pretty=1";

        // Debugging
        // console.log("Query submitted.");
    
          $.ajax({
            url: queryURL,
            method: "GET"
          }).then(function(response) {
            console.log(response);
            text = JSON.parse(response);

            // Debugging
            // console.log(text);
            // console.log(text.RelatedTopics);


        $.ajax({
            url: gifURL,
            method: "GET"
        }).then(function (resp) {
            // console.log(resp);
            result = resp.data;
            // console.log(result);
            let counter = 0;
            anime({
                targets: '#image',
                translateX: 0,
                scale: 1,
                rotate: '1turn',
                duration: 10000,
              });
=======
            // goThroughResults(text.RelatedTopics);
            // $('#results').text(text.RelatedTopics[0].Text);

            for (let i = 0; i < text.RelatedTopics.length; i++){
              if (typeof text.RelatedTopics[i].Text != undefined){
                $('#results').append("<p>" + text.RelatedTopics[i].Text + "</p>");
              }         
            }
          }).catch((err) => console.warn(err), $('#results').html("<p>It looks like the query didn't work. Did you try: </p><ul><li>Putting something in the search bar? (Don't leave it empty!)</li><li>Clearing your cache? (Duckduckgo is finicky sometimes.)</li></ul><p>If those don't work, try a different query. :)</p>"));
    });
});

