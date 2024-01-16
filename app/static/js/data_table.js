

window.addEventListener('load', function() {

    createDataTable() 

})

function createDataTable() {
    const table = new DataTable('#DataTable', {
        "columns": [
            { "data": "name" },
            { "data": "date" },
            { "data": "size" }
        ]


    })


}