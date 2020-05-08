// Below is the list of movie IDs from IMDB Top 250 movies. Data was pulled using Python
let movieArray = [
    111161,
    68646,
    71562,
    468569,
    50083,
    108052,
    167260,
    110912,
    60196,
    120737,
    137523,
    109830,
    1375666,
    80684,
    167261,
    133093,
    99685,
    73486,
    47478,
    114369,
    118799,
    317248,
    102926,
    38650,
    76759,
    6751668,
    120815,
    245429,
    120689,
    816692,
    110413,
    114814,
    56058,
    110357,
    120586,
    253474,
    103064,
    88763,
    27977,
    54215,
    172495,
    21749,
    407887,
    1675434,
    2582802,
    482571,
    64116,
    95327,
    34583,
    7286456,
    95765,
    47396,
    78748,
    78788,
    209144,
    82971,
    32553,
    405094,
    1853728,
    66763,
    50825,
    81505,
    4154756,
    910970,
    43014,
    4633694,
    119698,
    57012,
    364569,
    51201,
    4154796,
    1345836,
    87843,
    90605,
    5311514,
    2380307,
    169547,
    112573,
    82096,
    1187043,
    114709,
    8579674,
    57565,
    986264,
    86190,
    86879,
    105236,
    361748,
    119217,
    62622,
    52357,
    180093,
    22100,
    5074352,
    338013,
    33467,
    8267604,
    2106476,
    93058,
    53125,
    66921,
    40522,
    12349,
    208092,
    45152,
    86250,
    75314,
    211915,
    56172,
    70735,
    435761,
    17136,
    44741,
    59578,
    1832382,
    36775,
    53604,
    1255953,
    56592,
    97576,
    1049413,
    119488,
    113277,
    71853,
    95016,
    42876,
    55630,
    372784,
    91251,
    6966692,
    118849,
    363163,
    105695,
    53291,
    347149,
    89881,
    57115,
    42192,
    268978,
    112641,
    457430,
    96283,
    1305806,
    120735,
    81398,
    993846,
    55031,
    40897,
    469494,
    476735,
    5027774,
    15864,
    71315,
    46912,
    434409,
    50976,
    477348,
    2096673,
    1291584,
    1130884,
    117951,
    80678,
    167404,
    84787,
    31381,
    3170832,
    107290,
    50986,
    83658,
    50212,
    266543,
    79944,
    47296,
    41959,
    116282,
    266697,
    120382,
    1205489,
    46438,
    77416,
    353969,
    3011894,
    4729430,
    8108198,
    116231,
    118715,
    978762,
    107207,
    2267998,
    35446,
    2119532,
    2278388,
    1950186,
    60827,
    112471,
    264464,
    892769,
    17925,
    31679,
    15324,
    1392214,
    2024544,
    61512,
    1392190,
    72684,
    46268,
    74958,
    92005,
    758758,
    405159,
    79470,
    1028532,
    91763,
    52618,
    1979320,
    19254,
    3315342,
    97165,
    1201607,
    60107,
    53198,
    395169,
    245712,
    405508,
    1895587,
    87544,
    4016934,
    75148,
    32976,
    8613070,
    198781,
    113247,
    25316,
    1954470,
    118694,
    381681,
    93779,
    1454029,
    87884,
    4857264,
    4430212,
    43338,
    88247,
    169102,
    2758880,
    64115,
    2338151,
    103639,
    94625,
    40725]

// Random Number Selector 0-249
function randomNumber () {
    return Math.floor(Math.random() * 250);
}

// Digit Counter *(some of the IDs that were pulled from Python is missing zeros in the beginning of the ID, ID has to be 7 digits total)
function countDigits(n) {
    var count = 0;
    if (n >= 1) ++count;
  
    while (n / 10 >= 1) {
      n /= 10;
      ++count;
    }
  
    return count;
}

// Random movie btn and the respective results that will be displayed
$("#randomMovieBtn").on("click", function(event) {
    event.preventDefault();
    var random = movieArray[randomNumber()];
        // Adding one zero if number is only 6 digits *ID has to be 7 digits and the zeros were lost during Python data scrape
        if (countDigits(random) === 6) {
            random = "0" + random;
        }

        // Adding two zeros if number is only 5 digits *ID has to be 7 digits and the zeros were lost during Python data scrape
        else if (countDigits(random) === 5) {
            random = "00" + random;
        }
            var movieQueryURL = "https://www.omdbapi.com/" + "?i=tt" + random + "&apikey=ff3a28cb";
            $.ajax({
                url: movieQueryURL,
                method: "GET"
            }).then(function(response) {
                console.log(movieQueryURL);
                console.log(response);

                var movieDiv = $("<div class='movie'>");

                var posterResult = response.Poster;
                var posterImage = $("<img>").attr("src", posterResult);
                movieDiv.append(posterImage);

                var titleResult = response.Title;
                var pTitle = $("<h6>").text("Title: " + titleResult);
                movieDiv.append(pTitle);

                var yearResult = response.Year;
                var pYear = $("<p>").text("Release Year: " + yearResult);
                movieDiv.append(pYear);

                var ratedResult = response.Rated;
                var pRated = $("<p>").text("Rated: " + ratedResult);
                movieDiv.append(pRated);

                var ratingResult = response.imdbRating;
                var pRating = $("<p>").text("IMDB Rating: " + ratingResult);
                movieDiv.append(pRating);

                var plotResult = response.Plot;
                var pPlot = $("<p>").text("Plot: " + plotResult);
                movieDiv.append(pPlot);

                $("#movieResults").empty();
                $("#movieResults").prepend(movieDiv);
            })
})
