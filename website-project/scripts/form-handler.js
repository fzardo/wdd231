function displaySubmission() {
    const params = new URLSearchParams(window.location.search);
    const details = document.querySelector('#submission-details');

    const submissionHTML = `
        <h3>Submission Details</h3>
        <p><strong>Name:</strong> ${decodeURIComponent(params.get('name'))}</p>
        <p><strong>Song:</strong> ${decodeURIComponent(params.get('song'))}</p>
        <p><strong>Artist:</strong> ${decodeURIComponent(params.get('artist'))}</p>
        <p><strong>Genre:</strong> ${decodeURIComponent(params.get('genre'))}</p>
        <p><strong>YouTube URL:</strong> 
            <a href="${decodeURIComponent(params.get('url'))}" target="_blank">
                ${decodeURIComponent(params.get('url'))}
            </a>
        </p>
        ${params.get('comments') ? `<p><strong>Comments:</strong> ${decodeURIComponent(params.get('comments'))}</p>` : ''}
        <p>We'll contact you at ${decodeURIComponent(params.get('email'))} if we add your submission!</p>
    `;

    details.innerHTML = submissionHTML;
}

// Call function when page loads
window.addEventListener('DOMContentLoaded', displaySubmission);