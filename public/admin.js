// Load repairs data from API
async function loadRepairs() {
    const contentDiv = document.getElementById('content');
    contentDiv.innerHTML = '<div class="loading">Loading repair data...</div>';

    try {
        const response = await fetch('/api/repairs');
        
        if (!response.ok) {
            throw new Error(`Failed to fetch repairs: ${response.statusText}`);
        }

        const repairs = await response.json();
        displayRepairs(repairs);
        displayStats(repairs);
    } catch (error) {
        console.error('Error:', error);
        contentDiv.innerHTML = `<div class="error">❌ Error loading data: ${error.message}</div>`;
    }
}

// Display repairs in the UI
function displayRepairs(repairs) {
    const contentDiv = document.getElementById('content');

    if (!repairs || repairs.length === 0) {
        contentDiv.innerHTML = '<div class="no-data">No repair submissions found.</div>';
        return;
    }

    const cardsHTML = repairs.map(repair => `
        <div class="repair-card">
            <div class="repair-header">
                <h3>${escapeHtml(repair.name)}</h3>
                <span class="repair-id">#${repair.id}</span>
            </div>
            
            <div class="repair-details">
                <div class="detail-item">
                    <div class="detail-label">Email</div>
                    <div class="detail-value">
                        <a href="mailto:${escapeHtml(repair.email)}">${escapeHtml(repair.email)}</a>
                    </div>
                </div>
                
                <div class="detail-item">
                    <div class="detail-label">Phone</div>
                    <div class="detail-value">
                        <a href="tel:${escapeHtml(repair.phone)}">${escapeHtml(repair.phone)}</a>
                    </div>
                </div>
                
                <div class="detail-item">
                    <div class="detail-label">Machine Type</div>
                    <div class="detail-value">${escapeHtml(repair.machine)}</div>
                </div>
                
                <div class="detail-item">
                    <div class="detail-label">Service Type</div>
                    <div class="detail-value">${escapeHtml(repair.service)}</div>
                </div>
            </div>
            
            <div class="repair-problem">
                <div class="detail-label">Problem Description</div>
                <p>${escapeHtml(repair.problem)}</p>
            </div>
            
            ${repair.image ? `
                <div class="repair-image">
                    <div class="detail-label">Uploaded Image</div>
                    <img src="${escapeHtml(repair.image)}" alt="Repair image">
                </div>
            ` : ''}
        </div>
    `).join('');

    contentDiv.innerHTML = `<div class="repair-cards">${cardsHTML}</div>`;
}

// Display statistics
function displayStats(repairs) {
    const statsDiv = document.getElementById('stats');
    
    if (!repairs || repairs.length === 0) {
        statsDiv.innerHTML = '';
        return;
    }

    // Count services
    const serviceCounts = {};
    const machineCounts = {};
    
    repairs.forEach(repair => {
        serviceCounts[repair.service] = (serviceCounts[repair.service] || 0) + 1;
        machineCounts[repair.machine] = (machineCounts[repair.machine] || 0) + 1;
    });

    // Find most common service
    const topService = Object.entries(serviceCounts).reduce((a, b) => a[1] > b[1] ? a : b, ['N/A', 0]);
    const topMachine = Object.entries(machineCounts).reduce((a, b) => a[1] > b[1] ? a : b, ['N/A', 0]);

    statsDiv.innerHTML = `
        <div class="stat-card">
            <div class="stat-number">${repairs.length}</div>
            <div class="stat-label">Total Submissions</div>
        </div>
        <div class="stat-card">
            <div class="stat-number">${topService[1]}</div>
            <div class="stat-label">Most Common: ${topService[0]}</div>
        </div>
        <div class="stat-card">
            <div class="stat-number">${topMachine[1]}</div>
            <div class="stat-label">Most Common: ${topMachine[0]}</div>
        </div>
    `;
}

// Export data to CSV
function exportData() {
    fetch('/api/repairs')
        .then(response => response.json())
        .then(repairs => {
            if (!repairs || repairs.length === 0) {
                alert('No data to export');
                return;
            }

            // Prepare CSV headers
            const headers = ['ID', 'Name', 'Email', 'Phone', 'Machine', 'Service', 'Problem'];
            
            // Prepare CSV rows
            const rows = repairs.map(repair => [
                repair.id,
                `"${repair.name.replace(/"/g, '""')}"`,
                repair.email,
                repair.phone,
                repair.machine,
                repair.service,
                `"${repair.problem.replace(/"/g, '""')}"`
            ]);

            // Combine headers and rows
            const csvContent = [
                headers.join(','),
                ...rows.map(row => row.join(','))
            ].join('\n');

            // Create blob and download
            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            const link = document.createElement('a');
            const url = URL.createObjectURL(blob);
            
            link.setAttribute('href', url);
            link.setAttribute('download', `repairs-export-${new Date().toISOString().split('T')[0]}.csv`);
            link.style.visibility = 'hidden';
            
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        })
        .catch(error => {
            console.error('Export error:', error);
            alert('Failed to export data');
        });
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Load repairs when page loads
document.addEventListener('DOMContentLoaded', loadRepairs);
