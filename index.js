var ingredients = [];
var ustensils = [];
var appareils = [];
var allRecipes = [];

var appareilsWithoutDoublon = [];
var ustensilsWithoutDoublon = [];
var ingredientsWithoutDoublon = [];

// Mettre le code JavaScript lié à la page index.html
async function getRecipes() {
  let recipes = [];
  await fetch("data/recipes.json")
    .then(response => response.json())
    .then((data) => (recipes = data.recipes));
  allRecipes = recipes
  return {
    recipes
  };

}

async function displayData(recipes) {
  let recipesHTML = '';
  ingredients = [];
  recipes.map(recipe => {
    let ingredientsHTML = '';

    // On rempli un tableau d'ingredients
    // APPAREILS
    appareils.push(recipe.appliance.toLowerCase());
    // USTENSILES

    recipe.ustensils.map(ustensil => {
      ustensils.push(ustensil.toLowerCase());
    })

    recipe.ingredients.map(ingredient => {
      ingredients.push(ingredient.ingredient.toLowerCase());
      let quantity = ingredient.quantity;
      let unit = ingredient.unit;
      let doublePoint = '';
      if (quantity != undefined) {
        doublePoint = ':';
      }
      if (quantity == undefined) {
        quantity = '';
      }
      if (unit == undefined) {
        unit = '';
      }
      ingredientsHTML = ingredientsHTML + `<li><strong>${ingredient.ingredient}${doublePoint}</strong> ${quantity} ${unit} </li>`;
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
                ${ingredientsHTML}
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
  appareilsWithoutDoublon = [...appareilsClean]

  // On enlève les valeurs doublons
  const ustensilsClean = new Set(ustensils);
  ustensilsWithoutDoublon = [...ustensilsClean]

  // On enlève les valeurs doublons
  const ingredientsClean = new Set(ingredients);
  ingredientsWithoutDoublon = [...ingredientsClean]

  remplirMesDropdown(appareilsWithoutDoublon, 'appareils')
  remplirMesDropdown(ustensilsWithoutDoublon, 'ustensils')
  remplirMesDropdown(ingredientsWithoutDoublon, 'ingredients')

  document.querySelector(".main__diaporama").innerHTML = recipesHTML;
}

async function remplirMesDropdown(data, idDiv) {
  data.map(value => {
      const listElement = document.createElement('p');
      listElement.onclick = function () {
        addTag(value, idDiv);
      };

      listElement.innerHTML = value;
      document.getElementById(idDiv).append(listElement);
    }

  )
}

// Ouvrir les tags
async function addTag(value, type) {
  console.log(type)
  var header__MotRecherche = document.querySelector('.header__MotRecherche').innerHTML;
  var tagsAdded = document.querySelectorAll('.header__MotRecherche__bouton');
  var tagsAddedArray = [];
  tagsAdded.forEach(tag => {
    tagsAddedArray.push(tag.innerText);
  })
  if (!tagsAddedArray.includes(value)) {
    document.querySelector('.header__MotRecherche').innerHTML = header__MotRecherche + `<button data-type="${type}" class="header__MotRecherche__bouton">${value}
  <i class="fa-regular fa-circle-xmark" onclick="removeTag(this)" style="cursor: pointer;"></i>
</button>`;
  }
  algo1();
}

// Fermer les tags
async function removeTag(el) {
  el.parentNode.remove();
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

// Faire apparaitre les suggestions 
function autoComplete(search, type) {
  let arrayToFilter = null;
  if (type == 'ingredients') {
    arrayToFilter = ingredientsWithoutDoublon
  }

  if (type == 'ustensils') {
    arrayToFilter = ustensilsWithoutDoublon
  }

  if (type == 'appareils') {
    arrayToFilter = appareilsWithoutDoublon
  }

  return arrayToFilter.filter((value) => {
    const valueMiniscule = value.toLowerCase()
    const searchMiniscule = search.toLowerCase()

    return valueMiniscule.includes(searchMiniscule)
  })


}

const fieldAutocomplete = document.querySelectorAll('.fieldAutocomplete')

const suggestionsIngredients = document.querySelector('.suggestions-ingredients')
const suggestionsAppareils = document.querySelector('.suggestions-appareils')
const suggestionsUstensils = document.querySelector('.suggestions-ustensils')

fieldAutocomplete.forEach(el => {
  el.addEventListener('input', ({
    target
  }) => {
    const dataField = target.value
    const type = target.dataset.id;
    var divToWrite = null;

    if (type == 'ingredients') {
      divToWrite = suggestionsIngredients
    }

    if (type == 'ustensils') {
      divToWrite = suggestionsUstensils
    }

    if (type == 'appareils') {
      divToWrite = suggestionsAppareils
    }
    console.log(dataField);
    if (dataField.length > 0) {
      const autoCompleteValues = autoComplete(dataField, type);


      divToWrite.innerHTML = `
                 ${autoCompleteValues.map((value) => {
        return (
          `<li style="display: block;" onclick="addTag('${value}','${type}')">${value}</li>`
        )
      }).join('')}
                `
    } else {
      divToWrite.innerHTML = '';
    }
  })
})

async function search() {
  const search = document.getElementById("search").value;
  if (search.length >= 3) {
    algo1();
  }
}

async function algo1() {
  var tagsAdded = document.querySelectorAll('.header__MotRecherche__bouton');
  var tagsIngredients = [];
  var tagsAppareils = [];
  var tagsUstensils = [];
  tagsAdded.forEach(tag => {
    let type = tag.dataset.type;
    if (type == 'ingredients') {
      tagsIngredients.push(tag.innerText);
    }
    if (type == 'appareils') {
      tagsAppareils.push(tag.innerText);
    }
    if (type == 'ustensils') {
      tagsUstensils.push(tag.innerText);
    }
  })
  const search = document.getElementById("search").value;
  console.log(search, tagsIngredients, allRecipes)

  let recipesFiltered = [];
  allRecipes.map(recipe => {
    let recipesHaveAppareils = true;
    tagsAppareils.map(appareil => {
      if (recipe.appliance.toLowerCase() != appareil.toLowerCase()) {
        recipesHaveAppareils = false;
      }
    })
    if (recipesHaveAppareils) {
      recipesFiltered.push(recipe);
    }

    // let recipesHaveIngredients = true;
    //   tagsIngredients.map(ingredient => {
    //     if (ingredient.ingredient.toLowerCase() != ingredient.toLowerCase()) {
    //       recipesHaveIngredients = false;
    //     }
    //   })
    //   if (recipesHaveIngredients) {
    //     recipesFiltered.push(recipe);
    //   }

    //   
    //   searchPrincipal.addEventListener('input', (e) => {
    //     if (e.target.value.length >= 3 || e.inputType === "deleteContentBackward") {
    //         search(tagsAdded.active, recipe.instances);
    //     }
    // })

  })

  displayData(recipesFiltered);
}



async function init() {
  const {
    recipes
  } = await getRecipes();
  displayData(recipes);
}



init();