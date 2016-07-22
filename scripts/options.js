function restore_options() {
  chrome.storage.sync.get({
    user: '',
    toast: true,
    openTab: true
  }, function(options) {
    console.log(options);
    document.getElementById('user').value = options.user;
    document.getElementById('toast').checked = options.toast;
    document.getElementById('openTab').checked = options.openTab;
  });
}

function save_options(){
  var user = document.getElementById('user').value;
  var toast = document.getElementById('toast').checked;
  var openTab = document.getElementById('openTab').checked;
  chrome.storage.sync.set({
    user: user,
    toast: toast,
    openTab: openTab
  }, function() {
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
