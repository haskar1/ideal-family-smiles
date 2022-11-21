const buttons = document.querySelectorAll('.button-solid');

[...buttons].forEach(button => {
  button.addEventListener('click', (e) => {
    const loader = e.target.querySelector('.lds-ring');
    const loaderDivChildren = e.target.querySelectorAll('.lds-ring div');

    loader.classList.add('active');
    [...loaderDivChildren].forEach(child => child.classList.add('active'));

    setTimeout(stopLoadingCircle, 90000);

    function stopLoadingCircle() {
      loader.classList.remove('active');
      [...loaderDivChildren].forEach(child => child.classList.remove('active'));
    }
  })
})