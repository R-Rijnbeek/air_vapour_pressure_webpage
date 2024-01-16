

window.addEventListener('load', function() {

    createDataTable() 

})

function createDataTable() {

    JSON = {
        "columns": [
            { "data" : "DT_RowId", "title" : "Id" },
            { "data" : "supplier", "title" : "supplier" },
            { "data" : "color", "title" : "color" }
        ],
        "data": [
            { "DT_RowId" : "row_3", "supplier" : "small", "color" : "red" },
            { "DT_RowId" : "row_3", "supplier" : "medium", "color" : "blue" },
            { "DT_RowId" : "row_3", "supplier" : "medium", "color" : "blue" },
            { "DT_RowId" : "row_11", "supplier" : "large", "color" : "blue" }
        ]
    }

    const table = new DataTable('#DataTable', {
        data: JSON.data,
        columns: JSON.columns 


    })


}