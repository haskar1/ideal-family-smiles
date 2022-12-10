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
let viewportPassedMinWidth = false;

function handleViewportChange(e) {
  // Check if the media query is true
  if (e.matches) {
    collapseServiceOnMouseleave(e);
    viewportPassedMinWidth = true;
  }

  else if (!e.matches && viewportPassedMinWidth === true) {
    [...services].forEach(service => 
      service.removeEventListener('mouseleave', removeClickedAttribute)
    )

    viewportPassedMinWidth = false;
  }
}

function collapseServiceOnMouseleave(e) {
  [...services].forEach(service => 
    service.addEventListener('mouseleave', removeClickedAttribute)
  )
}

function removeClickedAttribute(e) {
  let clickedService = e.currentTarget;
  clickedService.removeAttribute('clicked');
}

// Register event listener
mediaQuery.addListener(handleViewportChange)

// Initial check
handleViewportChange(mediaQuery)
