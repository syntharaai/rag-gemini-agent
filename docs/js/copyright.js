/**
 * Copyright Year Updater
 * Automatically updates the copyright year to the current year
 */

document.addEventListener('DOMContentLoaded', function() {
  // Get all copyright elements
  const copyrightElements = document.querySelectorAll('.footer-copyright');
  
  // Get current year
  const currentYear = new Date().getFullYear();
  
  // Update copyright text in all elements
  copyrightElements.forEach(element => {
    const text = element.innerHTML;
    // Replace any year with the current year
    const updatedText = text.replace(/\d{4}/, currentYear);
    element.innerHTML = updatedText;
  });
});
