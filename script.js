//Array of food searches
var savedFoodSearches = localStorage.getItem("savedFoodSearches") ? JSON.parse(localStorage.getItem("savedFoodSearches")) : [];

//Array of drink searches
var savedDrinkSearches = localStorage.getItem("savedDrinkSearches") ? JSON.parse(localStorage.getItem("savedDrinkSearches")) : [];

//Show saved food searches
function showSavedFoodSearches() {
    $("#savedFoodResults").empty();
    for (i=0; i<savedFoodSearches.length; i++) {
        savedFoodSearches = JSON.parse(localStorage.getItem("savedFoodSearches"));
        var savedItem = $("<button>").text(savedFoodSearches[i].name);
        savedItem.addClass("savedRecipe btn btn primary rounded");
        savedItem.attr("data-name", savedFoodSearches[i].id);
        savedItem.attr("id", savedFoodSearches[i].name);
        savedItem.attr("data-state", "saved");
        savedItem.attr("data-toggle", "modal");
        savedItem.attr("data-target", "#staticBackdrop");
        $("#savedFoodResults").append(savedItem);

        $(".savedRecipe").on("click", function() {
            var id = $(this).attr("data-name");
            var mealURL = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id;
            $.ajax({
                url: mealURL,
                method: "GET"
            }).then(function(response) {
                console.log(mealURL);
                console.log(response);
                
                var dishName = response.meals[0].strMeal;
                $(".modal-title").text(dishName);

                $("#dishImgDiv").empty();
                var dishImg = $("<img>");
                var imgURL = response.meals[0].strMealThumb;
                dishImg.attr("src", imgURL);
                dishImg.attr("width", "100px");
                $("#dishImgDiv").append(dishImg);

                $("#ingredientsList").empty();
                var ingredientListEl = $("<ul>").addClass("listEl");
                // ingredient list

                var ingredient = [];

                for (var i = 1; i < 20; i++) {
                    if (response.meals[0]["strIngredient" +i] === "") {
                        console.log(i)
                    } else {
                        ingredient[i] = $("<li>");
                        ingredient[i].text(response.meals[0]["strIngredient" +i]);
                        ingredientListEl.append(ingredient[i]);
                        }
                    }
                
                $("#ingredientsList").append(ingredientListEl);

                $("#instructions").empty();
                var dishInstructions = response.meals[0].strInstructions;
                $("#instructions").text(dishInstructions);

            })
        })
    }
}

function showSavedDrinkSearches() {
    $("#savedDrinkResults").empty();
    for (i=0; i<savedDrinkSearches.length; i++) {
        savedDrinkSearches = JSON.parse(localStorage.getItem("savedDrinkSearches"));
        var savedItem = $("<button>").text(savedDrinkSearches[i].name);
        savedItem.addClass("savedRecipe btn btn primary rounded");
        savedItem.attr("data-name", savedDrinkSearches[i].id);
        savedItem.attr("id", savedDrinkSearches[i].name);
        savedItem.attr("data-state", "saved");
        savedItem.attr("data-toggle", "modal");
        savedItem.attr("data-target", "#staticBackdrop");
        $("#savedDrinkResults").append(savedItem);

        $(".savedRecipe").on("click", function() {
            var id = $(this).attr("data-name");
            var drinkURL = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + id;
            $.ajax({
                url: drinkURL,
                method: "GET"
            }).then(function(response) {
                console.log(drinkURL);
                console.log(response);
                
                var drinkName = response.drinks[0].strDrink;
                $(".modal-title").text(drinkName);

                $("#drinkImgDiv").empty();
                var drinkImg = $("<img>");
                var imgURL = response.drinks[0].strDrinkThumb;
                drinkImg.attr("src", imgURL);
                drinkImg.attr("width", "100px");
                $("#drinkImgDiv").append(drinkImg);

                $("#ingredientsList").empty();
                var ingredientListEl = $("<ul>").addClass("listEl");
                // ingredient list

                var ingredient = [];

                for (var i = 1; i < 20; i++) {
                    if (response.drinks[0]["strIngredient" +i] === "") {
                        console.log(i)
                    } else {
                        ingredient[i] = $("<li>");
                        ingredient[i].text(response.drinks[0]["strIngredient" +i]);
                        ingredientListEl.append(ingredient[i]);
                        }
                    }
                
                $("#ingredientsList").append(ingredientListEl);

                $("#instructions").empty();
                var drinkInstructions = response.drinks[0].strInstructions;
                $("#instructions").text(drinkInstructions);

            })
        })
    }
}

