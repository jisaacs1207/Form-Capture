let currentPage = 1;
let isChangePageEnabled = true;  // Flag to track if the changePage function is enabled
const pages = document.querySelectorAll('.page');
const submitContainer = document.querySelector('.submit-container');
const nextBtn = document.querySelector('.navigation-buttons button:last-child');

function changePage(step) {
    if (!isChangePageEnabled) {
        return;  // If the changePage function is disabled, do nothing
    }

    const currentPageInputs = pages[currentPage - 1].querySelectorAll('[required]');
    if (step === 1 && !validateInputs(currentPageInputs)) {
        alert('Please fill in all required fields before proceeding.');
        return;
    }

    pages[currentPage - 1].style.display = 'none';
    currentPage += step;
    pages[currentPage - 1].style.display = 'block';
    updateButtonVisibility();
}

function validateInputs(inputs) {
    let isValid = true;

    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.classList.add('invalid');
        } else {
            input.classList.remove('invalid');
        }
    });

    return isValid;
}

function updateButtonVisibility() {
    const backBtn = document.querySelector('.navigation-buttons button:first-child');
    const nextBtn = document.querySelector('.navigation-buttons button:last-child');

    backBtn.style.display = currentPage === 1 ? 'none' : 'inline-block';
    nextBtn.style.display = currentPage < pages.length ? 'inline-block' : 'none';

    const submitBackBtn = document.querySelector('.submit-container button[type="button"]');
    submitBackBtn.style.display = currentPage === pages.length ? 'inline-block' : 'none';

    submitContainer.style.display = currentPage === pages.length ? 'flex' : 'none';

    if (currentPage === pages.length) {
        backBtn.style.display = 'none';
    }
}

// Add event listener for "Next" button clicks
nextBtn.addEventListener('click', () => {
    isChangePageEnabled = false;  // Disable the changePage function
    setTimeout(() => {
        isChangePageEnabled = true;  // Enable the changePage function after 1 second
    }, 1000);
    changePage(1);
});

// Add event listener for "Submit" button clicks
document.querySelector('.submit-container button[type="submit"]').addEventListener('click', () => {
    if (validateInputs(pages[currentPage - 1].querySelectorAll('[required]'))) {
        // If the current page is valid, submit the form
        document.querySelector('form').submit();
    } else {
        // If the current page is not valid, show a warning
        alert('Please fill in all required fields before proceeding.');
    }
});
