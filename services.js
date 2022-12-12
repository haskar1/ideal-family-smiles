/******************************
 Adds 'clicked' attribute to services when clicked to allow description to expand. 
 Also collapses any other open service descriptions.
 ******************************/

const serviceTitles = document.querySelectorAll('#services ul li span');

[...serviceTitles].forEach(serviceTitle => {
  serviceTitle.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      addClickEventListener(e);
      collapseOtherServices(e);
      makeChildrenTabbable(e);
    }
  })
});

function addClickEventListener(e) {
  // .span-wrapper element
  e.currentTarget.parentElement.toggleAttribute('clicked');
}

function collapseOtherServices(e) {
  [...serviceTitles].forEach(serviceTitle => {
    if (serviceTitle !== e.currentTarget) {
      makeChildrenUntabbable(serviceTitle);
      serviceTitle.parentElement.removeAttribute('clicked');
    }
  });
}

function makeChildrenTabbable(e) {
  const childLinks = e.currentTarget.parentElement.nextElementSibling.querySelectorAll('a');
  
  [...childLinks].forEach(childLink => {
    if (childLink.hasAttribute('tabindex')) {
      childLink.removeAttribute('tabindex');
    }
    else {
      childLink.setAttribute('tabindex', '-1');
    }
  })
}

function makeChildrenUntabbable(serviceTitle) {
  const childLinks = serviceTitle.parentElement.nextElementSibling.querySelectorAll('a');
  
  [...childLinks].forEach(childLink => {
    childLink.setAttribute('tabindex', '-1');
  })
}




/******************************
 Create a condition that targets viewports less than 1300px wide (mobile, tablet, and small desktop view)
 It removes click event listeners for the services so that the user can only use hover or tab instead
 ******************************/

const mediaQuery = window.matchMedia('(max-width: 1299px)');

function handleViewportChange(e) {
  // Check if the media query is true
  if (e.matches) {
    addClickEventListeners();
  }
  else {
    removeClickEventListeners();
    collapseAllServices();
  }
}

function addClickEventListeners() {
  [...serviceTitles].forEach(serviceTitle => {
    serviceTitle.addEventListener('click', addClickEventListener);
    serviceTitle.addEventListener('click', collapseOtherServices);
  });
}

function removeClickEventListeners() {
  [...serviceTitles].forEach(serviceTitle => {
    serviceTitle.removeEventListener('click', addClickEventListener);
    serviceTitle.removeEventListener('click', collapseOtherServices);
  });
}

function collapseAllServices() {
  [...serviceTitles].forEach(serviceTitle => {
    serviceTitle.parentElement.removeAttribute('clicked');
  })
}

// Register event listener
mediaQuery.addEventListener('change', handleViewportChange)

// Initial check
handleViewportChange(mediaQuery)