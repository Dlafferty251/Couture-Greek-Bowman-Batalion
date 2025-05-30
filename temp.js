javascript: (function () {
  function ask(field, placeholder = '') {
    return prompt(`${field}${placeholder ? ` (${placeholder})` : ''}`, placeholder);
  }

  const jobTitle = document.querySelector('h1')?.innerText || ask('Job Title');
  const company =
    document.querySelector('.topcard__org-name-link, .topcard__flavor')?.innerText ||
    ask('Company');
  const url = window.location.href;
  const today = new Date().toISOString().slice(0, 10);

  fetch('http://localhost:5678/webhook/7c8acdf0-7b21-4076-9724-37756ee494e5', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      Company: company,
      Title: jobTitle,
      Pay: ask('Pay'),
      'Job Description Link': url,
      Location: ask('Location'),
      'Remote/In-Person/Hybrid': ask('Remote/In-Person/Hybrid'),
      'Resume Link': ask('Resume Link (paste URL if used)'),
      'Company Contact (name & email)': ask('Company Contact (name & email)'),
      'Reference Used (name)': ask('Reference Used (name)'),
      'Date Applied': today,
      'Application Status': 'Applied',
      'Interview Dates/Times': ask('Interview Dates/Times'),
      'Offer Status': ask('Offer Status'),
      'Offer Decision': ask('Offer Decision'),
      'Interview/Application Feedback (if provided)': ask(
        'Interview/Application Feedback (if provided)'
      ),
      'Other Important Notes About Job': ask('Other Important Notes About Job'),
    }),
  }).then(() => alert('✅ Job application logged!'));
})();
