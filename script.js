
// Petit effet de scroll doux vers la section cocktails
// NOUVEAU CODE (meilleur)
// === BOUTON COLORÉ ALÉATOIREMENT ===
  function randomColor() {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    return `rgb(${r}, ${g}, ${b})`;
  }

  setInterval(() => {
    const btn = document.querySelector('.btn');
    if (btn) {
      btn.style.background = randomColor();
      btn.style.outline = 'none';
      btn.style.border = 'none';
    }
  }, 2000);
const btnCocktails = document.querySelector('.btn');
if (btnCocktails) {
  btnCocktails.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    
    // Si le lien commence par #, c'est une ancre sur la même page
    if (href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
    // Sinon, on laisse le navigateur gérer (navigation vers autre page)
  });
}
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('active');
});
// === DONNÉES DES COCKTAILS ===
const cocktailsData = {
  mojito: {
    image: 'images/mojito.jpg',
    title: 'Mojito',
    description: 'Le Mojito est un cocktail traditionnel de la cuisine cubaine. Rafraîchissant et léger, il est parfait pour les chaudes soirées d\'été. La menthe fraîche et le citron vert lui donnent un goût unique et vivifiant.',
    ingredients: [
      'Rhum blanc : 5cl',
      'Menthe fraîche : 10 feuilles',
      'Citron vert : 1/2',
      'Sucre de canne : 2 cuillères',
      'Eau gazeuse : 10cl',
      'Glace pilée'
    ],
    price: '9€'
  },
  apple: {
    image: 'images/Apple M.jpg',
    title: 'Apple Martini',
    description: 'L\'Apple Martini, aussi appelé "Appletini", est un cocktail moderne et élégant. Sa couleur verte éclatante et son goût sucré en font un choix populaire pour les soirées chics.',
    ingredients: [
      'Vodka : 4cl',
      'Liqueur de pomme verte : 2cl',
      'Jus de citron vert : 1cl',
      'Sirop de sucre : 1cl',
      'Tranche de pomme pour décoration'
    ],
    price: '11€'
  },
  pina: {
    image: 'images/pina.jpg',
    title: 'Piña Colada',
    description: 'La Piña Colada évoque immédiatement les plages tropicales et le soleil. Ce cocktail crémeux et exotique est un véritable voyage gustatif vers les Caraïbes.',
    ingredients: [
      'Rhum blanc : 6cl',
      'Crème de coco : 4cl',
      'Jus d\'ananas : 10cl',
      'Glace pilée',
      'Tranche d\'ananas et cerise pour décoration'
    ],
    price: '10€'
  },
  rhum: {
    image: 'images/rhum-cola.png',
    title: 'Rhum cola',
    description: 'Le Rhum cola évoque immédiatement les plages tropicales et le soleil. Ce cocktail crémeux et exotique est un véritable voyage gustatif vers les Caraïbes.',
    ingredients: [
      'Rhum blanc : 6cl',
      'Crème de coco : 4cl',
      'Jus d\'ananas : 10cl',
      'Glace pilée',
      'Tranche d\'ananas et cerise pour décoration'
    ],
    price: '10€'
  },
  maison: {
    image: 'images/fraise.png',
    title: 'Notre Cocktail Maison',
    description: 'Le Rhum cola évoque immédiatement les plages tropicales et le soleil. Ce cocktail crémeux et exotique est un véritable voyage gustatif vers les Caraïbes.',
    ingredients: [
      'Rhum blanc : 6cl',
      'Crème de coco : 4cl',
      'Jus d\'ananas : 10cl',
      'Glace pilée',
      'Tranche d\'ananas et cerise pour décoration'
    ],
    price: '10€'
  }
};

// === GESTION DU PANEL ===
const panel = document.getElementById('cocktailPanel');
const overlay = document.getElementById('panelOverlay');
const closeBtn = document.getElementById('closePanel');
const cards = document.querySelectorAll('.card');

// Fonction pour ouvrir le panel
function openPanel(cocktailId) {
  const cocktail = cocktailsData[cocktailId];
  
  if (!cocktail) return;
  
  // Remplir le panel avec les données
  document.getElementById('panelImage').src = cocktail.image;
  document.getElementById('panelTitle').textContent = cocktail.title;
  document.getElementById('panelDescription').textContent = cocktail.description;
  document.getElementById('panelPrice').textContent = cocktail.price;
  
  // Ingrédients
  const ingredientsList = document.getElementById('panelIngredients');
  ingredientsList.innerHTML = '';
  cocktail.ingredients.forEach(ingredient => {
    const li = document.createElement('li');
    li.textContent = ingredient;
    ingredientsList.appendChild(li);
  });
  
  // Ouvrir le panel
  panel.classList.add('active');
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden'; // Empêcher le scroll
}

// Fonction pour fermer le panel
function closePanel() {
  panel.classList.remove('active');
  overlay.classList.remove('active');
  document.body.style.overflow = ''; // Réactiver le scroll
}

// Événements : Clic sur une carte de cocktail
cards.forEach(card => {
  card.addEventListener('click', () => {
    const cocktailId = card.getAttribute('data-cocktail');
    openPanel(cocktailId);
  });
});

// Événements : Fermer le panel
closeBtn.addEventListener('click', closePanel);
overlay.addEventListener('click', closePanel);

// Fermer avec la touche Échap
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closePanel();
  }
});
