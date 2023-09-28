const activityEntryHandler = async (event) => {
    event.preventDefault();
    
    const activity_type = document.querySelector('#type').value;
    const duration = document.querySelector('#actvity-duration').value.trim();

    if (activity_type && duration) {
        const response = await fetch('/api/activity/', {
            method: 'POST',
            body: JSON.stringify({ activity_type, duration}),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            alert('Activity saved!')
            document.location.replace('/dashboard')
        } else {
            alert(response.statusText);
        }
    }
}

document.querySelector('.activity-form').addEventListener('submit', activityEntryHandler);