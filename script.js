//search meal by name
//https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata
//by category, area, ingredients lists
// https://www.themealdb.com/api/json/v1/1/list.php?c=list
// https://www.themealdb.com/api/json/v1/1/list.php?a=list
// https://www.themealdb.com/api/json/v1/1/list.php?i=list

//AJAX call by name
$(".foodBtn").on("click", function() {
    var name = $(".foodInput").val();
    var queryURL = "https://www.themealdb.com/api/json/v1/1/search.php?s=" + name;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
    })
})

//AJAX call by category
$(".dropdown-item").on("click", function() {
    var category = $(this).val();
    var queryURL = "https://www.themealdb.com/api/json/v1/1/filter.php?c=" + category;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
    })
})
