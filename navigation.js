const menuButton = document.querySelector('.menu-toggle');
const navigation = document.getElementById('seitenmenue');
const mobileView = window.matchMedia('(max-width: 52rem)');

function setMenu(open) {
  menuButton.setAttribute('aria-expanded', String(open));
  navigation.hidden = mobileView.matches && !open;
}

function adaptNavigation() {
  menuButton.hidden = !mobileView.matches;
  setMenu(false);
}

menuButton.addEventListener('click', () => {
  setMenu(menuButton.getAttribute('aria-expanded') !== 'true');
});
navigation.addEventListener('click', event => {
  if (event.target.closest('a')) setMenu(false);
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
    setMenu(false);
    menuButton.focus();
  }
});
mobileView.addEventListener('change', adaptNavigation);
adaptNavigation();
