const statFormHandler = async (event) => {
    event.preventDefault();

    const statType = document.querySelector('#stat-type').value;
    const amount = document.querySelector('#stat-amount').value;

    if (statType && amount) {
        const response = await fetch('/api/user/dailylog', {
            method: 'PUT',
            body: JSON.stringify({ statType, amount}),
            headers: { 'Content-Type': 'application/json' },
        })
    }

    if (response.ok) {
        alert('Daily Log updated!')
        document.location.replace('/dashboard')
    } else {
        alert(response.statusText);
    }
}

document.querySelector('.daily-log-form').addEventListener('submit', activityEntryHandler);