const buttons = document.querySelectorAll('.button-solid');

[...buttons].forEach(button => {
  button.addEventListener('click', (e) => {
    
    // Contact form submit button
    if (button.id === 'contact-submit') {  
      if (!checkFormIsValid()) {
        return
      }
    };

    // toggleLoadingSpinner(e);

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


function toggleLoadingSpinner(e) {
  const loader = e.target.querySelector('.lds-ring');
  const loaderDivChildren = e.target.querySelectorAll('.lds-ring div');

  if (loader) {
    loader.classList.toggle('active');
    [...loaderDivChildren].forEach(child => child.classList.toggle('active'));
  }
}



// "View More Services" button to expand services list

const viewMoreServicesBtn = document.querySelector('#services .view-more-services .button-solid');
const expandedServices = document.querySelectorAll('#services .expanded-service');

if (viewMoreServicesBtn) {
  viewMoreServicesBtn.addEventListener('click', () => {
    viewMoreServicesBtn.parentElement.toggleAttribute('clicked');
    [...expandedServices].forEach(service => service.toggleAttribute('clicked'));
  })  
}


// "View More Offices" button to expand offices list

const viewMoreOfficesBtn = document.querySelector('#office .view-more-offices');
const extendedOfficeList = document.querySelector('#office .content.hidden');
const extendedOfficeListTitle = document.querySelector('#office .title.hidden');

if (viewMoreOfficesBtn) {
  viewMoreOfficesBtn.addEventListener('click', () => {
    viewMoreOfficesBtn.classList.add('hidden');
    extendedOfficeList.classList.remove('hidden');
    extendedOfficeListTitle.classList.remove('hidden');
  })  
}


// "View More Reviews" button to expand reviews list

const viewMoreReviewsBtn = document.querySelector('#reviews .view-more-reviews .button-solid');
const expandedReviews = document.querySelectorAll('#reviews .expanded-review');

if (viewMoreReviewsBtn) {
  viewMoreReviewsBtn.addEventListener('click', () => {
    viewMoreReviewsBtn.parentElement.toggleAttribute('clicked');
    [...expandedReviews].forEach(review => review.toggleAttribute('clicked'));
  })  
}

