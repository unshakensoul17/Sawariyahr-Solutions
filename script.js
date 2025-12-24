// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mainNav = document.getElementById('mainNav');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            mainNav.classList.toggle('active');
        });

        document.addEventListener('click', function(e) {
            if (!mobileMenuBtn.contains(e.target) && !mainNav.contains(e.target)) {
                mainNav.classList.remove('active');
            }
        });

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

// ===================================================================
// GOOGLE SHEETS CONNECTION - YOUR LIVE ENDPOINT
// ===================================================================
const GOOGLE_SHEET_JSON_URL = 'https://sheets.googleapis.com/v4/spreadsheets/1EssTu-5IUbgIZTnAA3vA0U4PJKgiBnMlRMi6IlbKq_M/values/Sawariya_Jobs!A1:L1000?key=AIzaSyBmPzDMUIuYnLNL9Eqhmb0P6KxZj_3Lcoc';

console.log('🔗 SAWARIYA HR - Google Sheets Connection Initialized');
console.log('📍 Endpoint:', GOOGLE_SHEET_JSON_URL);
console.log('📝 Sheet Name: Sawariya_Jobs');
console.log('🔑 API Key: Connected');

// ===================================================================
// FETCH JOBS FROM GOOGLE SHEETS - LIVE DATA ONLY
// ===================================================================
async function fetchJobsFromGoogleSheets() {
    console.log('🔍 Fetching jobs from Google Sheets...');
    
    try {
        const response = await fetch(GOOGLE_SHEET_JSON_URL);
        console.log('📡 Response Status:', response.status, response.statusText);
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('📊 Raw data received:', data);
        
        // Parse Google Sheets API v4 response
        if (data.values && data.values.length > 1) {
            const headers = data.values[0];
            const rows = data.values.slice(1);
            
            console.log('📋 Found', rows.length, 'rows in sheet');
            console.log('📑 Headers:', headers);
            
            // Map rows to job objects
            const jobs = rows.map((row, index) => {
                // Skip empty rows
                if (!row || row.length === 0 || !row[0]) {
                    console.log(`⏭️ Skipping empty row ${index + 2}`);
                    return null;
                }
                
                const job = {
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
                
                console.log(`${job.active ? '✅' : '❌'} Job ${job.id}: ${job.title} (Active: ${job.active})`);
                
                return job;
            }).filter(job => job !== null && job.active);
            
            console.log('🎯 Active jobs found:', jobs.length);
            console.log('📦 Jobs to display:', jobs);
            
            return jobs;
        } else {
            console.warn('⚠️ No data found in sheet or only headers present');
            return [];
        }

    } catch (error) {
        console.error('❌ ERROR fetching jobs:', error);
        console.error('📍 Error details:', error.message);
        return [];
    }
}

// ===================================================================
// LOAD FEATURED JOBS (HOMEPAGE)
// ===================================================================
function loadFeaturedJobs() {
    console.log('🏠 Loading featured jobs for homepage...');
    const container = document.getElementById('featuredJobs');
    
    fetchJobsFromGoogleSheets().then(jobs => {
        if (jobs && jobs.length > 0) {
            console.log('✅ Displaying', Math.min(3, jobs.length), 'featured jobs');
            displayFeaturedJobs(jobs.slice(0, 3));
        } else {
            console.warn('⚠️ No jobs available to display');
            container.innerHTML = '<p style="text-align: center; padding: 2rem; color: var(--text-gray);">No jobs available at the moment. Check back soon!</p>';
        }
    }).catch(error => {
        console.error('❌ Error loading featured jobs:', error);
        container.innerHTML = '<p style="text-align: center; padding: 2rem; color: var(--text-gray);">Unable to load jobs. Please try again later.</p>';
    });
}

// ===================================================================
// DISPLAY FEATURED JOBS
// ===================================================================
function displayFeaturedJobs(jobs) {
    console.log('🎨 Rendering', jobs.length, 'featured job cards');
    const container = document.getElementById('featuredJobs');
    
    if (jobs.length === 0) {
        container.innerHTML = '<p style="text-align: center; padding: 2rem; color: var(--text-gray);">No jobs available at the moment. Check back soon!</p>';
        return;
    }

    container.innerHTML = jobs.map(job => createJobCard(job)).join('');
    console.log('✅ Featured jobs rendered successfully');
}

// ===================================================================
// CREATE JOB CARD HTML
// ===================================================================
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

// ===================================================================
// GET JOB BY ID
// ===================================================================
async function getJobById(jobId) {
    console.log('🔍 Looking for job with ID:', jobId);
    
    try {
        const jobs = await fetchJobsFromGoogleSheets();
        const job = jobs.find(job => job.id === jobId) || null;
        
        if (job) {
            console.log('✅ Job found:', job.title);
        } else {
            console.warn('⚠️ Job not found with ID:', jobId);
        }
        
        return job;
    } catch (error) {
        console.error('❌ Error getting job by ID:', error);
        return null;
    }
}

// ===================================================================
// SMOOTH SCROLLING
// ===================================================================
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

// ===================================================================
// UTILITY FUNCTIONS
// ===================================================================
function formatDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString('en-IN', options);
}

// ===================================================================
// INITIALIZATION LOG
// ===================================================================
console.log('✅ Sawariya HR Solutions - JavaScript Loaded');
console.log('🌐 Ready to fetch live job data from Google Sheets');
console.log('📌 Remember: Jobs with active=TRUE will display on website');
console.log('');
console.log('💡 To debug:');
console.log('   1. Check if GOOGLE_SHEET_JSON_URL is correct');
console.log('   2. Verify sheet name is exactly "Sawariya_Jobs"');
console.log('   3. Ensure sheet is public (Anyone with link can view)');
console.log('   4. Check jobs have active=TRUE in column L');
console.log('');
console.log('🧪 To test API directly, open this URL:');
console.log('   ' + GOOGLE_SHEET_JSON_URL);
console.log('');

// ===================================================================
// NO SAMPLE DATA IN THIS FILE - ALL DATA FROM GOOGLE SHEETS
// ===================================================================