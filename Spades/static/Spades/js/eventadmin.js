var $ = django.jQuery;

window.onload = function(){
  node =   document.querySelectorAll('div.readonly');
  node = node[node.length-1];

  node.parentNode.appendChild(prettyJson(JSON.parse(node.innerText)));


  node.innerText="";

}