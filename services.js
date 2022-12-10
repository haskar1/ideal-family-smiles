/******************************
 Adds 'clicked' attribute to services when clicked to allow description to expand. 
 Also collapses any other open service descriptions.
 ******************************/

const services = document.querySelectorAll('#services ul li span');

[...services].forEach(service => 
  service.addEventListener('click', (e) => {
    let clickedService = e.target;

    clickedService.toggleAttribute('clicked');
    collapseOtherServices(clickedService);
  })
)

function collapseOtherServices(clickedService) {
  [...services].forEach(service => {
    if (service !== clickedService) {
      service.removeAttribute('clicked');
    }
  })
}



/******************************
 Collapse all services when you click outside of the services section (if you click on whitespace on the page)
 ******************************/

 document.addEventListener('click', (e) => {
  if (e.target.matches('#services ul li *')) {
    return;
  }

  collapseAllServices();
})

function collapseAllServices() {
  [...services].forEach(service => {
    service.removeAttribute('clicked');
  })
}



/******************************
 Fixes a bug when you click on service in viewport < 1300px, then change viewport to >= 1300px...
 The bug: after clicking a service in small viewport, the description (.slide) would stay open even after changing viewport, 
 but the service's name (span) would also be visible, so they'd overlap.
 ******************************/

// Create a condition that targets viewports at least 1300px wide
const mediaQuery = window.matchMedia('(min-width: 1300px)');
const serviceDescriptions = document.querySelectorAll('#services ul li .slide');

let viewportPassedMinWidthOnce = false;

function handleViewportChange(e) {
  // Check if the media query is true
  if (e.matches) {
    collapseServiceOnMouseleave(e);
    viewportPassedMinWidthOnce = true;
  }

  // Anytime viewport becomes large then goes to small, turn off the event listener
  else if (!e.matches && viewportPassedMinWidthOnce === true) {
    [...serviceDescriptions].forEach(serviceDescription => 
      serviceDescription.removeEventListener('mouseover', removeClickedAttribute)
    )

    viewportPassedMinWidthOnce = false;
  }
}

function collapseServiceOnMouseleave(e) {
  [...serviceDescriptions].forEach(serviceDescription => 
    serviceDescription.addEventListener('mouseover', removeClickedAttribute)
  )
}

function removeClickedAttribute(e) {
  // remove 'clicked' attribute from the current service's span element
  let clickedService = e.currentTarget;
  clickedService.previousElementSibling.firstElementChild.removeAttribute('clicked');

  clickedService.removeEventListener('mouseover', removeClickedAttribute)
}

// Register event listener
mediaQuery.addListener(handleViewportChange)

// Initial check
handleViewportChange(mediaQuery)
