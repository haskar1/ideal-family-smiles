/******************************
 Adds 'clicked' attribute to services when clicked to allow description to expand. 
 Also collapses any other open service descriptions.
 ******************************/

const serviceTitles = document.querySelectorAll('#services ul li span');
const serviceRequestAppointmentBtns = document.querySelectorAll('#services ul li .slide .button-solid');

[...serviceTitles].forEach(serviceTitle => {
  serviceTitle.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      toggleClickedAttribute(e);
      collapseOtherServices(e);
      makeChildrenTabbable(e);
    }
  })
});

function toggleClickedAttribute(e) {
  // .span-wrapper element
  if (e.currentTarget.parentElement.hasAttribute('clicked')) {
    e.currentTarget.parentElement.removeAttribute('clicked');
  }
  else {
    e.currentTarget.parentElement.setAttribute('clicked', '');
  }
}

function collapseOtherServices(e) {
  [...serviceTitles].forEach(serviceTitle => {
    if (serviceTitle !== e.currentTarget) {
      makeChildrenUntabbable();
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

function makeChildrenUntabbable() {
  const allServicesChildLinks = document.querySelectorAll('#services ul .more-info, #services ul .button-solid');
  
  [...allServicesChildLinks].forEach(childLink => {
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
    removeFocusOutEventListeners();
  }
  else {
    removeClickEventListeners();
    collapseAllServices();
    addFocusOutEventListeners();
  }
}

function addClickEventListeners() {
  [...serviceTitles].forEach(serviceTitle => {
    serviceTitle.addEventListener('click', toggleClickedAttribute);
    serviceTitle.addEventListener('click', collapseOtherServices);
  });
}

function removeClickEventListeners() {
  [...serviceTitles].forEach(serviceTitle => {
    serviceTitle.removeEventListener('click', toggleClickedAttribute);
    serviceTitle.removeEventListener('click', collapseOtherServices);
  });
}

function collapseAllServices() {
  [...serviceTitles].forEach(serviceTitle => {
    serviceTitle.parentElement.removeAttribute('clicked');
  })
}

function addFocusOutEventListeners() {
  [...serviceTitles].forEach(serviceTitle => {
    serviceTitle.addEventListener('focusout', removeClickedAttributeOnTitleBlur);
  });

  [...serviceRequestAppointmentBtns].forEach(button => {
    button.addEventListener('focusout', removeClickedAttributeOnButtonBlur);
  });
}

function removeClickedAttributeOnTitleBlur(e) {
  const spanWrapper = e.currentTarget.parentElement;

  if (spanWrapper.parentElement.contains(e.relatedTarget)) {
    return;
  } 
  if (spanWrapper.hasAttribute('clicked')) {
    makeChildrenUntabbable();
    spanWrapper.removeAttribute('clicked');
  }
}

function removeClickedAttributeOnButtonBlur(e) {
  const spanWrapper = e.currentTarget.parentElement.previousElementSibling;

  if (spanWrapper.parentElement.contains(e.relatedTarget)) {
    return;
  } 
  if (spanWrapper.hasAttribute('clicked')) {
    makeChildrenUntabbable();
    spanWrapper.removeAttribute('clicked');
  }
}

function removeFocusOutEventListeners() {
  [...serviceTitles].forEach(serviceTitle => {
    serviceTitle.removeEventListener('focusout', removeClickedAttributeOnTitleBlur);
  });

  [...serviceRequestAppointmentBtns].forEach(button => {
    button.removeEventListener('focusout', removeClickedAttributeOnButtonBlur);
  });
}


// Register event listener
try {
  mediaQuery.addEventListener('change', handleViewportChange);
} 
catch (e) {
  // Fallback for Safari < 14 and older browsers
  mediaQuery.addListener(handleViewportChange);
}


// Initial check
handleViewportChange(mediaQuery)