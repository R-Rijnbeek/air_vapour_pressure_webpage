

window.addEventListener('load', function() {

    createDataTableRequest() 

})

function createDataTableRequest() {

    $.ajax(
        {
        url:"/post_datatable_request",
        type:"POST",
        data: {},
        success: function(response){
            console.log("INFO: Succesfull calculation" + JSON.stringify(response))
            CreateDataTableByResponse(response)
        },
        error: function(error){
            console.log("ERROR: Unespected error => " + error.status)
        },
    });
}

    


function CreateDataTableByResponse(response) {
    const table = new DataTable('#DataTable', {
        data: response.data,
        columns: response.columns 
    })

}
    