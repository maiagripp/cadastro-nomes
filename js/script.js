
window.addEventListener('load', start);


var globalIsEditing = false;
var globalCurrentItem = null;
var globalNames = ['Um', 'Dois', 'Três', 'Quatro'];


function start() {
  preventFormSubmit();
  activateInput();
  renderNames();
}

function preventFormSubmit() {
  function handleSubmit(event) {
    event.preventDefault();
  }

  var form = document.querySelector('form');
  form.addEventListener('submit', handleSubmit);
}

function activateInput() {
  function handleKeyup(event) {
    if (event.key !== 'Enter') {
      return;
    }

    var currentName = event.target.value.trim();

    if (currentName === '') {
      clear();
      return;
    }

  
    if (globalIsEditing) {
      globalNames[globalCurrentItem] = currentName;
    } else {
      globalNames.push(currentName);
    }

  
    clear();
    renderNames();
  }

  var inputName = getInput();
  inputName.addEventListener('keyup', handleKeyup);
}


function getInput() {
  return document.querySelector('#inputName');
}


function clear() {
  var inputName = getInput();
  inputName.value = '';
  inputName.focus();
  globalIsEditing = false;
}


function renderNames() {
  function createDeleteButton(index) {
    function removeItem() {
      globalNames.splice(index, 1);
      renderNames();
    }

    var button = document.createElement('button');
    button.textContent = 'x';
    button.classList.add('deleteButton');
    button.addEventListener('click', removeItem);

    return button;
  }

  
  function createNameSpan(currentName, currentItem) {
    function editItem() {
      var inputName = getInput();
      globalIsEditing = true;
      globalCurrentItem = currentItem;
      inputName.value = currentName;
      inputName.focus();
    }

    var span = document.createElement('span');
    span.textContent = currentName;
    span.classList.add('clickable');
    span.addEventListener('click', editItem);

    return span;
  }


  var divNames = document.querySelector('#names');

 
  var ul = document.createElement('ul');

  for (var i = 0; i < globalNames.length; i++) {

    var currentName = globalNames[i];
    var currentItem = i;

    var deleteButton = createDeleteButton(currentItem);
    var nameSpan = createNameSpan(currentName, currentItem);

 
    var li = document.createElement('li');
    li.appendChild(deleteButton);
    li.appendChild(nameSpan);

    ul.appendChild(li);
  }


  divNames.innerHTML = '';


  divNames.appendChild(ul);
}
