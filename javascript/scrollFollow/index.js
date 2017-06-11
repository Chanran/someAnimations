window.onscroll = function() {
  var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  // console.log(scrollTop);
  var block = document.getElementById('block');
  block.style.top = scrollTop + 10 + 'px'; 
  console.log(block.style.top);
}