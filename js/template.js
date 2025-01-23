document.addEventListener('DOMContentLoaded', function() {
    // Create mobile menu toggle button
    const mobileMenuToggle = document.createElement('button');
    mobileMenuToggle.className = 'mobile-menu-toggle';
    mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    document.body.appendChild(mobileMenuToggle);

    const sidebar = document.querySelector('.sidebar');

    // Mobile menu toggle functionality
    mobileMenuToggle.addEventListener('click', function() {
        sidebar.classList.toggle('show');
    });

    // Close sidebar when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideSidebar = sidebar.contains(event.target);
        const isClickOnToggle = mobileMenuToggle.contains(event.target);
        const isSidebarVisible = sidebar.classList.contains('show');
        const isMobileView = window.innerWidth <= 768;

        if (!isClickInsideSidebar && !isClickOnToggle && isSidebarVisible && isMobileView) {
            sidebar.classList.remove('show');
        }
    });

    // Prevent sidebar toggle from closing when clicking inside sidebar
    sidebar.addEventListener('click', function(event) {
        event.stopPropagation();
    });
});