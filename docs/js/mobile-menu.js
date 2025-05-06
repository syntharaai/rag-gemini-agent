/**
 * Mobile Menu Handler
 * Dynamically creates and manages mobile navigation
 */

document.addEventListener('DOMContentLoaded', function() {
    // Create mobile menu elements for documentation page
    if (document.querySelector('.nav-links')) {
        createDocumentationMobileMenu();
    }
    
    // Create mobile menu elements for premium page
    if (document.querySelector('.premium-nav')) {
        createPremiumMobileMenu();
    }
});

/**
 * Create mobile menu for documentation page
 */
function createDocumentationMobileMenu() {
    const nav = document.querySelector('nav');
    const navLinks = document.querySelector('.nav-links');
    
    // Create mobile menu toggle
    const mobileMenuToggle = document.createElement('div');
    mobileMenuToggle.className = 'mobile-menu-toggle';
    mobileMenuToggle.innerHTML = '<span></span><span></span><span></span>';
    nav.appendChild(mobileMenuToggle);
    
    // Create mobile menu
    const mobileMenu = document.createElement('div');
    mobileMenu.className = 'mobile-menu';
    document.body.appendChild(mobileMenu);
    
    // Create mobile nav links
    const mobileNavLinks = document.createElement('ul');
    mobileNavLinks.className = 'mobile-nav-links';
    mobileMenu.appendChild(mobileNavLinks);
    
    // Clone nav links to mobile menu
    const links = navLinks.querySelectorAll('a');
    links.forEach(link => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = link.href;
        a.textContent = link.textContent;
        li.appendChild(a);
        mobileNavLinks.appendChild(li);
    });
    
    // Add event listener to toggle
    mobileMenuToggle.addEventListener('click', function() {
        mobileMenuToggle.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });
    
    // Close menu when clicking on a link
    mobileNavLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function() {
            mobileMenuToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });
}

/**
 * Create mobile menu for premium page
 */
function createPremiumMobileMenu() {
    const nav = document.querySelector('.premium-nav');
    const navLinks = nav.querySelector('ul');
    
    if (!navLinks) return;
    
    // Create mobile menu toggle
    const mobileMenuToggle = document.createElement('div');
    mobileMenuToggle.className = 'premium-mobile-menu-toggle';
    mobileMenuToggle.innerHTML = '<span></span><span></span><span></span>';
    nav.appendChild(mobileMenuToggle);
    
    // Create mobile menu
    const mobileMenu = document.createElement('div');
    mobileMenu.className = 'premium-mobile-menu';
    document.body.appendChild(mobileMenu);
    
    // Create mobile nav links
    const mobileNavLinks = document.createElement('ul');
    mobileNavLinks.className = 'premium-mobile-nav-links';
    mobileMenu.appendChild(mobileNavLinks);
    
    // Clone nav links to mobile menu
    const links = navLinks.querySelectorAll('a');
    links.forEach(link => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = link.href;
        a.textContent = link.textContent;
        li.appendChild(a);
        mobileNavLinks.appendChild(li);
    });
    
    // Add event listener to toggle
    mobileMenuToggle.addEventListener('click', function() {
        mobileMenuToggle.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });
    
    // Close menu when clicking on a link
    mobileNavLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function() {
            mobileMenuToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });
}
