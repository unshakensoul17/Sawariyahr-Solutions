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
// IMPORTANT: Replace this with your actual Google Sheets JSON URL
// To get JSON from Google Sheets:
// 1. Make your sheet public (Share > Get link > Anyone with the link can view)
// 2. Use this format: https://sheets.googleapis.com/v4/spreadsheets/YOUR_SHEET_ID/values/Sawariya_Jobs?key=YOUR_API_KEY
// Or use a service like https://sheet.best/ or https://sheetdb.io/ for easier JSON conversion

const GOOGLE_SHEET_JSON_URL = 'https://sheets.googleapis.com/v4/spreadsheets/1EssTu-5IUbgIZTnAA3vA0U4PJKgiBnMlRMi6IlbKq_M/values/Sawariya_Jobs!A1:L1000?key=AIzaSyBmPzDMUIuYnLNL9Eqhmb0P6KxZj_3Lcoc';

// Sample job data structure (for reference)
// In production, this will come from your Google Sheet
const sampleJobsData = [
    {
        id: 'JOB001',
        title: 'Sales Executive',
        location: 'Mumbai, Maharashtra',
        salary: '₹20,000 - ₹35,000/month',
        type: 'Full-time',
        description: 'Looking for dynamic sales professionals with 1-2 years experience in B2B sales. Good communication skills and target-driven attitude required. Experience in FMCG or retail sales preferred.',
        requirements: [
            '1-2 years of sales experience',
            'Excellent communication skills',
            'Target-oriented mindset',
            'Two-wheeler required'
        ],
        responsibilities: [
            'Meet potential clients and pitch products',
            'Achieve monthly sales targets',
            'Maintain client relationships',
            'Report to sales manager'
        ],
        active: true
    },
    {
        id: 'JOB002',
        title: 'Warehouse Supervisor',
        location: 'Pune, Maharashtra',
        salary: '₹25,000 - ₹40,000/month',
        type: 'Full-time',
        description: 'Experience in warehouse management, inventory control, and team supervision required. Must have 3+ years experience in logistics or warehouse operations.',
        requirements: [
            '3+ years warehouse experience',
            'Inventory management skills',
            'Team leadership abilities',
            'Basic computer knowledge'
        ],
        responsibilities: [
            'Supervise warehouse staff',
            'Manage inventory and stock',
            'Ensure timely dispatch',
            'Maintain safety standards'
        ],
        active: true
    },
    {
        id: 'JOB003',
        title: 'Customer Service Representative',
        location: 'Delhi NCR',
        salary: '₹18,000 - ₹28,000/month',
        type: 'Full-time',
        description: 'Handle customer queries via phone and email. Good English communication required. Freshers can apply. Training will be provided.',
        requirements: [
            'Good English communication',
            'Basic computer skills',
            'Patient and polite nature',
            'Willing to work in shifts'
        ],
        responsibilities: [
            'Handle customer calls and emails',
            'Resolve customer complaints',
            'Maintain call records',
            'Provide product information'
        ],
        active: true
    }
];

// Function to load featured jobs (homepage)
function loadFeaturedJobs() {
    const container = document.getElementById('featuredJobs');
    
    // In production, fetch from Google Sheets
    // fetchJobsFromGoogleSheets().then(jobs => {
    //     displayFeaturedJobs(jobs.filter(job => job.active).slice(0, 3));
    // });

    // For now, use sample data
    const activeJobs = sampleJobsData.filter(job => job.active).slice(0, 3);
    displayFeaturedJobs(activeJobs);
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

// Function to fetch jobs from Google Sheets (for production use)
async function fetchJobsFromGoogleSheets() {
    try {
        // Replace with your actual Google Sheets JSON endpoint
        const response = await fetch(GOOGLE_SHEET_JSON_URL);
        
        if (!response.ok) {
            throw new Error('Failed to fetch jobs');
        }

        const data = await response.json();
        
        // Parse Google Sheets data
        // The structure will depend on your API choice
        // Example for Google Sheets API v4:
        // const rows = data.values;
        // const jobs = rows.slice(1).map(row => ({
        //     id: row[0],
        //     title: row[1],
        //     location: row[2],
        //     salary: row[3],
        //     type: row[4],
        //     description: row[5],
        //     active: row[6] === 'TRUE'
        // }));

        // For sheet.best or sheetdb.io, the structure might be different
        // const jobs = data.map(row => ({
        //     id: row.id,
        //     title: row.title,
        //     location: row.location,
        //     salary: row.salary,
        //     type: row.type,
        //     description: row.description,
        //     active: row.active === 'TRUE'
        // }));

        return sampleJobsData; // Replace with actual parsed data
    } catch (error) {
        console.error('Error fetching jobs:', error);
        // Return sample data as fallback
        return sampleJobsData;
    }
}

// Get job by ID
function getJobById(jobId) {
    // In production, fetch from Google Sheets
    // const jobs = await fetchJobsFromGoogleSheets();
    // return jobs.find(job => job.id === jobId);
    
    return sampleJobsData.find(job => job.id === jobId);
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