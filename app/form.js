/* Mentor Application Form for https://www.urbantechhero.org
 Developer: Joshua Isaacs / Kate Garbar
 Email: jisaacs1207@icloud / kgarbar@gmail.com
 GitHub: https://github.com/jisaacs1207 / https://github.com/kgarbar
*/

// Initial setup and configuration
let currentPage = 1; // Tracks the current page in the form
let isChangePageEnabled = true; // Flag to control the changePage function
const pages = document.querySelectorAll('.page'); // Array of form pages
const submitContainer = document.querySelector('.submit-container'); // Container for the submit buttons
const nextBtn = document.querySelector('.navigation-buttons button:last-child'); // Next button
const backBtn = document.querySelector('.navigation-buttons button:last-child'); // Back button

// Hide the back button initially
backBtn.style.display = 'none';

/**
 * Function to change the form page.
 * @param {number} step - The step to move forward or backward in the form.
 */
function changePage(step) {
    // Toggle the visibility of the back button based on the current page
    if (currentPage === 1) {
        const backBtn = document.querySelector('.navigation-buttons button:last-child');
        backBtn.style.display = 'none';
    } else {
        const backBtn = document.querySelector('.navigation-buttons button:last-child');
        backBtn.style.display = 'inline-block';
    }

    // Check if the changePage function is enabled
    if (!isChangePageEnabled) {
        return;
    }

    // Validate inputs on the current page before moving to the next/previous page
    const currentPageInputs = pages[currentPage - 1].querySelectorAll('[required]');
    if (step === 1 && !validateInputs(currentPageInputs)) {
        alert('Please fill in all required fields before proceeding.');
        return;
    }

    // Hide the current page and update the current page index
    pages[currentPage - 1].style.display = 'none';
    currentPage += step;
    pages[currentPage - 1].style.display = 'block';
    // Update button visibility based on the new current page
    updateButtonVisibility();
}

/**
 * Function to validate required inputs on a page.
 * @param {NodeList} inputs - The list of required inputs on a page.
 * @returns {boolean} - Returns true if all inputs are valid, otherwise false.
 */
function validateInputs(inputs) {
    let isValid = true;

    // Check each input for validity
    inputs.forEach(input => {
        if (input.type === 'checkbox' && !input.checked) {
            isValid = false;
            input.classList.add('invalid');
        } else if (!input.value.trim()) {
            isValid = false;
            input.classList.add('invalid');
        } else {
            input.classList.remove('invalid');
        }
    });

    return isValid;
}

/**
 * Function to update the visibility of navigation buttons and submit container.
 */
function updateButtonVisibility() {
    const nextBtn = document.querySelector('.navigation-buttons button:first-child');
    const backBtn = document.querySelector('.navigation-buttons button:last-child');

    // Toggle visibility of back and next buttons based on the current page
    backBtn.style.display = currentPage === 1 ? 'none' : 'inline-block';
    nextBtn.style.display = currentPage < pages.length ? 'inline-block' : 'none';

    // Toggle visibility of the submit container based on the current page
    const submitBackBtn = document.querySelector('.submit-container button[type="button"]');
    submitBackBtn.style.display = currentPage === pages.length ? 'inline-block' : 'none';

    submitContainer.style.display = currentPage === pages.length ? 'flex' : 'none';

    // Hide the back button on the last page
    if (currentPage === pages.length) {
        backBtn.style.display = 'none';
    }
}

// Event listener for "Next" button clicks
nextBtn.addEventListener('click', () => {
    // Disable the changePage function temporarily to prevent rapid clicks
    isChangePageEnabled = false;
    setTimeout(() => {
        isChangePageEnabled = true;
    }, 1000);
    // Move to the next page
    changePage(1);
});

// Event listener for "Submit" button clicks
document.querySelector('.submit-container button[type="submit"]').addEventListener('click', () => {
    // Validate inputs on the current page before form submission
    if (validateInputs(pages[currentPage - 1].querySelectorAll('[required]'))) {
        document.querySelector('form').submit();
    } else {
        alert('Please fill in all required fields before proceeding.');
    }
});

