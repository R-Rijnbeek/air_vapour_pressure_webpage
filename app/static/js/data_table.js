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


function addingFooterToTable(response) {
    
    collums = response.columns
    
    table = document.getElementById("DataTable")//.innerHTML = "<tfoot><tr><th>Names</th><th>Position</th><th>Office</th><th>Age</th><th>Start date</th</tr></tfoot>"
    
    var foot = document.createElement('tfoot');
    table.appendChild(foot);

    var header = document.createElement('TR');
    foot.appendChild(header);

    collums.forEach((element) => {
        var th = document.createElement('TH');
        th.appendChild(document.createTextNode(element.title));
        header.appendChild(th);
    })

}



function CreateDataTableByResponse(response) {

    addingFooterToTable(response)

    new DataTable('#DataTable', {
        data: response.data,
        columns: response.columns,
        initComplete: function () {
            this.api()
                .columns()
                .every(function () {
                    let column = this;
                    let title = column.footer().textContent;
     
                    // Create input element
                    let input = document.createElement('input');
                    input.placeholder = title;
                    column.footer().replaceChildren(input);
     
                    // Event listener for user input
                    input.addEventListener('keyup', () => {
                        if (column.search() !== this.value) {
                            column.search(input.value).draw();
                        }
                    });
                });
        }
        
    })

    
} 

    


    