const buttons = Array.from(document.querySelectorAll('.we-option-btn'));

buttons.forEach((button) => {
  button.addEventListener('click', () => {

    buttons.forEach((btn) => {
      btn.classList.remove('active');
    });
    button.classList.add('active');
  });
});