function show(anything) {
  document.querySelector('.textBox').value = anything;
}

const dropDown = document.querySelector('.dropdown');

dropDown.onclick = function () {
  dropDown.classList.toggle('active');
};
