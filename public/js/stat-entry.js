const statFormHandler = async (event) => {
    event.preventDefault();

    const statType = document.querySelector('#stat-type').value;
    const amount = document.querySelector('#stat-amount').value;

    if (statType && amount) {
        const response = await fetch('/api/')
    }

    if (response.ok) {
        document.location.replace('/dashboard')
    } else {
        alert(response.statusText);
    }
    }
}