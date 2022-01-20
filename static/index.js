var table_length = 0
var selected_item = ""

function submitForm(){
    formData = getFormData();
    if (formData ==  "") {
        alert("Item name is a required field");
    } else {
        if (selected_item == "") {
            addToTable(formData);
        } else {
            updateItem(formData);
        }
    }   
    clearForm();
}

function getFormData() {
    item_name = document.getElementById("new_item").value;
    return item_name
}

function clearForm() {
    document.getElementById("new_item").value = "";
}

function deleteItem(_this) {
    if(confirm("Delete Record: Are you sure?")) {
        _item = _this.parentElement.parentElement;
        document.getElementById("inventory_list").deleteRow(_item.rowIndex);
        table_length -= 1;
    }
}

function editItem(_edit_button) {
    selected_item = _edit_button.parentElement.parentElement;
    document.getElementById("new_item").value = selected_item.cells[0].innerHTML;
}

function updateItem(form_data) {
    selected_item.cells[0].innerHTML = form_data;
    selected_item = "";
}

function addToTable(_item) {
    var _table = document.getElementById("inventory_list").getElementsByTagName('tbody')[0];
    var _row = _table.insertRow(table_length);
    _cell = _row.insertCell(0);
    _cell.innerHTML = _item;
    _cell_buttons = _row.insertCell(1);
    _cell_buttons.innerHTML = ` <input type="button" value="Edit" onclick="editItem(this)"></input>
                                <input type="button" value="Delete" onclick="deleteItem(this)"></input>`;
    table_length += 1;
}

function exportCSV() {
    if (table_length == 0) {
        window.print("Table appears to be blank.");
        return
    }
    if(confirm("Export CSV: Are you sure?")) {
        let csvContent = "data:text/csv;charset=utf-8,";
        for (let step = 1; step < table_length + 1; step++) {
            console.log(document.getElementById("inventory_list").getElementsByTagName('tr')[step].getElementsByTagName('td')[0].innerHTML);
            console.log("|");
            csvContent += document.getElementById("inventory_list").getElementsByTagName('tr')[step].getElementsByTagName('td')[0].innerHTML + "\r\n";
        }
        var encodedUri = encodeURI(csvContent);
        window.open(encodedUri);
    }
}