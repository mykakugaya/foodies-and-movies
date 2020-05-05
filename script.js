//search meal by name
//https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata
//by category, area, ingredients lists
// https://www.themealdb.com/api/json/v1/1/list.php?c=list
// https://www.themealdb.com/api/json/v1/1/list.php?a=list
// https://www.themealdb.com/api/json/v1/1/list.php?i=list

$(".foodBtn").on("click", function() {
    var category = 
    queryURL = 
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
    })
})
