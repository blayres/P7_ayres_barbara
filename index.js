var ingredients = [];
var ustensils = [];
var appareils = [];

//Mettre le code JavaScript lié à la page index.html
async function getRecipes() {
    let recipes = [];
    await fetch("data/recipes.json")
      .then(response => response.json())
      .then((data) => (recipes = data.recipes));
  
    return {
      recipes
    };
    
}

async function displayData(recipes) {
  let recipesHTML = '';
  recipes.map(recipe => {

   
    // On rempli un tableau d'ingredients
     // APPAREILS
    appareils.push(recipe.appliance);
    // USTENSILES
    ustensils.push(...recipe.ustensils);

    recipe.ingredients.map(ingredient => {
      ingredients.push(ingredient.ingredient);
    })

    recipesHTML = recipesHTML + `
    <div class="main__diaporama__miniature">
    <div class="main__diaporama__miniature__photo"></div>
    <div class="main__diaporama__miniature__textes">
        <div class="main__diaporama__miniature__textes__titre__temps">
            <h4 id="nameRecipe" class="main__diaporama__miniature__textes__titre">${recipe.name}</h4>
            <i class="fa-regular fa-clock"></i> 
            <h4 id="timeRecipe" class="main__diaporama__miniature__textes__temps">${recipe.time}</h4>
        </div>
        <div class="main__diaporama__miniature__textes__corps">
            <ul class="main__diaporama__miniature__textes__corps__gauche">
                <li><strong>Lait de coco:</strong> 400ml</li>
                <li><strong>Jus de citron:</strong> 2</li>
                <li><strong>Crème de coco:</strong> 4 cuillères</li>
                <li><strong>Sucre:</strong> 20g</li>
                <li><strong>Glaçons:</strong> 2</li>
            </ul>
            <p id="descriptionRecipe" class="main__diaporama__miniature__textes__corps__droite">
                ${recipe.description}
            </p>
        </div>
    </div>
</div>
        `;
  })

  // On enlève les valeurs doublons
  const appareilsClean = new Set(appareils);
  const appareilsWithoutDoublon = [...appareilsClean]

  // On enlève les valeurs doublons
  const ustensilsClean = new Set(ustensils);
  const ustensilsWithoutDoublon = [...ustensilsClean]

  // On enlève les valeurs doublons
  const ingredientsClean = new Set(ingredients);
  const ingredientsWithoutDoublon = [...ingredientsClean]

  remplirMesDropdown(appareilsWithoutDoublon, 'appareils')
  remplirMesDropdown(ustensilsWithoutDoublon, 'ustensils')
  remplirMesDropdown(ingredientsWithoutDoublon, 'ingredients')

  document.querySelector(".main__diaporama").innerHTML = recipesHTML;
}

async function remplirMesDropdown(data, idDiv) {
  data.map(value => {
    const listElement = document.createElement('p');
    // Corrigir os maiusculos
    listElement.innerHTML = value;
    document.getElementById(idDiv).append(listElement);
  }

    )
}

// Fermer les tags
async function closeTag() {
  document.querySelector(".header__MotRecherche__bouton").style.display = "none";
}

// Ouvrir les menus 
async function openDropDownIngredients() {
  document.querySelector(".header__boutonsFiltres__ingredients").style.display = "none";
  document.querySelector(".header__boutonsFiltres__ingredients__dropDown").style.display = "block";
}

async function openDropDownAppareils() {
  document.querySelector(".header__boutonsFiltres__appareils").style.display = "none";
  document.querySelector(".header__boutonsFiltres__appareils__dropDown").style.display = "block";
}

async function openDropDownUstensiles() {
  document.querySelector(".header__boutonsFiltres__ustensiles").style.display = "none";
  document.querySelector(".header__boutonsFiltres__ustensiles__dropDown").style.display = "block";
}

// Fermer les menus
async function closeDropDownIngredients() {
  document.querySelector(".header__boutonsFiltres__ingredients").style.display = "flex";
  document.querySelector(".header__boutonsFiltres__ingredients__dropDown").style.display = "none";
}

async function closeDropDownAppareils() {
  document.querySelector(".header__boutonsFiltres__appareils").style.display = "flex";
  document.querySelector(".header__boutonsFiltres__appareils__dropDown").style.display = "none";
}

async function closeDropDownUstensiles() {
  document.querySelector(".header__boutonsFiltres__ustensiles").style.display = "flex";
  document.querySelector(".header__boutonsFiltres__ustensiles__dropDown").style.display = "none";
}

async function init() {
    const {
      recipes
    } = await getRecipes();
    displayData(recipes);
  }



init();