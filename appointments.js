const modal = document.querySelector(".modal");
const closeButton = document.querySelector(".close-button");

function toggleModal() {
    modal.classList.toggle("show-modal");
}

function windowOnClick(e) {
    if (e.target === modal) {
        toggleModal();
    }
}

closeButton.addEventListener("click", toggleModal);

closeButton.addEventListener("keypress", (e) => {
    if (e.key === 'Enter') {
        toggleModal();
    }
});

window.addEventListener("click", windowOnClick);

toggleModal();