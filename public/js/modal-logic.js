// modal logic

const dailyLogButton = document.querySelector('#daily-log-button');
const activityButton = document.querySelector('#new-activity-button');

const dlModalBackground = document.querySelector('#dl-modal-background');
const actModalBackground = document.querySelector('#act-modal-background');

const dlModal = document.querySelector('#daily-log-modal');
const actModal = document.querySelector('#activity-modal');

const dlModalContent = document.querySelector('#dl-modal-content');
const actModalContent = document.querySelector('#act-modal-content');

dailyLogButton.addEventListener('click', () => {
    dlModal.classList.add('is-active')
})

activityButton.addEventListener('click', () => {
    actModal.classList.add('is-active')
})

dlModalBackground.addEventListener('click', () => {
    dlModal.classList.remove('is-active')
})

actModalBackground.addEventListener('click', () => {
    actModal.classList.remove('is-active')
})