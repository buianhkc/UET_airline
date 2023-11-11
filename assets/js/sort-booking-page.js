document.addEventListener('DOMContentLoaded', function () {
  var buttonChoice = document.getElementById('buttonChoice');
  var dropdownList = document.getElementById('dropdownList');

  buttonChoice.addEventListener('click', function () {
    // Toggle the visibility of the dropdown list
    dropdownList.style.display = (dropdownList.style.display === 'block') ? 'none' : 'block';
  });

  // Handle item selection
  dropdownList.addEventListener('click', function (event) {
    if (event.target.tagName === 'LI') {
      var selectedSort = event.target.dataset.sort;
      // Do something with the selected sort option (e.g., trigger sorting function)
      console.log('Selected Sort:', selectedSort);

      // Hide the dropdown list
      dropdownList.style.display = 'none';
    }
  });

  // Hide the dropdown list when clicking outside of it
  document.addEventListener('click', function (event) {
    if (!buttonChoice.contains(event.target) && !dropdownList.contains(event.target)) {
      dropdownList.style.display = 'none';
    }
  });
});