let currentPage = 1;
const pages = document.querySelectorAll('.page');
const submitContainer = document.querySelector('.submit-container');

function changePage(step) {
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
document.querySelector('.navigation-buttons button:last-child').addEventListener('click', () => {
    if (currentPage < pages.length) {
        // Check validation only when moving to the next page
        if (!validatePage(currentPage)) {
            alert('Please fill in all required fields before proceeding.');
            return;
        }
    }

    changePage(1);
});

// Add event listener for "Submit" button clicks
document.querySelector('.submit-container button[type="submit"]').addEventListener('click', () => {
    if (validatePage(currentPage)) {
        // If the current page is valid, submit the form
        document.querySelector('form').submit();
    } else {
        // If the current page is not valid, show a warning
        alert('Please fill in all required fields before submitting.');
    }
});