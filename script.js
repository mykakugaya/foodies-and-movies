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
            var wrapper = $("<div>").addClass("container imgWrap");
            wrapper.html(`<img src=${results[i].strMealThumb} id="listImage"/><button class="btn saveBtnFood" id="btn" data-state="unsaved">Save</button>`);
            li.append(wrapper);
            //append name
            var mealName = $("<button>").addClass("mealName btn btn-light");
            mealName.text(results[i].strMeal);
            mealName.attr("data-name", results[i].idMeal);
            mealName.attr("data-toggle", "modal");
            mealName.attr("data-target", "#staticBackdrop");
            li.append(mealName);
            
            ul.append(li);
        }

        $("#foodResults").append(ul);

        //Click save button to save/unsave recipe
        $(".saveBtnFood").on("click", function() {
            var selected = $(this).attr("id");

            if ($(this).attr("data-state") === "unsaved") {
                $(this).text("Saved!");
                $(this).attr("data-state", "saved");
                $(this).addClass("clickedBtn");
            }
            else{
                $(this).text("Save");
                $(this).attr("data-state", "unsaved");
                $(this).removeClass("clickedBtn");
            }

            //append to saved recipes and save to local storage
        })

        //Click name to see recipe
        $(".mealName").on("click", function() {
            var id = $(this).attr("data-name");
            var mealURL = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id;
            $.ajax({
                url: mealURL,
                method: "GET"
            }).then(function(response) {
                console.log(queryURL);
                console.log(response);
                
                var dishName = response.meals[0].strMeal;
                $(".modal-title").text(dishName);

                var dishImg = $("<img>");
                var imgURL = response.meals[0].strMealThumb;
                dishImg.attr("src", imgURL);
                dishImg.attr("width", "100px");
                $("#dishImgDiv").append(dishImg);

                var ingredientListEl = $("<ul>").addClass("listEl");
                // ingredient list
                var ingredient1 = $("<li>");
                ingredient1.text(response.meals[0].strIngredient1);
                ingredientListEl.append(ingredient1);

                var ingredient2 = $("<li>");
                ingredient2.text(response.meals[0].strIngredient2);
                ingredientListEl.append(ingredient2);

                var ingredient3 = $("<li>");
                ingredient3.text(response.meals[0].strIngredient3);
                ingredientListEl.append(ingredient3);

                var ingredient4 = $("<li>");
                ingredient4.text(response.meals[0].strIngredient4);
                ingredientListEl.append(ingredient4);

                var ingredient5 = $("<li>");
                ingredient5.text(response.meals[0].strIngredient5);
                ingredientListEl.append(ingredient5);

                var ingredient6 = $("<li>");
                ingredient6.text(response.meals[0].strIngredient6);
                ingredientListEl.append(ingredient6);

                var ingredient7 = $("<li>");
                ingredient7.text(response.meals[0].strIngredient7);
                ingredientListEl.append(ingredient7);

                var ingredient8 = $("<li>");
                ingredient8.text(response.meals[0].strIngredient8);
                ingredientListEl.append(ingredient8);

                var ingredient9 = $("<li>");
                ingredient9.text(response.meals[0].strIngredient9);
                ingredientListEl.append(ingredient9);

                var ingredient10 = $("<li>");
                ingredient10.text(response.meals[0].strIngredient10);
                ingredientListEl.append(ingredient10);

                $("#ingredientsList").append(ingredientListEl);

                var dishInstructions = response.meals[0].strInstructions;
                $("#instructions").text(dishInstructions);

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