//AJAX call by name
// $(".foodBtn").on("click", function() {
//     var name = $(".foodInput").val();
//     var queryURL = "https://www.themealdb.com/api/json/v1/1/search.php?s=" + name;
//     $.ajax({
//         url: queryURL,
//         method: "GET"
//     }).then(function(response) {
//         console.log(queryURL);
//         console.log(response); 
//     })
// })

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
        
        for (let i=0; i<results.length; i++) {
            //area for food item - if clicked, popup recipe
            var li = $("<li>").addClass("mealItem list-group-item flex-fill");
            //append image: id=id#, data-name=meal name
            var wrapper = $("<div>").addClass("container imgWrap");
            wrapper.html(`<img src=${results[i].strMealThumb} id="listImage"/><button class="btn saveBtnFood" id=${results[i].idMeal} data-name="${results[i].strMeal}" data-state="unsaved">Save</button>`);
            //if already saved before, data-state=saved
            for (let j=0; j<savedFoodSearches.length; j++) {
                var prevState = savedFoodSearches[j].state;
                if (prevState==="saved") {
                    $(".saveBtnFood").attr("data-state", "saved");
                }
            }
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
            //Object with id# and meal name
            var selected = {id: $(this).attr("id"), name: $(this).attr("data-name"), state: $(this).attr("data-state")};
            
            //saving a recipe
            if ($(this).attr("data-state") === "unsaved") {
                $(this).text("Saved!");
                $(this).addClass("clickedBtn");
                                            
                
                $(this).attr("data-state", "saved");
                selected.state = "saved";
                for (i=0; i<savedFoodSearches.length; i++) {
                    if (savedFoodSearches[i].id===selected.id) {
                        savedFoodSearches.splice(i, 1);
                    }
                }
                savedFoodSearches.push(selected);
                           
                localStorage.setItem("savedFoodSearches", JSON.stringify(savedFoodSearches));
            }

            //Unsaving a recipe
            else{
                $(this).text("Save");
                $(this).removeClass("clickedBtn");
                
                const index = savedFoodSearches.findIndex(obj => obj.id === selected.id);
                
                // make new object of updated object.
                const removedItem = { ...savedFoodSearches[index], state: "unsaved"};
                
                // make final new array of objects by combining updated object.
                const newSavedArr = [
                    ...savedFoodSearches.slice(0, index),
                    ...savedFoodSearches.slice(index + 1),
                ];
                
                //Remove item from array and update local storage
                $(this).attr("data-state", "unsaved");
                localStorage.setItem("savedFoodSearches", JSON.stringify(newSavedArr));
            }
            showSavedFoodSearches();
        })

        //Click name to see recipe
        $(".mealName").on("click", function() {
            var id = $(this).attr("data-name");
            var mealURL = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id;
            $.ajax({
                url: mealURL,
                method: "GET"
            }).then(function(response) {
                console.log(mealURL);
                console.log(response);
                
                var dishName = response.meals[0].strMeal;
                $(".modal-title").text(dishName);

                $("#dishImgDiv").empty();
                var dishImg = $("<img>");
                var imgURL = response.meals[0].strMealThumb;
                dishImg.attr("src", imgURL);
                dishImg.attr("width", "100px");
                $("#dishImgDiv").append(dishImg);

                $("#ingredientsList").empty();
                var ingredientListEl = $("<ul>").addClass("listEl");
                // ingredient list

                var ingredient = [];

                for (var i = 1; i < 20; i++) {
                    if (response.meals[0]["strIngredient" +i] === "") {
                        console.log(i)
                    } else {
                        ingredient[i] = $("<li>");
                        ingredient[i].text(response.meals[0]["strIngredient" +i]);
                        ingredientListEl.append(ingredient[i]);
                        }
                    }
                
                $("#ingredientsList").append(ingredientListEl);

                $("#instructions").empty();
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
        var ul = $("<ul>").addClass("drinkList list-group");

        for (let i=0; i<results.length; i++) {
            //area for drink item - if clicked, popup recipe
            var li = $("<li>").addClass("drinkItem list-group-item flex-fill");
            //append image: id=id#, data-name=meal name
            var wrapper = $("<div>").addClass("container imgWrap");
            wrapper.html(`<img src=${results[i].strDrinkThumb} id="listImage"/><button class="btn saveBtnDrink" id=${results[i].idDrink} data-name="${results[i].strDrink}" data-state="unsaved">Save</button>`);
            li.append(wrapper);
            //append name
            var drinkName = $("<button>").addClass("drinkName btn btn-light");
            drinkName.text(results[i].strDrink);
            drinkName.attr("data-name", results[i].idDrink);
            drinkName.attr("data-toggle", "modal");
            drinkName.attr("data-target", "#staticBackdrop");
            li.append(drinkName);
            
            ul.append(li);
        }

        $("#drinkResults").append(ul);

        //Click save button to save/unsave recipe
        $(".saveBtnDrink").on("click", function() {
            //Object with id# and drink name
            var selected = {id: $(this).attr("id"), name: $(this).attr("data-name"), state: $(this).attr("data-state")};
            
            //saving a recipe
            if ($(this).attr("data-state") === "unsaved") {
                $(this).text("Saved!");
                $(this).addClass("clickedBtn");
                                            
                
                $(this).attr("data-state", "saved");
                selected.state = "saved";
                for (i=0; i<savedDrinkSearches.length; i++) {
                    if (savedDrinkSearches[i].id===selected.id) {
                        savedDrinkSearches.splice(i, 1);
                    }
                }
                savedDrinkSearches.push(selected);
                           
                localStorage.setItem("savedDrinkSearches", JSON.stringify(savedDrinkSearches));
            }

            //Unsaving a recipe
            else{
                $(this).text("Save");
                $(this).removeClass("clickedBtn");
                
                const index = savedDrinkSearches.findIndex(obj => obj.id === selected.id);
                
                // make new object of updated object.
                const removedItem = { ...savedDrinkSearches[index], state: "unsaved"};
                
                // make final new array of objects by combining updated object.
                const newSavedArr = [
                    ...savedDrinkSearches.slice(0, index),
                    ...savedDrinkSearches.slice(index + 1),
                ];
                
                //Remove item from array and update local storage
                $(this).attr("data-state", "unsaved");
                localStorage.setItem("savedDrinkSearches", JSON.stringify(newSavedArr));
            }
            showSavedDrinkSearches();
        })


    // click name to see drink recipe
    $(".drinkName").on("click", function() {
        var id = $(this).attr("data-name");
        var drinkURL = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + id;
        $.ajax({
            url: drinkURL,
            method: "GET"
        }).then(function(response) {
            console.log(queryURL);
            console.log(response);
            
            var drinkName = response.drinks[0].strDrink;
            $(".modal-title").text(drinkName);

            $("#drinkImgDiv").empty();
            var drinkImg = $("<img>");
            var imgURL = response.drinks[0].strDrinkThumb;
            drinkImg.attr("src", imgURL);
            drinkImg.attr("width", "100px");
            $("#drinkImgDiv").append(drinkImg);

            $("#ingredientsList").empty();
            var ingredientListEl = $("<ul>").addClass("listEl");
            // ingredient list

            var ingredient = [];

            for (var i = 1; i < 15; i++) {
                if (response.drinks[0]["strIngredient" +i] === null) {
                    console.log(i)
                } else {
                    ingredient[i] = $("<li>");
                    ingredient[i].text(response.drinks[0]["strIngredient" +i]);
                    ingredientListEl.append(ingredient[i]);
                    }
                }
            
            $("#ingredientsList").append(ingredientListEl);

            $("#instructions").empty();
            var drinkInstructions = response.drinks[0].strInstructions;
            $("#instructions").text(drinkInstructions);

        })
    })

        })
})

// Clear Results Button
function clearFood () {
    $("#foodResults").empty();
}

function clearDrink () {
    $("#drinkResults").empty();
}

$("#clear-food-btn").on("click", clearFood);


$("#clear-drink-btn").on("click", clearDrink);

showSavedFoodSearches();

showSavedDrinkSearches();