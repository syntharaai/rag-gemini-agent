/**
 * Fix for redundant navigation elements
 * This script removes any unintended navigation elements that might appear at the bottom of the page
 */

document.addEventListener('DOMContentLoaded', function() {
  // Function to remove redundant navigation
  function removeRedundantNavigation() {
    // Target direct list items in the body
    const directListItems = document.querySelectorAll('body > li');
    directListItems.forEach(item => {
      item.remove();
    });
    
    // Target lists after the footer
    const footer = document.querySelector('footer');
    if (footer) {
      let nextElement = footer.nextElementSibling;
      while (nextElement) {
        if (nextElement.tagName === 'UL' || nextElement.tagName === 'OL' || nextElement.tagName === 'LI') {
          const elementToRemove = nextElement;
          nextElement = nextElement.nextElementSibling;
          elementToRemove.remove();
        } else {
          nextElement = nextElement.nextElementSibling;
        }
      }
    }
    
    // Look for any elements containing the text pattern "VisionCapabilitiesTechnologyImplementationContact"
    const allElements = document.querySelectorAll('body *');
    allElements.forEach(element => {
      if (element.textContent && element.textContent.includes('VisionCapabilitiesTechnologyImplementationContact')) {
        element.remove();
      }
    });
    
    // Check for any list items at the end of the body
    const bodyChildren = document.body.children;
    if (bodyChildren.length > 0) {
      const lastElements = Array.from(bodyChildren).slice(-3); // Get last 3 elements
      lastElements.forEach(element => {
        if (element.tagName === 'UL' || element.tagName === 'OL' || element.tagName === 'LI') {
          element.remove();
        }
      });
    }
  }
  
  // Run immediately
  removeRedundantNavigation();
  
  // Also run after a short delay to catch any dynamically added elements
  setTimeout(removeRedundantNavigation, 500);
  
  // And run again after the page is fully loaded
  window.addEventListener('load', function() {
    removeRedundantNavigation();
    setTimeout(removeRedundantNavigation, 1000);
  });
});
