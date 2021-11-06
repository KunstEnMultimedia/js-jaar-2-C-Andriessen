// event listener voor delete maken met een fetch

var formsDelete = document.querySelectorAll('.delEx');
var formsUpdate = document.querySelectorAll('.updateEx');
var formSave = document.querySelector('.save');

var nameInput = document.querySelector('#name');
var setsInput = document.querySelector('#sets');
var repsInput = document.querySelector('#reps');
var weightInput = document.querySelector('#weight');

formsDelete.forEach(formDelete => {
    formDelete.addEventListener('submit', function(ev) {
    ev.preventDefault();
    let formData = new FormData(formDelete);
    let name = formData.get('exercisename');

    fetch(`exercises/${name}`, {
        method: 'DELETE',
    }).then(() => window.location.reload());
});
});

formsUpdate.forEach(formUpdate => {
    formUpdate.addEventListener('submit', function(ev) {
    ev.preventDefault();
    let formDataUpdate = new FormData(formUpdate);
    let nameValue = formDataUpdate.get('exercisename');
    let setsValue = formDataUpdate.get('exercisesets');
    let repsValue = formDataUpdate.get('exercisereps');
    let weightValue = formDataUpdate.get('exerciseweight');

    formSave.className = 'update';
    
    nameInput.value = nameValue;
    setsInput.value = setsValue;
    repsInput.value = repsValue;
    weightInput.value = weightValue;
    
    var savebtn = document.querySelector('#savebtn');
    
    savebtn.innerHTML = 'Update';

    hiddenInput = document.createElement('input');
    hiddenInput.value = nameValue;
    hiddenInput.type = 'hidden';
    hiddenInput.id = 'hiddenName';
    formSave.appendChild(hiddenInput);
    
});
});

    formSave.addEventListener('submit', function(ev) {
        ev.preventDefault();
        if (formSave.className == 'update') {
            var name = nameInput.value;
            var sets = setsInput.value;
            var reps = repsInput.value;
            var weight = weightInput.value;
            var hidden = hiddenInput.value;
            fetch(`exercises/${name}/${sets}/${reps}/${weight}/${hidden}`, {
                method: 'PUT',
            }).then(() => window.location.reload());
        } else {
            ev.currentTarget.submit();
        }
    });