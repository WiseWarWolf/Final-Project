document.addEventListener('DOMContentLoaded', function() {
    loadClockInRecords();

    function loadClockInRecords() {
        const listData = localStorage.getItem('clockInRecords');
        const items = listData ? JSON.parse(listData) : [];
        const ulElement = document.querySelector('#fullog ul');

        items.forEach(item => {
            const liElement = createListItem(item);
            ulElement.appendChild(liElement);
        });
    }

    function createListItem(item) {
        const liElement = document.createElement('li');

        if (typeof item === 'object') {
            liElement.textContent = formatClockInRecord(item);
        } else {
            liElement.textContent = item;
        }

        return liElement;
    }


    function formatClockInRecord(record) {
        if (!record.name || !record.time) {
            return 'Invalid record';
        }
    
        const date = new Date(record.time);
    
          
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        const day = date.getDate();
    
        const hours = date.getHours();
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const formattedHours = hours % 12 || 12;
    
        const formattedDate = `${month}/${day}/${year}`
        const formattedTime = `${formattedHours}:${minutes}:${seconds} ${ampm}`;
        return `${record.name} clocked in at ${formattedTime} on ${formattedDate}`;
    }
    
});