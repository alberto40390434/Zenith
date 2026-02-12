// Register Scramjet service worker first
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js', { scope: '/service/' })
        .then(() => console.log('Scramjet service worker registered'))
        .catch(err => console.error('Service worker registration failed:', err));
}

window.launchZenith = async function(val) {
    if (!val || !val.trim()) return;
    let url = val.trim();
    
    if (!url.includes('.') || url.includes(' ')) {
        url = 'https://www.google.com/search?q=' + encodeURIComponent(url);
    } else if (!url.startsWith('http')) {
        url = 'https://' + url;
    }
    
    const mainContent = document.getElementById('content-area');
    const frame = document.getElementById('proxy-view');
    
    if (mainContent) mainContent.style.display = 'none';
    if (frame) {
        frame.style.display = 'block';
        frame.src = '/service/' + encodeURIComponent(url);
    }
};

window.goHome = function() {
    window.location.reload();
};

document.addEventListener('DOMContentLoaded', () => {
    const topForm = document.getElementById('nav-form');
    if (topForm) {
        topForm.onsubmit = (e) => {
            e.preventDefault();
            launchZenith(document.getElementById('nav-address').value);
        };
    }
    
    const middleForm = document.getElementById('sj-form');
    if (middleForm) {
        middleForm.onsubmit = (e) => {
            e.preventDefault();
            launchZenith(document.getElementById('sj-address').value);
        };
    }
});
