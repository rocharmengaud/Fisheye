function totalLike() {
  let totalLikes = 0;
  console.log('test');
  Array.from(document.querySelectorAll('.media-card')).forEach((element) => {
    totalLikes += parseInt(element.dataset.likes);
    console.log(totalLikes);
  });
}
