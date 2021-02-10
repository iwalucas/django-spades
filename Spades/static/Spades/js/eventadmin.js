var $ = django.jQuery;

window.onload = function(){
  node =   document.querySelectorAll('textarea.pretty');

  node.forEach(element => {
    var holder = document.createElement('div');
    holder.setAttribute('style','margin-top: 2rem;')

    holder.appendChild(prettyJson(JSON.parse(element.value)));
    element.parentNode.appendChild(holder);

  });
 

}