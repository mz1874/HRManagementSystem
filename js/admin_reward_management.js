// Function to auto-resize textarea
function resizeTextarea(textarea) {
    textarea.style.height = "auto"; // Reset the height
    textarea.style.height = textarea.scrollHeight + "px"; // Set to new height based on content
}

// Initialize auto-resize for existing content
document.querySelectorAll('.auto-resize').forEach(textarea => {
    resizeTextarea(textarea);
});

