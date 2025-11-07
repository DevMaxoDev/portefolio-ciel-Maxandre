console.log("Script chargé !")

const titrePrincipal = document.querySelector('#titre-principal');

titrePrincipal.addEventListener('click', () => {
  titrePrincipal.textContent = "Vous avez cliqué sur le titre !";
  console.log('Bouton cliqué !');
});




const themeButton = document.querySelector('#theme-toggle');

themeButton.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode')
  console.log('Bouton cliqué !');
});