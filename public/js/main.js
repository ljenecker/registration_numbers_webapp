function selectText (id) {
    document.getElementById('edit' + id).focus();
}

function editLocation (id) {
    var previousLocation = document.getElementById('edit' + id).innerHTML;
    alert('Successfully changed to' + previousLocation);
}

function checkRegInput () {
    var registrationNumber = document.getElementById('registrationNumber').value;

    var registrationNumberCode = registrationNumber.substring(0, 3);

    // if (registrationNumberCode.match(/\d+/g)) {alert('A Number Plate starts with an area code!')

}
