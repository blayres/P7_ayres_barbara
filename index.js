//Mettre le code JavaScript lié à la page index.html
async function getRecipeById(id) {
    let recipes = [];
    await fetch("data/recipes.json")
      .then(response => response.json())
      .then((data) => (recipes = data.recipes));
      console.log(recipes)
  
    //On cherche la recette avec l'id
    let recipe = recipes.find(recette => recette.id == '1');
    console.log(recipe)
    
    let ingredients = [];
    await fetch("data/recipes.json")
      .then(response => response.json())
      .then((data) => (ingredient = data.ingredients));
      console.log(ingredients)
  
    // //On cherche les ingredients de la recette avec l'id
    let ingredientRecipe = ingredients.filter(ingredients => ingredients.recipeId == id);
    recipe.ingredient = ingredientRecipe;
    console.log(ingredientRecipe)
    return {
      recipe
    };
    
}

async function displayData(recipe) {
    const {
      name,
      time,
    //ingredient,
      description,
    } = recipe;
    document.getElementById("nameRecipe").innerText = name;
    document.getElementById("timeRecipe").innerText = time + "min";
    // document.getElementById("taglinePhotographer").innerText = ingredient;
    document.getElementById("descriptionRecipe").innerText = description;

}

async function init() {
    const query = window.location.search;
    const urlParams = new URLSearchParams(query);
    const id = urlParams.get("id");
    const {
      recipe
    } = await getRecipeById(id);
    displayData(recipe);
  }

init();