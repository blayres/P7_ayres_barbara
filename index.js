var ingredients = [];
var ustensils = [];
var appareils = [];

//Mettre le code JavaScript lié à la page index.html
async function getRecipes() {
    let recipes = [];
    await fetch("data/recipes.json")
      .then(response => response.json())
      .then((data) => (recipes = data.recipes));
      console.log(recipes)
  
    return {
      recipes
    };
    
}

async function displayData(recipes) {
  let recipesHTML;
  recipes.map(recipe => {

    // On rempli un tableau d'ingredients
    appareils.push(recipe.appliance);
    ustensils.push(recipe.ustensils);
    ingredients.push(recipe.ingredient);

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
  document.querySelector(".main__diaporama").innerHTML = recipesHTML;
}


// function remplirLesDropdown() {
//   ustensils.map(ustensils => {
//   let ustensilsHTML;
  
//   ustensilsHTML = ustensilsHTML + `
//   <div id="recipeUstensiles" class="header__boutonsFiltres__ustensiles__dropDown" style="display: none;">
//   <div class="header__boutonsFiltres__dropDown__input__icon">
//       <input id="inputUstensiles" type="text" placeholder="Rechercher un ustensile">
//       <i class="fa-solid fa-chevron-down"></i>
//   </div>
//   <div class="header__boutonsFiltres__dropDown__liste">
//       <p>${ustensils}</p>
//       <p>${ustensils}</p>
//       <p>${ustensils}</p>
//       <p>${ustensils}</p>
//       <p>${ustensils}</p>
//       <p>${ustensils}</p>
//       <p>${ustensils}</p>
//       <p>${ustensils}</p>
//       <p>${ustensils}</p>
//       <p>${ustensils}</p>
//       <p>${ustensils}</p>
//       <p>${ustensils}</p>
//       <p>${ustensils}</p>
//       <p>${ustensils}</p>
//       <p>${ustensils}</p>
//       <p>${ustensils}</p>
//       <p>${ustensils}</p>
//       <p>${ustensils}</p>
//       <p>${ustensils}</p>
//       <p>${ustensils}</p>
//       <p>${ustensils}</p>
//       <p>${ustensils}</p>
//       <p>${ustensils}</p>
//       <p>${ustensils}</p>
//       <p>${ustensils}</p>
//       <p>${ustensils}</p>
//       <p>${ustensils}</p>
//       <p>${ustensils}</p>
//       <p>${ustensils}</p>
//       <p>${ustensils}</p>
//   </div>
// </div>
//   `

//     document.querySelector(".header__boutonsFiltres__ustensiles__dropDown").innerHTML = ustensilsHTML;
//     })
//   }


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

async function init() {
    const {
      recipes
    } = await getRecipes();
    displayData(recipes);
  }

// var recipes = [];
// var ingredients = [];
// var ustensils = [];
// var appareils = [];


// async function init() {
//   fetch("data/recipes.json")
//   recipes.push(recipes);
//   recipes.map(recipe => {
//     ingredients.push(recipe.ingredient);
//     ustensils.push(recipe.ustensils);
//     appareils.push(recipe.appareil);
//   })

//   remplirMesRecettes();
//   remplirLesDropdown();
// }

// function remplirMesRecettes() {

//   recipes.map(recipe => {
//     document.getElementById("nameRecipe").innerText = `${recipe.name}`;
//   })
// }

// function remplirLesDropdown() {
//   ustensils.map(ustensils => {
//     monDropdownUstensil.innerHtml = ustensils.title;
//   })
// }

init();