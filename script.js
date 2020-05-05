//AJAX call by name
$(".foodBtn").on("click", function() {
    var name = $(".foodInput").val();
    var queryURL = "https://www.themealdb.com/api/json/v1/1/search.php?s=" + name;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(queryURL);
        console.log(response); 
    })
})

//AJAX call by category
$(".dropdown-item").on("click", function() {
    var category = $(this).attr("data-name");
    var queryURL = "https://www.themealdb.com/api/json/v1/1/filter.php?c=" + category;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(queryURL);
        console.log(response);

        //Results shown here
        var results = response.meals;
        for (i=0; i<results.length; i++) {
            //area for food item
            var newDiv = $("<div>").addClass("mealItem");
            //append image
            var mealImg = $("<img>");
            mealImg.attr("src", results[i].strMealThumb);
            mealImg.attr("id", "listImage");
            newDiv.append(mealImg);
            //append name - if clicked, triggers ajax call for recipe
            var mealName = $("<div>").addClass("mealName");
            mealName.text(results[i].strMeal);
            mealName.attr("id", results[i].idMeal);
            newDiv.append(mealName);
            
            $("#foodResults").append(newDiv);
        }
    })
    
    $(".mealItem").on("click", function() {
        console.log("click");
        var id = $(this).attr("id");
        var queryURL = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id;
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            console.log(queryURL);
            console.log(response);
            //modal pop-up here
        })
    })
})



