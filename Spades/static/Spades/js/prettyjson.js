/*
Modern JSON tree viewer.

prettyJson(obj) receives a parsed JSON value and returns a NODE containing
a toolbar (expand all / collapse all / copy) and a collapsible tree with
type-colored values, using <details>/<summary> for native accessibility.
*/

function prettyJson(obj) {
    var root = document.createElement('div');
    root.classList.add('jsonviz');

    root.appendChild(jsonVizToolbar(root, obj));

    var tree = document.createElement('div');
    tree.classList.add('jsonviz-tree');
    tree.appendChild(jsonVizNode(null, obj, true));
    root.appendChild(tree);

    return root;
}

function jsonVizToolbar(root, obj) {
    var bar = document.createElement('div');
    bar.classList.add('jsonviz-toolbar');

    var expand = jsonVizButton('Expand all', function () {
        root.querySelectorAll('details').forEach(function (d) { d.open = true; });
    });
    var collapse = jsonVizButton('Collapse all', function () {
        root.querySelectorAll('details').forEach(function (d) { d.open = false; });
    });
    var copy = jsonVizButton('Copy JSON', function () {
        var text = JSON.stringify(obj, null, 2);
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text);
        } else {
            var ta = document.createElement('textarea');
            ta.value = text;
            document.body.appendChild(ta);
            ta.select();
            document.execCommand('copy');
            ta.remove();
        }
        copy.textContent = 'Copied!';
        setTimeout(function () { copy.textContent = 'Copy JSON'; }, 1200);
    });

    bar.appendChild(expand);
    bar.appendChild(collapse);
    bar.appendChild(copy);
    return bar;
}

function jsonVizButton(label, onClick) {
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.classList.add('jsonviz-btn');
    btn.textContent = label;
    btn.addEventListener('click', onClick);
    return btn;
}

/*
Builds one tree node. key is null for the root value.
Strings that themselves contain JSON objects/arrays are parsed and
rendered as subtrees, matching the old viewer's behavior.
*/
function jsonVizNode(key, value, open) {
    if (typeof value === 'string') {
        var trimmed = value.trim();
        if (trimmed.charAt(0) === '{' || trimmed.charAt(0) === '[') {
            try { value = JSON.parse(trimmed); } catch (err) { /* keep as string */ }
        }
    }

    if (value !== null && typeof value === 'object') {
        return jsonVizBranch(key, value, open);
    }
    return jsonVizLeaf(key, value);
}

function jsonVizBranch(key, value, open) {
    var isArray = Array.isArray(value);
    var keys = isArray ? null : Object.keys(value);
    var count = isArray ? value.length : keys.length;

    var details = document.createElement('details');
    details.classList.add('jsonviz-branch');
    if (open) { details.open = true; }

    var summary = document.createElement('summary');
    if (key !== null) {
        summary.appendChild(jsonVizKey(key));
    }
    var badge = document.createElement('span');
    badge.classList.add('jsonviz-badge');
    badge.textContent = isArray
        ? '[ ' + count + (count === 1 ? ' item' : ' items') + ' ]'
        : '{ ' + count + (count === 1 ? ' key' : ' keys') + ' }';
    summary.appendChild(badge);
    details.appendChild(summary);

    var children = document.createElement('div');
    children.classList.add('jsonviz-children');
    if (count === 0) {
        var empty = document.createElement('span');
        empty.classList.add('jsonviz-empty');
        empty.textContent = isArray ? 'empty array' : 'empty object';
        children.appendChild(empty);
    } else if (isArray) {
        value.forEach(function (item, i) {
            children.appendChild(jsonVizNode(i, item, false));
        });
    } else {
        keys.forEach(function (k) {
            children.appendChild(jsonVizNode(k, value[k], false));
        });
    }
    details.appendChild(children);
    return details;
}

function jsonVizLeaf(key, value) {
    var row = document.createElement('div');
    row.classList.add('jsonviz-row');
    if (key !== null) {
        row.appendChild(jsonVizKey(key));
    }

    var val = document.createElement('span');
    val.classList.add('jsonviz-value');
    if (value === null) {
        val.classList.add('jsonviz-null');
        val.textContent = 'null';
    } else if (typeof value === 'boolean') {
        val.classList.add('jsonviz-bool');
        val.textContent = value;
    } else if (typeof value === 'number') {
        val.classList.add('jsonviz-number');
        val.textContent = value;
    } else {
        val.classList.add('jsonviz-string');
        val.textContent = value;
    }
    row.appendChild(val);
    return row;
}

function jsonVizKey(key) {
    var el = document.createElement('span');
    el.classList.add('jsonviz-key');
    el.textContent = key;
    return el;
}
