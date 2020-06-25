var $ = django.jQuery;

window.onload = function(){


  node =   document.querySelectorAll('div.readonly')[3]
  
    node.parentNode.appendChild(prettyJson(JSON.parse(node.innerText)));
  
    node.innerText="";
  
  }