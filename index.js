var ingredients = [];
var ustensils = [];
var appareils = [];

var appareilsWithoutDoublon = [];
var ustensilsWithoutDoublon = [];
var ingredientsWithoutDoublon = [];

// Mettre le code JavaScript lié à la page index.html
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
  ingredients = [];
  for(i = 0; i < ingredients.length; i++) {
    return ingredients[i]
  }
  recipes.map(recipe => {


    // On rempli un tableau d'ingredients
    // APPAREILS
    appareils.push(recipe.appliance.toLowerCase());
    // USTENSILES
 
    recipe.ustensils.map(ustensil => {
      ustensils.push(ustensil.toLowerCase());
    })

    recipe.ingredients.map(ingredient => {
      ingredients.push(ingredient.ingredient.toLowerCase());
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
                <li><strong>${recipe.ingredients[i].ingredient}:</strong> ${recipe.ingredients[i].quantity}${recipe.ingredients[i].unit} </li>
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
      addTag(value);
    };
 
    listElement.innerHTML = value;
    document.getElementById(idDiv).append(listElement);
  }

  )
}

// Ouvrir les tags
async function addTag(value) {
  var header__MotRecherche = document.querySelector('.header__MotRecherche').innerHTML;

  document.querySelector('.header__MotRecherche').innerHTML = header__MotRecherche + `<button class="header__MotRecherche__bouton">${value}
  <i class="fa-regular fa-circle-xmark" onclick="removeTag(this)" style="cursor: pointer;"></i>
</button>`;

// var tags = [];
//    $('header__MotRecherche__bouton').each(function(){
//        var tagArray = $(this).text().split(' ');
     
//        for(var i = tagArray.length - 1; i >= 0; i--) {
//           var tag = tagArray[i];
//           if(tags.indexOf(tag) > -1) {
//              tagArray.splice(i, 1);
//           } else {
//             tags.push(tag);
//           }
//        }
     
//        var currentTag = tagArray.join(' ');
     
//         if(currentTag){
//             $(this).text(currentTag);
//         }
//         else{
//             $(this).remove();
//         }
//     });
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

// // Filtrer les appareils
// appareils = [];

// function filterItems(search) {
//   return appareils.filter(function(el) {
//       return el.toLowerCase().indexOf(search.toLowerCase()) > -1;
//   })
// }

// console.log(filterItems('bl'));
// console.log(filterItems('fo')); 

// var appareilsFiltered = document.querySelector('.inputAppareilsFiltered');
// appareilsFiltered.addEventListener('blur', function(){
//   eval(this.value);
// })


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
          `<li style="display: block;" onclick="addTag('${value}')">${value}</li>`
        )
      }).join('')}
                `
    } else {
      divToWrite.innerHTML = '';
    }
  })
})


async function init() {
  const {
    recipes
  } = await getRecipes();
  displayData(recipes);
}



init();