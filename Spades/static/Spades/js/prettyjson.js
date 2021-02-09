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
                    if (Array.isArray(obj[key])){
                        td.appendChild(tableFromJson(ff));

                    }else{
                        td.appendChild(prettyJson(ff));
                    }
                }else{
                    td.classList.add('break');
                    td.innerText = ff;
                }
                
                innerRow.appendChild(td); 
                table.appendChild(innerRow);

        };
        output.appendChild($(table)[0]);
 

    } catch (err) {
        output.innerHTML="<h3>Error: "+err+"</h3>";
 
    }
    return output;
}


function tableFromJson(myArray) {
    // the json data. (you can change the values for output.)

    // Extract value from table header. 
    // ('Book ID', 'Book Name', 'Category' and 'Price')
    var col = [];
    for (var i = 0; i < myArray.length; i++) {
        for (var key in myArray[i]) {
            if (col.indexOf(key) === -1) {
                col.push(key);
            }
        }
    }

    // Create a table.
    var table = document.createElement("table");

    // Create table header row using the extracted headers above.
    var tr = table.insertRow(-1);                   // table row.

    for (var i = 0; i < col.length; i++) {
        var th = document.createElement("th");      // table header.
        th.innerHTML = col[i];
        tr.appendChild(th);
    }

    // add json data to the table as rows.
    for (var i = 0; i < myArray.length; i++) {

        tr = table.insertRow(-1);

        for (var j = 0; j < col.length; j++) {
            var tabCell = tr.insertCell(-1);
            cellVal = myArray[i][col[j]];
            if (Array.isArray(cellVal)){
                tabCell.appendChild(tableFromJson(cellVal));
            }else{
            tabCell.innerHTML = cellVal;
            }
        }
    }

    return table;

}