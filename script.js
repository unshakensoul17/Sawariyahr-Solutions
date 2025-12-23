// ========================================
// Google Sheets Configuration
// ========================================

// IMPORTANT:
// 1. Replace YOUR_API_KEY with your restricted Google Sheets API key
// 2. Spreadsheet ID is already filled from your sheet
// 3. Sheet name must exactly match "Sawariya_Jobs"

const GOOGLE_SHEET_JSON_URL ="https://sheets.googleapis.com/v4/spreadsheets/1EssTu-5IUbgIZTnAA3vA0U4PJKgiBnMlRMi6IlbKq_M/values/Sawariya_Jobs!A1:L1000?key=AIzaSyBmPzDMUIuYnLNL9Eqhmb0P6KxZj_3Lcoc";

// ========================================
// Fetch Jobs from Google Sheets
// ========================================

async function fetchJobsFromGoogleSheets() {
  try {
    const response = await fetch(GOOGLE_SHEET_JSON_URL);

    if (!response.ok) {
      throw new Error("Failed to fetch Google Sheets data");
    }

    const data = await response.json();

    // Validate response
    if (!data.values || data.values.length < 2) {
      console.warn("Google Sheet has no job data");
      return [];
    }

    // Extract rows (skip header row)
    const rows = data.values.slice(1);

    // Convert rows → job objects
    const jobs = rows.map(row => ({
      id: row[0] || "",
      title: row[1] || "",
      location: row[2] || "",
      salary: row[3] || "",
      type: row[4] || "",
      description: row[5] || "",
      requirements: row[6] ? row[6].split("|") : [],
      responsibilities: row[7] ? row[7].split("|") : [],
      benefits: row[8] ? row[8].split("|") : [],
      company: row[9] || "",
      posted: row[10] || "",
      active: String(row[11]).trim().toUpperCase() === "TRUE"
    }));

    // Return only active jobs
    //return jobs.filter(job => job.active);

  } catch (error) {
    console.error("Error fetching jobs from Google Sheets:", error);
    return [];
  }
}
