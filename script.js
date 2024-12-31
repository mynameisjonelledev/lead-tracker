let myLeads = [];
const inputBtn = document.querySelector('#input-btn');
const inputEl = document.querySelector('#input-el');

const ulEl = document.querySelector('#ul-el');

const deleteBtn = document.querySelector('#delete-btn');

const leadsFromLocalStorage = JSON.parse(localStorage.getItem('myLeads'));

const tabBtn = document.querySelector('#tab-btn');

//leadsFromLocalStorage ? renderLeads() : console.log('No leads yet');

if (leadsFromLocalStorage) {
  myLeads = leadsFromLocalStorage
  render(myLeads);
}

/* const tabs = [
  {url: 'https://www.linkedin.com/in/per-harald-borgen/'}
]; */

tabBtn.addEventListener('click', () => {
  chrome.tabs.query({active:true, currentWindow:true}, (tabs) => {
    console.log(tabs);

    myLeads.push(tabs[0].url);
    localStorage.setItem('myLeads', JSON.stringify(myLeads));
    render(myLeads);
  });

  
});

// So basically, ung parameter ng function is connected sa parameter na ginamit mo sa pagcall ng function. 

// Ung parameter sa function is the name.

// Ung parameter sa pag-call ng function is the source.
function render(leads) {
  let listItems = '';

for (let i = 0; i < leads.length; i++){
  listItems += `<li><a href="${leads[i]}" target="_blank">${myLeads[i]}</a></li>`;
}
  ulEl.innerHTML = listItems;
  
}

deleteBtn.addEventListener('dblclick', () => {
  localStorage.clear();
  myLeads = [];
  render(myLeads);
});


// Keyboard keydown
inputEl.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    saveLeads();
    render(myLeads);
  }
});

inputBtn.addEventListener('click', () => {
  saveLeads();
  render(myLeads);
});


function saveLeads() {
  myLeads.push(inputEl.value);

  localStorage.setItem('myLeads', JSON.stringify(myLeads));
  render(myLeads);

  inputEl.value = '';

  
}



