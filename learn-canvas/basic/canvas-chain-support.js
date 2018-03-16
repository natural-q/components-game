// 让canvas支持链式语法，来自十年灯
~ function() {
  var pro = ['save', 'restore', 'scale', 'rotate', 'translate', 'transform', 'createLinearGradient', 'createRadialGradient', 'getLineDash', 'clearRect', 'fillRect', 'beginPath', 'closePath', 'moveTo', 'lineTo', 'quadraticCurveTo', 'bezierCurveTo', 'arcTo', 'rect', 'arc', 'fill', 'stroke', 'clip', 'isPointInPath', 'measureText', 'clearShadow', 'fillText', 'strokeText', 'strokeRect', 'drawImage', 'drawImageFromRect', 'putImageData', 'createPattern', 'createImageData', 'getImageData', 'lineWidth', 'strokeStyle', 'globalAlpha', 'fillStyle', 'font', 'shadowOffsetX', 'shadowOffsetY', 'shadowBlur', 'shadowColor', 'lineCap', 'lineJoin', 'miterLimit', 'globalCompositeOperation'];

  function XtendCanvas(canvas) {
    var ctx = canvas.getContext('2d'),
      fn = function() {},
      fnP = fn.prototype;
      
    for (var j = 0, p = pro[0]; p; p = pro[j++]) {
      fn.prototype[p] = function(p) {
        return function() {
          var args = Array.prototype.slice.call(arguments);
          // console.log(args);
          if (typeof ctx[p] == 'function') {
            ctx[p].apply(ctx, args);
          } else {
            ctx[p] = args + '';
          }
          return fnP;
        };
      }(p);
    }
    return new fn;
  };

  window.XtendCanvas = XtendCanvas;
}();
