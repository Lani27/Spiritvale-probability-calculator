const modalOverlay = document.getElementById('custom-modal-overlay');
const modal = document.getElementById('custom-modal');
const modalTitle = document.getElementById('custom-modal-title');
const modalContent = document.getElementById('custom-modal-content').querySelector('p');
const modalInput = document.getElementById('custom-modal-input');
const okButton = document.getElementById('custom-modal-ok-btn');
const cancelButton = document.getElementById('custom-modal-cancel-btn');

let resolvePromise;

function showModal(title, content, type = 'alert', defaultValue = '', showOk = true) {
    return new Promise(resolve => {
        resolvePromise = resolve;

        modalTitle.textContent = title;
        modalContent.innerHTML = content; // Use innerHTML to allow links in content

        modalInput.style.display = 'none';
        cancelButton.style.display = 'inline-block';
        okButton.style.display = 'inline-block'; // Default to visible

        if (type === 'prompt') {
            modalInput.style.display = 'block';
            modalInput.value = defaultValue;
            modalInput.focus();
        } else if (type === 'alert') {
            cancelButton.style.display = 'none';
        }

        if (!showOk) {
            okButton.style.display = 'none';
        }

        modalOverlay.style.display = 'flex';
    });
}

function hideModal(value) {
    modalOverlay.style.display = 'none';
    if (resolvePromise) {
        resolvePromise(value);
    }
}

okButton.addEventListener('click', () => {
    const value = modalInput.style.display === 'block' ? modalInput.value : true;
    hideModal(value);
});

cancelButton.addEventListener('click', () => {
    const value = modalInput.style.display === 'block' ? null : false;
    hideModal(value);
});

// Close modal if clicking on the overlay
modalOverlay.addEventListener('click', (event) => {
    if (event.target === modalOverlay) {
        const value = modalInput.style.display === 'block' ? null : false;
        hideModal(value);
    }
});

// Make functions available globally for now
window.customAlert = (content, title = 'Alert', showOk = true) => {
    // Pass empty string for defaultValue, and the new showOk flag
    return showModal(title, content, 'alert', '', showOk);
};

window.customConfirm = (content, title = 'Confirm') => {
    return showModal(title, content, 'confirm');
};

window.customPrompt = (content, defaultValue = '', title = 'Prompt') => {
    return showModal(title, content, 'prompt', defaultValue);
};