// Custom Report Styles - Applied to ALL Reports
// Comprehensive solution for all report types
// Version: 2.2 - No Frappe dependencies - Cache bust: 2025-11-06-13:25
// THIS FILE DOES NOT USE frappe.ready - If you see frappe.ready error, clear browser cache!

(function() {
    'use strict';
    
    // Verify new file is loading - this will show in console
    if (typeof console !== 'undefined' && console.log) {
        console.log('✓ Custom Report Styles v2.2 loaded successfully - No frappe.ready dependency');
    }
    
    // Prevent any accidental frappe.ready calls
    if (typeof frappe !== 'undefined' && !frappe.ready) {
        // frappe.ready might not exist, that's OK - we don't use it
    }
    
    // Inject CSS directly into the page (bypasses cache)
    function injectCSS() {
        if (document.getElementById('custom-report-styles')) return;
        
        const style = document.createElement('style');
        style.id = 'custom-report-styles';
        style.textContent = `
            /* Datatable rows - odd/even */
            .datatable-wrapper .dt-scrollable .dt-row.vrow[data-row-index]:nth-child(odd):not(.dt-row-header):not(.dt-row-filter),
            .datatable .dt-scrollable .dt-row.vrow[data-row-index]:nth-child(odd):not(.dt-row-header):not(.dt-row-filter) {
                background-color: #fff !important;
            }
            .datatable-wrapper .dt-scrollable .dt-row.vrow[data-row-index]:nth-child(odd):not(.dt-row-header):not(.dt-row-filter) .dt-cell,
            .datatable .dt-scrollable .dt-row.vrow[data-row-index]:nth-child(odd):not(.dt-row-header):not(.dt-row-filter) .dt-cell {
                background-color: #fff !important;
            }
            .datatable-wrapper .dt-scrollable .dt-row.vrow[data-row-index]:nth-child(even):not(.dt-row-header):not(.dt-row-filter),
            .datatable .dt-scrollable .dt-row.vrow[data-row-index]:nth-child(even):not(.dt-row-header):not(.dt-row-filter) {
                background-color: #e4eaf1 !important;
            }
            .datatable-wrapper .dt-scrollable .dt-row.vrow[data-row-index]:nth-child(even):not(.dt-row-header):not(.dt-row-filter) .dt-cell,
            .datatable .dt-scrollable .dt-row.vrow[data-row-index]:nth-child(even):not(.dt-row-header):not(.dt-row-filter) .dt-cell {
                background-color: #e4eaf1 !important;
            }
            /* Exclude datatable headers */
            .datatable-wrapper .dt-row-header,
            .datatable .dt-row-header,
            .datatable-wrapper .dt-row-filter,
            .datatable .dt-row-filter {
                background-color: transparent !important;
            }
            /* Standard table rows - ONLY tbody, exclude thead */
            .report-wrapper table tbody tr:nth-child(odd):not(.dt-row-header):not(.dt-row-filter),
            .report-view table tbody tr:nth-child(odd):not(.dt-row-header):not(.dt-row-filter),
            #page-query-report table tbody tr:nth-child(odd):not(.dt-row-header):not(.dt-row-filter),
            table tbody tr:nth-child(odd):not(thead tr):not(.dt-row-header):not(.dt-row-filter) {
                background-color: #fff !important;
            }
            .report-wrapper table tbody tr:nth-child(even):not(.dt-row-header):not(.dt-row-filter),
            .report-view table tbody tr:nth-child(even):not(.dt-row-header):not(.dt-row-filter),
            #page-query-report table tbody tr:nth-child(even):not(.dt-row-header):not(.dt-row-filter),
            table tbody tr:nth-child(even):not(thead tr):not(.dt-row-header):not(.dt-row-filter) {
                background-color: #e4eaf1 !important;
            }
                
            /* Exclude thead explicitly */
            table thead tr,
            table thead tr th {
                background-color: transparent !important;
            }
            /* Hover effects - exclude headers */
            .datatable-wrapper .dt-scrollable .dt-row.vrow:hover:not(.dt-row-header):not(.dt-row-filter),
            .datatable .dt-scrollable .dt-row.vrow:hover:not(.dt-row-header):not(.dt-row-filter),
            .report-wrapper table tbody tr:hover:not(.dt-row-header):not(.dt-row-filter):not(thead tr),
            .report-view table tbody tr:hover:not(.dt-row-header):not(.dt-row-filter):not(thead tr) {
                background-color:#e4eaf1 !important;
            }
            .datatable-wrapper .dt-scrollable .dt-row.vrow:hover:not(.dt-row-header):not(.dt-row-filter) .dt-cell,
            .datatable .dt-scrollable .dt-row.vrow:hover:not(.dt-row-header):not(.dt-row-filter) .dt-cell {
                background-color: #e4eaf1 !important;
            }
        `;
        document.head.appendChild(style);
    }
    
    // Apply styles directly to rows (JavaScript fallback)
    function applyRowStyles() {
        // Datatable rows - exclude headers and filters
        const dtRows = document.querySelectorAll('.datatable-wrapper .dt-scrollable .dt-row.vrow[data-row-index], .datatable .dt-scrollable .dt-row.vrow[data-row-index]');
        let dataRowCount = 0;
        dtRows.forEach(function(row) {
            // Skip header and filter rows
            if (row.classList.contains('dt-row-header') || 
                row.classList.contains('dt-row-filter') ||
                row.getAttribute('data-is-header') === '1' ||
                row.getAttribute('data-is-filter') === '1') {
                return;
            }
            
            const rowIndex = parseInt(row.getAttribute('data-row-index'));
            if (isNaN(rowIndex)) {
                // If no data-row-index, use sequential count
                const bgColor = (dataRowCount % 2 === 0) ? '#fff' : '#e4eaf1';
                row.style.setProperty('background-color', bgColor, 'important');
                row.querySelectorAll('.dt-cell').forEach(function(cell) {
                    cell.style.setProperty('background-color', bgColor, 'important');
                });
                dataRowCount++;
                return;
            }
            
            const cells = row.querySelectorAll('.dt-cell');
            // Use rowIndex for coloring - even = white, odd = blue-grey
            const bgColor = (rowIndex % 2 === 0) ? '#fff' : '#e4eaf1';
            
            row.style.setProperty('background-color', bgColor, 'important');
            cells.forEach(function(cell) {
                cell.style.setProperty('background-color', bgColor, 'important');
            });
        });
        
        // Standard table rows - ONLY tbody, exclude thead and headers
        const tableRows = document.querySelectorAll('.report-wrapper table tbody tr, .report-view table tbody tr, #page-query-report table tbody tr, table tbody tr');
        let bodyRowCount = 0;
        tableRows.forEach(function(row) {
            // Skip header rows, filter rows, and rows in thead
            if (row.classList.contains('dt-row-header') || 
                row.classList.contains('dt-row-filter') ||
                row.closest('thead') !== null ||
                row.parentElement.tagName === 'THEAD') {
                return;
            }
            // Color all body rows - even index = white, odd index = grey
            const bgColor = (bodyRowCount % 2 === 0) ? '#fff' : '#e4eaf1';
            row.style.setProperty('background-color', bgColor, 'important');
            // Also color cells
            row.querySelectorAll('td').forEach(function(cell) {
                cell.style.setProperty('background-color', bgColor, 'important');
            });
            bodyRowCount++;
        });
        
        // Also handle list rows
        const listRows = document.querySelectorAll('.report-wrapper .list-row, .report-view .list-row, .report-wrapper .result .dt-row, .report-view .result .dt-row');
        let listRowCount = 0;
        listRows.forEach(function(row) {
            if (row.classList.contains('dt-row-header') || row.classList.contains('dt-row-filter')) {
                return;
            }
            const bgColor = (listRowCount % 2 === 0) ? '#fff' : '#e4eaf1';
            row.style.setProperty('background-color', bgColor, 'important');
            listRowCount++;
        });
    }
    
    // Watch for DataTable - simplified approach (no constructor hooking)
    function watchForDatatable() {
        // We don't hook into DataTable constructor anymore
        // Instead, we rely on MutationObserver and polling which is more reliable
        // This prevents "apply is not a constructor" errors
    }
    
    // Initialize everything
    function init() {
        injectCSS();
        applyRowStyles();
        watchForDatatable();
        
        // Watch for DOM changes
        const observer = new MutationObserver(function() {
            setTimeout(applyRowStyles, 50);
        });
        
        const containers = document.querySelectorAll('body');
        if (containers.length > 0) {
            observer.observe(containers[0], { 
                childList: true, 
                subtree: true,
                attributes: true
            });
        }
        
        // Continuous polling as fallback
        setInterval(applyRowStyles, 500);
    }
    
    // Start immediately
    injectCSS();
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        setTimeout(init, 100);
    }
    
    // Multiple retries for dynamic content
    setTimeout(init, 500);
    setTimeout(init, 1000);
    setTimeout(init, 2000);
    setTimeout(init, 3000);
    
    // Listen for Frappe route changes (SPA navigation)
    if (typeof frappe !== 'undefined' && frappe.router) {
        frappe.router.on('change', function() {
            setTimeout(init, 500);
        });
    }
    
    // Listen for page show events (when user navigates back)
    window.addEventListener('pageshow', function() {
        setTimeout(init, 100);
    });
})();
