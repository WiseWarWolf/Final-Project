document.addEventListener('DOMContentLoaded', function() {

  const nameInput = document.getElementById('name');
 
  const clockInButton = document.getElementById('clockInButton');
  const preloadButton = document.getElementById('preload');
  
  clockInButton.addEventListener('click', handleClockIn);
  preloadButton.addEventListener('click', preLoadedData);

  function handleClockIn() {
    const name = nameInput.value.trim();
  
    if (name === '') {
      alert('Please enter your name before clocking in.');
      return;
    }
  
    const timestamp = new Date();
    saveClockIn(name, timestamp);
    displayClockInConfirmation(name, timestamp);
  
  }
  
  function saveClockIn(name, time) {

    const clockInRecord = {
      name: name,
      time: time.toISOString()
    };

    let records = JSON.parse(localStorage.getItem('clockInRecords')) || [];
    records.push(clockInRecord);
    localStorage.setItem('clockInRecords', JSON.stringify(records));
  
  }
  
  function displayClockInConfirmation(name, time) {
  
    const month = time.getMonth() + 1;
    const year = time.getFullYear();
    const day = time.getDate();
    const timeStr = time.toLocaleTimeString();
    const message = `${name} clocked in at ${timeStr} on ${month}/${day}/${year}`;
    let listItem = document.querySelector("#reclog ul");
    let newElement = document.createElement("li");

    newElement.textContent = message;
    listItem.appendChild(newElement);

  }

  function logPreview() {

    let listItem = document.querySelector("#reclog ul");
    const listData = localStorage.getItem('clockInRecords');
    let items;
    if (listData) {
      items = JSON.parse(listData);
    } else {
      items = [];
    }

    const recentItems = items.slice(-3);
    recentItems.forEach(record => {
      const recordElement = document.createElement("li");
      recordElement.textContent = formatClockInRecord(record);
      listItem.appendChild(recordElement);
    });

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

  function preLoadedData() {
    const Data = [
      { name: "Alex", time: "2025-05-01T09:08:56.124Z"},
      { name: "David", time: "2025-05-02T23:10:00.688Z"},
      { name: "Kole", time: "2025-05-03T05:08:56.211Z"}
    ];

    localStorage.setItem('clockInRecords', JSON.stringify(Data))
  }

  logPreview()
});
