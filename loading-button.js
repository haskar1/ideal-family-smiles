const buttons = document.querySelectorAll('.button-solid');

[...buttons].forEach(button => {
  button.addEventListener('click', (e) => {
    
    // Contact form submit button
    if (button.id === 'contact-submit') {  
      if (!checkFormIsValid()) {
        return
      }
    };

    toggleLoadingCircle(e);
  
    setTimeout(toggleLoadingCircle, 90000, e);
  })
});


function checkFormIsValid() {
  const formInputs = document.querySelectorAll('#contact .input-group input, #contact .input-group textarea');
  let formValid = true;

  [...formInputs].forEach(formInput => {
    if (!formInput.checkValidity()) {
      formValid = false;
      return;
    }
  })

  return formValid;
}


function toggleLoadingCircle(e) {
  const loader = e.target.querySelector('.lds-ring');
  const loaderDivChildren = e.target.querySelectorAll('.lds-ring div');

  loader.classList.toggle('active');
  [...loaderDivChildren].forEach(child => child.classList.toggle('active'));
}

