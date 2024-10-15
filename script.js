document.addEventListener("DOMContentLoaded", function() {
    const liste = document.getElementById('liste');
    const totalItems = 52 * 85; // 52 semaines * 85 ans

    // Créer et ajouter les éléments <li>
    createListItems(totalItems);

    const dateInput = document.getElementById('date-input'); // Input de type date
    const saveBtn = document.getElementById('save-btn'); // Bouton de sauvegarde
    const savedDateDisplay = document.getElementById('saved-date'); // Affichage de la date sauvegardée

    // Charger la date sauvegardée depuis LocalStorage
    loadSavedDate();

    // Événement de sauvegarde de la date
    saveBtn.addEventListener('click', () => {
        const userDate = dateInput.value;
        saveUserDate(userDate);
        updateListClasses(userDate);
    });

    const lifeStages = {
        "childhood": { startAge: 0, endAge: 6, color: "skyblue" },
        "elementary school": { startAge: 6, endAge: 11, color: "blue" },
        "middle school": { startAge: 11, endAge: 14, color: "green" },
        "high school": { startAge: 14, endAge: 18, color: "yellow" },
        "college": { startAge: 18, endAge: 22, color: "red" },
        "work life": { startAge: 22, endAge: 65, color: "purple" },
        "retirement": { startAge: 65, endAge: 85, color: "orange" }
    };

    // Colorier les semaines en fonction des étapes de la vie
    function colorLifeStages() {
        for (const stage in lifeStages) {
            const startWeek = lifeStages[stage].startAge * 52;
            const endWeek = lifeStages[stage].endAge * 52;
            colorLi(startWeek, endWeek, lifeStages[stage].color);
        }
    }
    colorLifeStages();

    // Ajouter gestionnaire d'événement pour appliquer margin si survol d'un li bleu
    addHoverEffect();
});

// Fonction pour créer et ajouter des éléments <li>
function createListItems(totalItems) {
    const liste = document.getElementById('liste');
    for (let i = 1; i <= totalItems; i++) {
        const li = document.createElement('li');
        li.classList.add(`${i}`); // Ajouter une classe avec le numéro de l'élément
        liste.appendChild(li);
    }
}

// Fonction pour charger la date sauvegardée
function loadSavedDate() {
    const savedDateDisplay = document.getElementById('saved-date'); // Affichage de la date
    const savedDate = localStorage.getItem('userDate');
    if (savedDate) {
        savedDateDisplay.textContent = savedDate; // Afficher la date sauvegardée
    }
}

// Fonction pour sauvegarder la date de l'utilisateur
function saveUserDate(userDate) {
    localStorage.setItem('userDate', userDate); // Stocker la date dans LocalStorage
    document.getElementById('saved-date').textContent = userDate; // Afficher la date sauvegardée
}

// Fonction pour calculer le nombre de jours depuis une date
function calculateDaysSince(userDate) {
    const today = new Date();
    const dateEntered = new Date(userDate);
    const timeDiff = today - dateEntered; // Différence en millisecondes
    return Math.floor(timeDiff / (1000 * 60 * 60 * 24)); // Convertir en jours
}

// Fonction pour mettre à jour les classes des éléments de la liste
function updateListClasses(userDate) {
    const listItems = document.querySelectorAll('#liste li');
    const daysSince = calculateDaysSince(userDate);
    const weeksSince = Math.floor(daysSince / 7); // Convertir les jours en semaines

    listItems.forEach(item => {
        const classNumber = parseInt(item.className);
        // Vérifie si la classe est inférieure au nombre de semaines
        if (classNumber < weeksSince) {
            item.classList.add('dead'); // Ajouter la classe 'red'
        }
    });
}

function colorLi(nb1, nb2, color) {
    const listItems = document.querySelectorAll('#liste li');

    listItems.forEach(item => {
        const classNumber = parseInt(item.className);
        // Vérifie si la classe est dans la plage de semaines spécifiée
        if (classNumber >= nb1 && classNumber <= nb2) {
            item.classList.add(color); // Ajouter la couleur à l'élément
        }
    });
}

// Fonction pour ajouter l'effet de survol sur les éléments "blue"
function addHoverEffect() {
    // Dictionnaire associant les couleurs aux IDs correspondants des légendes
    const colorLegendMap = {
        'blue': 'bluelegend',
        'red': 'redlegend',
        'green': 'greenlegend',
        'purple': 'purplelegend',
        'yellow': 'yellowlegend',
        'orange': 'orangelegend',
        'skyblue': 'skybluelegend',
        
        // Ajoute d'autres couleurs si nécessaire
    };

    // Boucle sur chaque couleur dans le dictionnaire
    Object.keys(colorLegendMap).forEach(color => {
        // Sélectionne tous les éléments <li> avec la classe correspondant à la couleur
        const listItems = document.querySelectorAll(`#liste li.${color}`);
        const legendElement = document.getElementById(colorLegendMap[color]);

        // Applique l'effet de survol à chaque élément de la couleur
        listItems.forEach(item => {
            item.addEventListener('mouseover', () => {
                // Ajouter la classe 'hover' à la légende correspondante
                legendElement.classList.add('hover');

                // rajouter la class flach a tout les li de la couleur
                listItems.forEach(listItem => {
                    listItem.classList.add('flash');
                });
                
            });

            item.addEventListener('mouseout', () => {
                // Supprimer la classe 'hover' lorsque le survol s'arrête
                legendElement.classList.remove('hover');
                // Supprimer la class flash a tout les li de la couleur
                listItems.forEach(listItem => {
                    listItem.classList.remove('flash');
                });
            });
        });
    });
    
}

// Écoute l'événement de clic sur le bouton
document.getElementById('toggle-legend-btn').addEventListener('click', function() {
    // Sélectionne tous les éléments de légende
    const legends = document.querySelectorAll('#legend .legend');

    // Boucle à travers chaque élément de légende
    legends.forEach(legend => {
        // Ajoute ou enlève la classe 'hover' en fonction de l'état actuel
        legend.classList.toggle('hover');
    });
});



// Appel de la fonction pour activer les effets
addHoverEffect();
function triggerFlash(element) {
    // Ajoute la classe flash
    element.classList.add('flash');

    // Supprime la classe après l'animation pour pouvoir la réutiliser
    setTimeout(() => {
        element.classList.remove('flash');
    }, 500); // Correspond à la durée de l'animation (500ms)
}

// Exemple d'utilisation
const redElement = document.querySelector('.red'); // Sélectionne un élément li avec la classe red
const greenElement = document.querySelector('.green'); // Sélectionne un élément li avec la classe green
const blueElement = document.querySelector('.blue'); // Sélectionne un élément li avec la classe blue
const yellowElement = document.querySelector('.yellow'); // Sélectionne un élément li avec la classe yellow
const purpleElement = document.querySelector('.purple'); // Sélectionne un élément li avec la classe purple
const orangeElement = document.querySelector('.orange'); // Sélectionne un élément li avec la classe orange
const skyblueElement = document.querySelector('.skyblue'); // Sélectionne un élément li avec la classe skyblue


// Appelle la fonction pour déclencher l'animation
triggerFlash(redElement);
triggerFlash(greenElement);
triggerFlash(blueElement);
triggerFlash(yellowElement);
triggerFlash(purpleElement);
triggerFlash(orangeElement);
triggerFlash(skyblueElement);
