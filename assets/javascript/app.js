let query = "";
let queryURL = "";
let text;

<<<<<<< HEAD
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
          }).then(function(response) {
            console.log(response);
            text = JSON.parse(response);

            // Debugging
            // console.log(text);
            console.log(text.RelatedTopics);

            // Call for Stiff Image (Use this if GIPHY doesn't work)
            // $('#image').attr("src", text.RelatedTopics[0].Icon.URL);

            $('#results').empty();
            for (let i = 0; i < 3; i++) {
                let post = text.RelatedTopics[i];
                // console.log(post);
                for (let k in post) {
                    if (k == "Text") {
                        $('#results').append("<div id='box" + i + "' class='box'></div>");
                        let phrase = post.FirstURL.split("m/");
                        console.log("Phrase: ", phrase);
                        console.log("post[k]: ", post[k]);
                        post[k] = post[k].slice(phrase[1].length);
                        let final = post[k].split("g)");
                        console.log("Phrase Length: ", phrase[1].length);
                        if (final[1] != undefined) {
                            $('#box' + i).append("<p class='description'>" + final[1] + "</p>");
                        }
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
                    else if (k == "Icon") {
                        console.log("Photo: ", post[k].URL);
                        $('#box' + i).append("<img class='photo' src='" + post[k].URL + "'>");
                    }
                }
            }
=======
      $('#results').empty();
      for (let i = 0; i < 3; i++) {
        let post = text.RelatedTopics[i];
        // console.log(post);
        for (let k in post){
          if (k == "Text"){
            $('#results').append("<div id='box" + i + "' class='box'></div>");
            let phrase = post.FirstURL.split("m/");
            console.log("Phrase: ", phrase);
            console.log("post[k]: ", post[k]);
            post[k] = post[k].slice(phrase[1].length);
            let final = post[k].split("g)");
            console.log("Phrase Length: ", phrase[1].length);
            if (final[1] != undefined){
              $('#box' + i).append("<p class='description'>" + final[1] + "</p>");
            } else {
              $('#box' + i).append("<p class='description'>" + final[0] + "</p>");
            }
           
            } 
            else if (k == "Icon"){
              console.log("Photo: ", post[k].URL);
              $('#box' + i).append("<img class='photo' src='" + post[k].URL + "'>");
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

      while (result[counter].rating != "g") {
        counter++;
      }

      $('#image').attr("src", result[counter].images.fixed_height.url);



    }).catch((err) => { console.warn(err); $('#image').html("<p>GIF Not Shown</p>") });


  });
});
>>>>>>> parent of 0f7a65a... Added hopefully useful comments :)

        }).catch((err) => {
            console.warn(err);
            $('#results').html("<p>It looks like the query didn't work. Did you try: </p><ul><li>Putting something in the search bar? (Don't leave it empty!)</li><li>Clearing your cache? (Duckduckgo is finicky sometimes.)</li></ul><p>If those don't work, try a different query. :)</p>")
        });
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