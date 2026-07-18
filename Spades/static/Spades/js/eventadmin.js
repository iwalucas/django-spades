window.onload = function () {
    var nodes = document.querySelectorAll('textarea.pretty');

    nodes.forEach(function (element) {
        var holder = document.createElement('div');
        holder.classList.add('jsonviz-holder');

        try {
            holder.appendChild(prettyJson(JSON.parse(element.value)));
            element.classList.add('jsonviz-hidden-source');
        } catch (err) {
            var error = document.createElement('p');
            error.classList.add('jsonviz-error');
            error.textContent = 'Could not render JSON: ' + err.message;
            holder.appendChild(error);
        }

        element.parentNode.appendChild(holder);
    });
};
