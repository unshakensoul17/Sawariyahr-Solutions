// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mainNav = document.getElementById('mainNav');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            mainNav.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileMenuBtn.contains(e.target) && !mainNav.contains(e.target)) {
                mainNav.classList.remove('active');
            }
        });

        // Close menu when clicking a link
        const navLinks = mainNav.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                mainNav.classList.remove('active');
            });
        });
    }

    // Load featured jobs on homepage
    if (document.getElementById('featuredJobs')) {
        loadFeaturedJobs();
    }
});

// Google Sheets Configuration
// Connected to your live Google Sheets database
const GOOGLE_SHEET_JSON_URL = 'https://sheets.googleapis.com/v4/spreadsheets/1EssTu-5IUbgIZTnAA3vA0U4PJKgiBnMlRMi6IlbKq_M/values/Sawariya_Jobs!A1:L1000?key=AIzaSyBmPzDMUIuYnLNL9Eqhmb0P6KxZj_3Lcoc';

// Function to load featured jobs (homepage)
function loadFeaturedJobs() {
    const container = document.getElementById('featuredJobs');
    
    // Fetch from Google Sheets
    fetchJobsFromGoogleSheets().then(jobs => {
        if (jobs && jobs.length > 0) {
            displayFeaturedJobs(jobs.slice(0, 3));
        } else {
            container.innerHTML = '<p style="text-align: center; padding: 2rem; color: var(--text-gray);">No jobs available at the moment. Check back soon!</p>';
        }
    }).catch(error => {
        console.error('Error loading jobs:', error);
        container.innerHTML = '<p style="text-align: center; padding: 2rem; color: var(--text-gray);">Unable to load jobs. Please try again later.</p>';
    });
}

// Function to display featured jobs
function displayFeaturedJobs(jobs) {
    const container = document.getElementById('featuredJobs');
    
    if (jobs.length === 0) {
        container.innerHTML = '<p style="text-align: center; padding: 2rem; color: var(--text-gray);">No jobs available at the moment. Check back soon!</p>';
        return;
    }

    container.innerHTML = jobs.map(job => createJobCard(job)).join('');
}

// Function to create job card HTML
function createJobCard(job) {
    return `
        <div class="job-card">
            <div class="job-header">
                <h3 class="job-title">${job.title}</h3>
                <span class="job-type-badge">${job.type}</span>
            </div>
            <div class="job-meta">
                <div class="job-meta-item">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                        <circle cx="12" cy="10" r="3"/>
                    </svg>
                    ${job.location}
                </div>
                <div class="job-meta-item">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                    </svg>
                    ${job.salary}
                </div>
            </div>
            <p class="job-description">${job.description.substring(0, 120)}...</p>
            <div class="job-actions">
                <a href="job-details.html?id=${job.id}" class="btn btn-outline btn-small">View Details</a>
                <a href="apply.html?job=${job.id}" class="btn btn-primary btn-small">Apply Now</a>
            </div>
        </div>
    `;
}

// Function to fetch jobs from Google Sheets
async function fetchJobsFromGoogleSheets() {
    try {
        const response = await fetch(GOOGLE_SHEET_JSON_URL);
        
        if (!response.ok) {
            throw new Error('Failed to fetch jobs from Google Sheets');
        }

        const data = await response.json();
        
        // Parse Google Sheets API v4 response
        if (data.values && data.values.length > 1) {
            const headers = data.values[0]; // First row contains headers
            const rows = data.values.slice(1); // Remaining rows contain data
            
            // Map rows to job objects
            const jobs = rows.map(row => {
                // Skip empty rows
                if (!row || row.length === 0 || !row[0]) return null;
                
                return {
                    id: row[0] || '',
                    title: row[1] || '',
                    location: row[2] || '',
                    salary: row[3] || '',
                    type: row[4] || '',
                    description: row[5] || '',
                    requirements: row[6] ? row[6].split('|').map(r => r.trim()) : [],
                    responsibilities: row[7] ? row[7].split('|').map(r => r.trim()) : [],
                    benefits: row[8] ? row[8].split('|').map(b => b.trim()) : [],
                    company: row[9] || '',
                    posted: row[10] || '',
                    active: (row[11] || '').toString().toUpperCase() === 'TRUE'
                };
            }).filter(job => job !== null && job.active); // Filter out null and inactive jobs
            
            return jobs;
        }

        return [];
    } catch (error) {
        console.error('Error fetching jobs from Google Sheets:', error);
        return [];
    }
}

// Get job by ID
async function getJobById(jobId) {
    try {
        const jobs = await fetchJobsFromGoogleSheets();
        return jobs.find(job => job.id === jobId) || null;
    } catch (error) {
        console.error('Error getting job by ID:', error);
        return null;
    }
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Form handling - Success redirect
// Netlify Forms will handle the submission automatically
// You can customize the success page in netlify.toml or form settings

// Utility function to format date
function formatDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString('en-IN', options);
}

// Export functions for use in other pages
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        fetchJobsFromGoogleSheets,
        getJobById,
        createJobCard
    };
}