export function MP(ak) {
  return new Promise(function (resolve, reject) {
    window.onload = function () {
      resolve(BMap)
    }
    var script = document.createElement("script");
    script.type = "text/javascript";
    // script.src = "http://api.map.baidu.com/api?v=2.0&ak="+ak+"&callback=init";
    script.src = "http://api.map.baidu.com/api?v=2.0&ak=go6vKGepAl5BVY8qkHsWfuQMgQb8LEwX&callback=init";
    script.onerror = reject;
    document.head.appendChild(script);
  })
}
