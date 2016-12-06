$(document).ready(function() {
    console.log("All wired up!!");
    $('#button').click(getMovies)

    function getMovies() {
        //$("button").click(function(){
        var answer = $("#input1").val()
        $('#content').empty()
        var url = `http://www.omdbapi.com/?s=${answer}`
        $.ajax(url)
            .then(function(movies) {

                var myMovies = movies.Search
                    //var faves = [];
                console.log("movies!: ", myMovies);

                for (var i = 0; i < myMovies.length; i++) {
                    var movie = myMovies[i];
                    //console.log("Movie: ", movie);
                    var movieTitle = movie.Title;

                    $.ajax(`http://www.omdbapi.com/?t=${movieTitle}&tomatoes=true&plot=full`)
                        .then(function(detailedMovie) {
                            //console.log("Detail: ", detailedMovie);


                            var detailedTitle = detailedMovie.Title;
                            var year = detailedMovie.Year;
                            var poster = detailedMovie.Poster;
                            var genre = detailedMovie.Genre;
                            var tomatoes = detailedMovie.tomatoMeter;
                            var actors = detailedMovie.Actors;
                            var plot = detailedMovie.Plot;


                            //template string:
                            if (poster == 'N/A') { //not working
                                poster = "https://www.petsgroomingprices.com/wp-content/uploads/2015/06/puppy-and-kitten.jpg";
                            };
                            $("#content").append(`
                          <div class="movie">
                          <h2>${detailedTitle}</h2>
                          <p id="fav">Add to Faves</p>
                          <img src=${poster} />
                          <p>Genre: ${genre}</p>
                          <p>Tomatoes: ${tomatoes}</p>
                          <p>Actors: ${actors}</p>
                          <p>Plot: ${plot}</p>
                          </div>`)

                            // $('#fav').click(function(){
                            // faves.push(detailedTitle)
                            //   console.log(faves);
                            // });

                        })

                }
            })
    };
});
