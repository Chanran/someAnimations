// bodymovin.loadAnimation({
//   path:'data.json',   //json文件路径
//   loop:true,
//   autoplay:true,
//   renderer:'canvas',  //渲染方式，有"html"、"canvas"和"svg"三种
//   container:document.getElementById('animation')
// });


const canvas = document.querySelector('#canvas')
const ctx = canvas.getContext('2d')

bodymovin.loadAnimation({
  path:'data1.json',   //json文件路径
  loop:true,
  autoplay:true,
  renderer:'canvas',  //渲染方式，有"html"、"canvas"和"svg"三种
  rendererSettings: {
    context: ctx,
    scaleMode: 'noScale',
    // clearCanvas: true
  }
  // container:document.getElementById('animation')
});
