const buttons = document.querySelectorAll('.we-option-btn');

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    if (button.classList.contains('active')) {
      button.classList.remove('active');
      console.log('removed');
    } else {
      button.classList.add('active');
      console.log('added');
    }
  });
});