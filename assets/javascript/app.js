let query = "";
let queryURL = "";
let text;

$(document).ready(function () {
  $('form').on("submit", function () {
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
    }).then(function (response) {
      // console.log(response);
      text = JSON.parse(response);

      // Debugging
      // console.log(text);
      console.log(text.RelatedTopics);

      // Call for Stiff Image (Use this if GIPHY doesn't work)
      // $('#image').attr("src", text.RelatedTopics[0].Icon.URL);

      // Empty the results so that we can append new ones from the new search.
      $('#results').empty();

      // Let's return only 3 results.
      for (let i = 0; i < 3; i++) {

        // Post will be an object containing different search results.
        let post = text.RelatedTopics[i];

        // Debugging
        // console.log(post);

        // k cycles through the post object to check for specific properties
        for (let k in post){

          // we want to append the text to the newly made box
          if (k == "Text"){
            $('#results').append("<div id='box" + i + "' class='box'></div>");

            // we want to get rid of the text in front of each paragraph so it looks cleaner
            let phrase = post.FirstURL.split("m/");

            // Debugging
            console.log("Phrase: ", phrase);
            console.log("post[k]: ", post[k]);

            // this gets rid of the text in front of the paragraph
            post[k] = post[k].slice(phrase[1].length);

            // this makes sure that no more added text is shown in front of the paragraph
            let final = post[k].split("g)");

            // Debugging
            console.log("Phrase Length: ", phrase[1].length);

            // this is for the case that we didn't need to do a split in the first place
            if (final[1] != undefined){
              $('#box' + i).append("<p class='description'>" + final[1] + "</p>");
            } 
            // this is if the split was successful
            else {
              $('#box' + i).append("<p class='description'>" + final[0] + "</p>");
            }
            console.log(post[k]);
            console.log(post[k].includes("..."));
            if (post[k].includes("...")) {
                $(('#box' + i) + " .description").append("<a href=" + post.FirstURL + ">Read more</a>");
                console.log(post.FirstURL);
            }
            } 
            // we grab the picture too if there is one
            else if (k == "Icon"){

              // Debugging
              console.log("Photo: ", post[k].URL);
              if (post[k].URL.length > 0){
                $('#box' + i).append("<img class='photo' src='" + post[k].URL + "'>");
              }
             else {
              $('#box' + i).append("<img class='photo' src='assets/images/missingpic.png'>");
             }
            }   
          }
        }
          
    }).catch((err) => {
      console.warn(err);
      $('#results').html("<p>It looks like the query didn't work. Did you try: </p><ul><li>Putting something in the search bar? (Don't leave it empty!)</li><li>Clearing your cache? (Duckduckgo is finicky sometimes.)</li></ul><p>If those don't work, try a different query. :)</p>")
    });


        let gifURL = "https://api.giphy.com/v1/gifs/search?q=" + query + "&api_key=9r7NcqflJmMVXoySzh8zg8XfGjFliOaS";

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

            while (result[counter].rating != "g") {
                counter++;
            }

            $('#image').attr("src", result[counter].images.fixed_height.url);



        }).catch((err) => { console.warn(err); $('#image').html("<p>GIF Not Shown</p>") });


    });
});

