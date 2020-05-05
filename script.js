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

//AJAX call by category (Food)
$(".food-dropdown").on("click", function() {
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
        $("#foodResults").empty();
        var ul = $("<ul>").addClass("mealList list-group");

        for (i=0; i<results.length; i++) {
            //area for food item - if clicked, popup recipe
            var li = $("<li>").addClass("mealItem list-group-item flex-fill");
            //append image
            var mealImg = $("<img>");
            mealImg.attr("src", results[i].strMealThumb);
            mealImg.attr("id", "listImage");
            li.append(mealImg);
            //append name
            var mealName = $("<button>").addClass("mealName btn btn-light");
            mealName.text(results[i].strMeal);
            mealName.attr("data-name", results[i].idMeal);
            li.append(mealName);
            
            ul.append(li);
        }

        $("#foodResults").append(ul);

        $(".mealName").on("click", function() {
            var id = $(this).attr("data-name");
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
    
})

//AJAX call by category (Drinks)
$(".drink-dropdown").on("click", function() {
    var category = $(this).attr("data-name");
    var queryURL = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=" + category;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(queryURL);
        console.log(response);

        //Results shown here
        var results = response.drinks;
        $("#drinkResults").empty();

        for (i=0; i<results.length; i++) {
            //area for food item
            var newDiv = $("<div>").addClass("drinkItem");
            //append image
            var drinkImg = $("<img>");
            drinkImg.attr("src", results[i].strDrinkThumb);
            drinkImg.attr("id", "listImage");
            newDiv.append(drinkImg);
            //append name - if clicked, triggers ajax call for recipe
            var drinkName = $("<div>").addClass("drinkName");
            drinkName.text(results[i].strDrink);
            drinkName.attr("id", results[i].idDrink);
            newDiv.append(drinkName);
            
            $("#drinkResults").append(newDiv);
        }
    })
})
