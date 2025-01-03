// Modal configuration object
const MODALS = {
    new: {
        id: 'announcementModal',
        title: 'Welcome to New Website',
        description: "We're excited to launch our new announcement center. Stay tuned for important updates!",
        pdfUrl: '科学上册第1-11章答案.pdf' 
    },
    view: {
        id: 'viewAnnouncementModal',
        contentIds: {
            title: 'viewTitle',
            description: 'viewDescription',
            pdfContainer: 'pdfContainer'
        }
    },
    edit: {
        id: 'editAnnouncementModal'
    },
    delete: {
        id: 'deleteConfirmModal'
    }
};

// DOM Elements
const backdrop = document.getElementById('modalBackdrop');
const scheduleCheckbox = document.getElementById('schedulePost');
const availableCheckbox = document.getElementById('availableFor');
const postDate = document.getElementById('postDate');
const postTime = document.getElementById('postTime');
const department = document.getElementById('department');

// Modal handlers
const modalHandler = {
    open: (modalId, data = null) => {
        const modal = document.getElementById(modalId);
        if (!modal) return;

        modal.style.display = 'block';
        backdrop.style.display = 'block';

        if (data) {
            populateModalContent(modalId, data);
        }
    },

    close: (modalId) => {
        const modal = document.getElementById(modalId);
        if (!modal) return;

        modal.style.display = 'none';
        backdrop.style.display = 'none';

        // Clear PDF container if it exists
        const pdfContainer = document.getElementById(MODALS.view.contentIds.pdfContainer);
        if (pdfContainer) {
            pdfContainer.innerHTML = '';
            pdfContainer.style.display = 'none';
        }
    }
};

// Populate modal content
function populateModalContent(modalId, data) {
    switch (modalId) {
        case MODALS.view.id:
            document.getElementById(MODALS.view.contentIds.title).textContent = data.title;
            document.getElementById(MODALS.view.contentIds.description).textContent = data.description;
            handlePdfEmbed(data.pdfUrl);
            break;

        case MODALS.edit.id:
            const form = document.querySelector(`#${modalId} form`);
            if (form) {
                form.querySelector('input[type="text"]').value = data.title;
                form.querySelector('textarea').value = data.description;
                
                // Reset and handle department controls
                const deptCheckbox = form.querySelector('#availableFor');
                const deptInput = form.querySelector('#department');
                
                deptCheckbox.checked = false;
                deptInput.value = '';
                deptInput.disabled = true;
                
                // Handle schedule controls
                form.querySelector('#schedulePost').disabled = true;
                form.querySelector('#postDate').disabled = true;
                form.querySelector('#postTime').disabled = true;
            }
            break;
    }
}

// Handle PDF embedding
function handlePdfEmbed(pdfUrl) {
    const container = document.getElementById(MODALS.view.contentIds.pdfContainer);
    container.innerHTML = '';
    
    if (pdfUrl) {
        container.innerHTML = `<embed src="${pdfUrl}" width="100%" height="500px" type="application/pdf">`;
        container.style.display = 'block';
    } else {
        container.style.display = 'none';
    }
}

// Event listeners
scheduleCheckbox?.addEventListener('change', (e) => {
    postDate.disabled = !e.target.checked;
    postTime.disabled = !e.target.checked;
});

// Update department checkbox event listener
document.querySelectorAll('[id="availableFor"]').forEach(checkbox => {
    checkbox?.addEventListener('change', (e) => {
        // Find the closest department input within the same form
        const form = e.target.closest('form');
        if (form) {
            const deptInput = form.querySelector('#department');
            if (deptInput) {
                deptInput.disabled = !e.target.checked;
            }
        }
    });
});

backdrop?.addEventListener('click', () => {
    Object.values(MODALS).forEach(modal => modalHandler.close(modal.id));
});

// Prevent modal close when clicking inside
document.querySelectorAll('.modal').forEach(modal => {
    modal?.addEventListener('click', (e) => {
        e.stopPropagation();
    });
});

// Form submission
document.getElementById('announcementForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    // Add form submission logic here
    modalHandler.close(MODALS.new.id);
});


// Delete functionality
let currentAnnouncementId = null;

function openDeleteModal(announcementId) {
    currentAnnouncementId = announcementId;
    modalHandler.open(MODALS.delete.id);
}

function closeDeleteModal() {
    modalHandler.close(MODALS.delete.id);
    currentAnnouncementId = null;
}

function confirmDelete() {
    if (currentAnnouncementId) {
        // Here you would make an API call to delete the announcement
        console.log(`Deleting announcement ${currentAnnouncementId}`);
        // After successful deletion:
        closeDeleteModal();
        // Optionally refresh the announcements list or remove the deleted item from DOM
    }
}

// Update delete button click handlers
document.querySelectorAll('.btn-danger').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const announcementId = e.target.closest('.announcement-card').dataset.id;
        openDeleteModal(announcementId);
    });
});

// Export modal opening functions
window.openModal = () => modalHandler.open(MODALS.new.id);
window.openViewModal = () => modalHandler.open(MODALS.view.id, MODALS.new);
window.openEditModal = () => modalHandler.open(MODALS.edit.id, MODALS.new);

// Export modal closing functions
window.closeModal = () => modalHandler.close(MODALS.new.id);
window.closeViewModal = () => modalHandler.close(MODALS.view.id);
window.closeEditModal = () => modalHandler.close(MODALS.edit.id);


// Export modal functions
window.openDeleteModal = openDeleteModal;
window.closeDeleteModal = closeDeleteModal;
window.confirmDelete = confirmDelete;