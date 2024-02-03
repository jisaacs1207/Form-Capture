let currentPage = 1;
const pages = document.querySelectorAll('.page');
const submitContainer = document.querySelector('.submit-container');

function changePage(step) {
    pages[currentPage - 1].style.display = 'none';
    currentPage += step;
    pages[currentPage - 1].style.display = 'block';
    updateButtonVisibility();
}

function updateButtonVisibility() {
    const backBtn = document.querySelector('.navigation-buttons button:first-child');
    const nextBtn = document.querySelector('.navigation-buttons button:last-child');

    backBtn.style.display = currentPage === 1 ? 'none' : 'inline-block';
    nextBtn.style.display = currentPage < pages.length ? 'inline-block' : 'none';
    submitContainer.style.display = currentPage === pages.length ? 'flex' : 'none';
}