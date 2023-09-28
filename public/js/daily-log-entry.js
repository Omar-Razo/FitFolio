const statFormHandler = async (event) => {
    event.preventDefault();

    const statType = document.querySelector('#stat').value;
    const amount = document.querySelector('#stat-amount').value;
    console.log(statType, amount)

    if (statType && amount) {
        try {
            console.log("both type and amount are not null")
            const response = await fetch('/api/dailylog', {
                method: 'PUT',
                body: JSON.stringify({ statType, amount}),
                headers: { 'Content-Type': 'application/json' },
            });
    
            if (response.ok) {
                alert('Daily Log updated!')
                document.location.replace('/dashboard')
            } else {
                alert(response.statusText);
                console.log(response)
            }
        } catch (err) {
            res.status(500).json(err);
            console.log(err)
        }

    }
}



document.querySelector('.daily-log-form').addEventListener('submit', statFormHandler);
