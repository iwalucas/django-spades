/*
receives JSON object

returns NODE containing a DIV with a TABLE with that json

recursive call if another JSON object found
*/

function prettyJson(obj) {
    var objLen; // variable placeholder to store the number of records
    var output = document.createElement('div');
    var table = document.createElement('table');
    table.classList.add('pretty');
    // node.appendChild(output);
    try { 
        var thead = document.createElement('thead');
        var row = document.createElement('tr');
        thead.appendChild(row);

        var th = document.createElement('th');
        th.innerHTML='Element';
        th.classList.add('element')
        row.appendChild(th);
        var th = document.createElement('th');
        th.innerHTML='Info';
        th.classList.add('info')
        row.appendChild(th);
        table.appendChild(thead);
       
        for(var key in obj){

            var innerRow = document.createElement('tr');
                var tdEl = document.createElement('td');
                tdEl.innerText = key;
                tdEl.classList.add('keyelement');
                innerRow.appendChild(tdEl);
                var td = document.createElement('td');
                td.classList.add('info');
                innerRow.appendChild(td);
                var ff = obj[key];
                try{
                    ff = JSON.parse(ff);
                }catch(err){
                    ff = obj[key];
                }
                if (typeof(ff) == 'object'){
                    td.appendChild(prettyJson(ff));
                }else{
                    td.classList.add('break');
                    td.innerHTML = ff;
                }
                
                innerRow.appendChild(td); 
                table.appendChild(innerRow);

        };
        output.appendChild($(table)[0]);
 

    } catch (err) {
        output.innerHTML="<h3>Error: "+err+"</h3>";
 
    }
    return output;
};