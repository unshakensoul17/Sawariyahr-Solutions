# Sawariya HR Solutions - Recruitment Website

> A modern, serverless recruitment and lead generation platform for the Indian job market. Built with zero hosting costs using free tools.

![Status](https://img.shields.io/badge/status-production-green)
![License](https://img.shields.io/badge/license-MIT-blue)
![Cost](https://img.shields.io/badge/monthly%20cost-%E2%82%B90-success)

## 🎯 Project Overview

Sawariya HR Solutions is a complete recruitment website designed for HR consultancies and recruitment agencies targeting the Indian job market. The platform enables:

- **Job Seekers** to browse and apply for verified job openings without registration
- **HR Teams** to manage job listings through Google Sheets without coding
- **Employers** to receive candidate applications instantly

### Key Features

✅ **Zero Cost** - Completely free using Netlify, Google Sheets
✅ **No Registration Required** - Candidates can apply instantly
✅ **Mobile-First Design** - Optimized for Indian mobile users
✅ **Easy Management** - Update jobs via Google Sheets
✅ **Fast & Secure** - Modern static site with HTTPS
✅ **WhatsApp Integration** - Alternative application method
✅ **Form Handling** - Netlify Forms with email notifications
✅ **SEO Optimized** - Clean URLs and meta tags

## 🚀 Quick Start

### Prerequisites

- Google Account (for Google Sheets)
- GitHub Account (for version control)
- Netlify Account (free tier)
- Text editor (VS Code recommended)

### Installation

1. **Clone or download this repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/sawariya-hr-website.git
   cd sawariya-hr-website
   ```

2. **Update configuration**
   - Edit `script.js` - Add your Google Sheets JSON URL (line 14)
   - Update contact information in all HTML files
   - Replace phone numbers and email addresses

3. **Test locally**
   - Open `index.html` in a browser
   - Or use Live Server extension in VS Code

4. **Deploy to Netlify**
   - Push code to GitHub
   - Connect repository to Netlify
   - Deploy automatically

📖 **Detailed Setup**: See [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) for complete instructions

## 📁 Project Structure

```
sawariya-hr-website/
│
├── index.html              # Homepage
├── jobs.html               # Job listings page
├── job-details.html        # Individual job details
├── apply.html              # Application form
├── privacy.html            # Privacy policy
├── styles.css              # Complete stylesheet
├── script.js               # JavaScript functionality
├── netlify.toml            # Netlify configuration
├── README.md               # This file
└── DEPLOYMENT_GUIDE.md     # Detailed setup guide
```

## 🛠️ Technology Stack

| Component | Technology | Cost |
|-----------|-----------|------|
| Frontend | HTML5, CSS3, JavaScript | Free |
| Hosting | Netlify | Free |
| Database | Google Sheets | Free |
| Forms | Netlify Forms | Free |
| Version Control | GitHub | Free |
| SSL Certificate | Netlify (automatic) | Free |
| **Total Monthly Cost** | | **₹0** |

## 📊 Features Breakdown

### For Job Seekers
- Browse all active job listings
- Filter by location, job type, keywords
- View detailed job descriptions
- Apply online with resume upload
- Alternative WhatsApp application
- No registration or login required
- Mobile-optimized application form

### For HR Teams
- Manage jobs via Google Sheets
- Add/edit/remove jobs easily
- Enable/disable jobs with TRUE/FALSE toggle
- Receive applications via email
- Download applications as CSV
- Track application metrics
- No coding knowledge required

### Technical Features
- Responsive design (mobile, tablet, desktop)
- Fast loading (static site generation)
- SEO-friendly URLs and meta tags
- Form validation and error handling
- Spam protection (honeypot field)
- HTTPS encryption (automatic)
- Cross-browser compatible
- Accessible (WCAG guidelines)

## 📝 Google Sheets Setup

### Sheet Structure

Create a Google Sheet named "Sawariya_Jobs" with these columns:

| Column | Type | Description | Example |
|--------|------|-------------|---------|
| id | Text | Unique job ID | JOB001 |
| title | Text | Job title | Sales Executive |
| location | Text | Job location | Mumbai, Maharashtra |
| salary | Text | Salary range | ₹20,000 - ₹35,000/month |
| type | Text | Job type | Full-time |
| description | Text | Job description | Looking for... |
| requirements | Text | Requirements (pipe-separated) | 1-2 years\|Good communication |
| responsibilities | Text | Responsibilities (pipe-separated) | Meet clients\|Achieve targets |
| benefits | Text | Benefits (pipe-separated) | Incentives\|Travel allowance |
| company | Text | Company name | ABC Company |
| posted | Date | Posted date | 2024-12-20 |
| active | Boolean | Is active? | TRUE |

### Making Jobs Live

1. Open Google Sheet
2. Add job details in a new row
3. Set `active = TRUE`
4. Website updates automatically (1-2 min cache)

### Hiding Jobs

- Set `active = FALSE` to hide without deleting
- Useful for filled positions or seasonal roles

## 🎨 Customization

### Branding

1. **Logo**: Replace text logo in header with image
   ```html
   <div class="logo">
       <img src="logo.png" alt="Sawariya HR">
   </div>
   ```

2. **Colors**: Update CSS variables in `styles.css`
   ```css
   :root {
       --primary-color: #059669;  /* Change to your brand color */
       --primary-dark: #047857;
       --primary-light: #d1fae5;
   }
   ```

3. **Fonts**: Update font in `styles.css`
   ```css
   body {
       font-family: 'Your Font', sans-serif;
   }
   ```

### Contact Information

Update in all HTML files:
- Phone: `+91 98765 43210`
- Email: `info@sawariyahr.com`
- WhatsApp: `https://wa.me/919876543210`
- Location: `Rewa, Madhya Pradesh`

## 📈 Analytics & Tracking

### Netlify Analytics (Built-in)
- Pageviews and unique visitors
- Top pages and referrers
- Available in Netlify dashboard

### Google Analytics (Optional)

Add before `</head>` in all HTML files:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

## 🔒 Security Features

- ✅ HTTPS encryption (automatic)
- ✅ Form spam protection (honeypot)
- ✅ XSS protection headers
- ✅ Content security policy
- ✅ No client-side API keys
- ✅ Secure file uploads
- ✅ Privacy-compliant data handling

## 📱 Mobile Optimization

- Responsive design for all screen sizes
- Touch-friendly buttons and forms
- Fast loading on 3G/4G networks
- Optimized images and assets
- Mobile-first CSS approach
- Tested on Android and iOS

## 🌐 SEO Optimization

- ✅ Semantic HTML5
- ✅ Meta descriptions
- ✅ Open Graph tags (for social sharing)
- ✅ Clean URLs
- ✅ Fast page load
- ✅ Mobile-friendly
- ✅ Structured data (can be added)

### Adding to Google Search Console

1. Verify ownership via Netlify
2. Submit sitemap: `https://yoursite.com/sitemap.xml`
3. Monitor performance

## 🐛 Troubleshooting

### Common Issues

**Jobs not displaying?**
- Check Google Sheet is public
- Verify JSON URL in script.js
- Check `active = TRUE` in sheet
- Clear browser cache

**Form not working?**
- Verify `data-netlify="true"` attribute
- Redeploy site after form changes
- Check Netlify Forms dashboard

**Slow loading?**
- Enable Netlify's asset optimization
- Compress images
- Check Google Sheets response time

**Mobile layout broken?**
- Test in Chrome DevTools
- Check CSS media queries
- Validate HTML structure

## 📞 Support

- **Email**: info@sawariyahr.com
- **Phone**: +91 98765 43210
- **GitHub Issues**: [Report a bug](https://github.com/YOUR_USERNAME/sawariya-hr-website/issues)

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the MIT License.

```
MIT License

Copyright (c) 2024 Sawariya HR Solutions

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
```

## 🎓 Learning Resources

- [Netlify Documentation](https://docs.netlify.com/)
- [Google Sheets API](https://developers.google.com/sheets/api)
- [MDN Web Docs](https://developer.mozilla.org/)
- [Web.dev](https://web.dev/)

## 🚀 Roadmap

### Phase 1 (Current)
- ✅ Basic job listings
- ✅ Application forms
- ✅ Google Sheets integration
- ✅ Mobile responsive

### Phase 2 (Planned)
- [ ] Advanced search and filters
- [ ] Job alerts via email
- [ ] Candidate dashboard
- [ ] Application tracking
- [ ] Multiple language support

### Phase 3 (Future)
- [ ] AI-powered job matching
- [ ] Video interviews
- [ ] Skills assessments
- [ ] Employer portal
- [ ] API for integrations

## 🙏 Acknowledgments

- Netlify for free hosting
- Google for Sheets API
- Open source community
- Indian job seekers and recruiters

---

## 📊 Quick Stats

- **Setup Time**: 2-3 hours
- **Monthly Cost**: ₹0
- **Maintenance**: 15 minutes/week
- **Performance**: A+ on PageSpeed
- **Uptime**: 99.9% (Netlify SLA)

---

**Built with ❤️ for Indian job seekers**

**Version**: 1.0.0  
**Last Updated**: December 2024  
**Status**: Production Ready

---

### 🎯 Get Started Now

1. [Download Files](https://github.com/YOUR_USERNAME/sawariya-hr-website/archive/refs/heads/main.zip)
2. Follow [Deployment Guide](DEPLOYMENT_GUIDE.md)
3. Deploy to Netlify
4. Start receiving applications!

**Questions?** Open an [issue](https://github.com/YOUR_USERNAME/sawariya-hr-website/issues) or contact us!

---

*Made in India 🇮🇳 | Powered by Open Source*