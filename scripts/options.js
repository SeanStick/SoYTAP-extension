function restore_options(){
  if(localStorage.getItem("user")){
    document.getElementById("user").value = localStorage.getItem("user");
  }
}

function restore_options() {
  chrome.storage.sync.get({
    user: ''
  }, function(options) {
    console.log(options);
    document.getElementById('user').value = options.user;
  });
}

function save_options(){
  var user = document.getElementById('user').value;
  chrome.storage.sync.set({
    user: user
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
