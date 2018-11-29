function selectText (id) {
    document.getElementById('edit' + id).focus();
}

function editLocation (id) {
    var currentLocation = document.getElementById('edit' + id).innerHTML;
    var hiddenInput = document.getElementById('townLocation' + id);

    hiddenInput.value = currentLocation;

    document.getElementById('form' + id).submit();
    // alert('Successfully changed to' + previousLocation);
}

function checkRegInput () {
    var registrationNumberElemID = document.getElementById('msg');
    var registrationNumberElem = document.getElementById('registrationNumber');
    var registrationNumberFull = registrationNumberElem.value;
    registrationNumberFull = registrationNumberFull.toUpperCase();
    var registrationNumberCode = registrationNumberFull.substring(0, 4);

    registrationNumberElemID.innerHTML = 'Shucks, this is not a valid registration number.';
    registrationNumberElemID.classList.add('show');
    registrationNumberElemID.classList.remove('hide');
    registrationNumberElem.classList.add('is-invalid');
    registrationNumberElem.classList.remove('is-valid');
    document.getElementById('submit').disabled = true;

    if (registrationNumberFull.match(/C[A-Z]\s[0-9]{3}(-|\s)[0-9]{3}/)) {
        registrationNumberElemID.classList.remove('show');
        registrationNumberElemID.classList.add('hide');
        registrationNumberElem.classList.add('is-valid');
        registrationNumberElem.classList.remove('is-invalid');
        document.getElementById('submit').disabled = false;

        if (registrationNumberFull.length > 10) {
            registrationNumberElemID.innerHTML = 'Shucks, to many characters in registration number.';
            registrationNumberElemID.classList.add('show');
            registrationNumberElemID.classList.remove('hide');
            registrationNumberElem.classList.add('is-invalid');
            registrationNumberElem.classList.remove('is-valid');
            document.getElementById('submit').disabled = true;
        }
    }

    if (registrationNumberFull.match(/C[A-Z]{2}\s[0-9]{5}/)) {
        registrationNumberElemID.classList.remove('show');
        registrationNumberElemID.classList.add('hide');
        registrationNumberElem.classList.add('is-valid');
        registrationNumberElem.classList.remove('is-invalid');
        document.getElementById('submit').disabled = false;

        if (registrationNumberFull.length > 9) {
            registrationNumberElemID.innerHTML = 'Shucks, to many characters in registration number.';
            registrationNumberElemID.classList.add('show');
            registrationNumberElemID.classList.remove('hide');
            registrationNumberElem.classList.add('is-invalid');
            registrationNumberElem.classList.remove('is-valid');
            document.getElementById('submit').disabled = true;
        }
    }
}
