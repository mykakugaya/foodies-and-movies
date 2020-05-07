//Array of food searches
var savedSearches = localStorage.getItem("savedSearches") ? JSON.parse(localStorage.getItem("savedSearches")) : [];

let x = [
    {
        id: 0,
        name: "hello"
    },
    {
        id: 1,
        name: "world"
    }
]

//Show saved searches
// var x = [1,2,3,4]
// var y = x.map(callback => callback + 5)
// console.log(y);
function showSavedFoodSearches() {
    for (i=0; i<savedSearches.length; i++) {
        var savedItem = $("<button>").text(savedSearches[i].name);
        savedItem.addClass("savedRecipe btn btn primary rounded");
        savedItem.attr("data-name", savedSearches[i].id);
        savedItem.attr("id", savedSearches[i].name);
        savedItem.attr("data-state", "saved");
        $("#savedFoodResults").append(savedItem);
    }
}

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
        
        for (let i=0; i<results.length; i++) {
            //area for food item - if clicked, popup recipe
            var li = $("<li>").addClass("mealItem list-group-item flex-fill");
            //append image: id=id#, data-name=meal name
            var wrapper = $("<div>").addClass("container imgWrap");
            wrapper.html(`<img src=${results[i].strMealThumb} id="listImage"/><button class="btn saveBtnFood" id=${results[i].idMeal} data-name="${results[i].strMeal}" data-state="unsaved">Save</button>`);
            //if already saved before, data-state=saved
            for (let j=0; j<savedSearches.length; j++) {
                var prevState = savedSearches[j].state;
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
            //Saving a recipe
            // if ($(this).attr("data-state") === "unsaved") {
            //     $(this).text("Saved!");
            //     $(this).addClass("clickedBtn");
            //     //button data-state
            //     $(this).attr("data-state", "saved");
            //     //savedSearches object state
            //     selected.state = "saved";

            //     var oldSelected = selected;
            //     var index = savedSearches.indexOf(oldSelected);
            //     //if this item was already in savedSearches, remove and push new
            //     if (index > -1) {
            //         oldSelected.state = "unsaved";
            //         savedSearches.splice(index, 1);
            //         savedSearches.push(selected);
            //         localStorage.setItem("savedSearches", JSON.stringify(savedSearches));
            //     } else {
            //         savedSearches.push(selected);
            //         localStorage.setItem("savedSearches", JSON.stringify(savedSearches));
            //     }
            // }
            // //Unsaving a recipe
            // else{
            //     $(this).text("Save");
            //     $(this).removeClass("clickedBtn");
            //     $(this).attr("data-state", "unsaved");
            //     selected.state = "unsaved";

            //     var old = selected;
                
            //     //Remove item from array and update local storage
            //     var index = savedSearches.indexOf(old);
            //     if (index > -1) {
            //         // old.state = "saved";
            //         savedSearches.splice(index, 1);
            //         localStorage.setItem("savedSearches", JSON.stringify(savedSearches));
            //     }
            // }
            // showSavedFoodSearches();

            //Saving a recipe
            // if ($(this).attr("data-state") === "unsaved") {
            //     $(this).text("Saved!");
            //     $(this).addClass("clickedBtn");
            //     //button data-state
                
            //     var index = savedSearches.indexOf(selected);
                
            //     let new_array = savedSearches.map(function(x) {
            //         return x;
            //     });
                
            //     if (index > -1) {
            //         new_array.splice(index, 1);
            //         // selected.state = "saved";
            //         $(this).attr("data-state", "saved");
            //         new_array.push(selected);
            //         localStorage.setItem("savedSearches", JSON.stringify(new_array));
            //     }
            //     else {
            //         $(this).attr("data-state", "saved");
            //         // selected.state = "saved";
            //         new_array.push(selected);
            //         localStorage.setItem("savedSearches", JSON.stringify(new_array));
            //     }
            // }

            // //Unsaving a recipe
            // else{
            //     $(this).text("Save");
            //     $(this).removeClass("clickedBtn");

            //     var index = savedSearches.indexOf(selected);
                
            //     let other_array = savedSearches.map(function(x) {
            //         return x;
            //     });

            //     //Remove item from array and update local storage
            //     other_array.splice(index, 1);
            //     $(this).attr("data-state", "unsaved");
            //     // selected.state = "unsaved";
            //     localStorage.setItem("savedSearches", JSON.stringify(other_array));
            // }
            // showSavedFoodSearches();

            //saving
            if ($(this).attr("data-state") === "unsaved") {
                $(this).text("Saved!");
                $(this).addClass("clickedBtn");
                                
                // make final new array of objects by combining updated object.
                var index = savedSearches.indexOf(selected);
                
                let new_array = savedSearches.map(function(x) {
                    return x;
                });
                
                $(this).attr("data-state", "saved");         
                if (index > -1) {
                    new_array.splice(index, 1);
                    // selected.state = "saved";
                    // $(this).attr("data-state", "saved");
                    new_array.push(selected);
                    console.log(new_array, "if");
                    localStorage.setItem("savedSearches", JSON.stringify(new_array));
                }
                else {
                    // $(this).attr("data-state", "saved");
                    // selected.state = "saved";
                    new_array.push(selected);
                    console.log(new_array, "else");
                    localStorage.setItem("savedSearches", JSON.stringify(new_array));
                }
            
                // savedSearches.push(selected);

                // localStorage.setItem("savedSearches", JSON.stringify(savedSearches));
            }

            //Unsaving a recipe
            else{
                $(this).text("Save");
                $(this).removeClass("clickedBtn");
                $(this).attr("data-state", "unsaved");

                const index = savedSearches.findIndex(obj => obj.id === selected.id);

                // make new object of updated object.
                const removedItem = { ...savedSearches[index], state: "unsaved"};

                // make final new array of objects by combining updated object.
                const newSavedArr = [
                  ...savedSearches.slice(0, index),
                  ...savedSearches.slice(index + 1),
                ];

                //Remove item from array and update local storage
                // selected.state = "unsaved";
                selected = removedItem;
                localStorage.setItem("savedSearches", JSON.stringify(newSavedArr));
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
                console.log(queryURL);
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

        for (i=0; i<results.length; i++) {
            //area for drink item - if clicked, popup recipe
            var li = $("<li>").addClass("drinkItem list-group-item flex-fill");
            //append image
            var wrapper = $("<div>").addClass("container imgWrap");
            wrapper.html(`<img src=${results[i].strDrinkThumb} id="listImage"/><button class="btn saveBtnFood" id="btn" data-state="unsaved">Save</button>`);
            li.append(wrapper);
            //append name - if clicked, triggers ajax call for recipe
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