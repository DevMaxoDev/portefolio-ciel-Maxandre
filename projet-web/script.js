console.log("Script chargé !")

const titrePrincipal = document.querySelector('#titre-principal');
titrePrincipal.textContent = "Vous avez cliqué sur le titre !";
titrePrincipal.addEventListener('click', () => {
  console.log('Bouton cliqué !');
});