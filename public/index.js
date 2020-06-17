

$(document).ready(function(){
    populateEmployeeTable();
    populatePersonalTable();
    $('#employeeTable table tbody').on('click','td button#btnDeleteEmployee',deleteEmployee);
    $('#personalTable table tbody').on('click','td button#btnDeletePersonal',deletePersonal);
});

function populateEmployeeTable(){
    let tableContent = '';
    $.getJSON('/dashboard/api/employees',function(data){
        $.each(data,function(){
            tableContent += '<tr>';
            tableContent += '<td>'+this.Employee_Number+'</td>';
            tableContent += '<td>'+this.idEmployee+'</td>';
            tableContent += '<td>'+this.Last_Name+'</td>';
            tableContent += '<td>'+this.First_Name+'</td>';
            tableContent += '<td>'+this.SSN+'</td>';
            tableContent += '<td>'+this.Pay_Rate+'</td>';
            tableContent += '<td>'+this.PayRates_id+'</td>';
            tableContent += '<td>'+this.Vacation_Days+'</td>';
            tableContent += '<td>'+this.Paid_To_Date+'</td>';
            tableContent += '<td>'+this.Paid_Last_Year+'</td>';
            tableContent += `<td>
            <div class="d-flex justify-content-around">
              <button type="button" id="btnDeleteEmployee" href="`+this.idEmployee+`" class="btn btn-danger">X</button>
              <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#editEmployee`+this.idEmployee+`">
                Edit
            </button>
            </div>
            <div class="modal fade" id="editEmployee`+this.idEmployee+`" tabindex="-1" role="dialog" aria-labelledby="title" aria-hidden="true">
              <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="title">`+this.First_Name+" "+this.Last_Name+`</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                      <form class="form-edit" action="dashboard/api/employees/`+this.idEmployee+`" method="POST">
                      <div class="form-group">
                        <input class="form-control" type="text" name="Employee_Number" placeholder="Employee Number" required="" />
                      </div>
                      <div class="form-group">
                        <input class="form-control" type="text" name="idEmployee" placeholder="ID" value="`+this.idEmployee+`" readonly="" required="" />
                      </div>
                      <div class="form-group">
                        <input class="form-control" type="text" name="Last_Name" placeholder="Last Name" required="" />
                      </div>
                      <div class="form-group">
                        <input class="form-control" type="text" name="First_Name" placeholder="First Name" required="" />
                      </div>
                      <div class="form-group">
                        <input class="form-control" type="text" name="SSN" placeholder="SSN" required="" />
                      </div>
                      <div class="form-group">
                        <input class="form-control" type="text" name="Pay_Rate" placeholder="Pay Rate" required="" />
                      </div>
                      <div class="form-group">
                        <input class="form-control" type="text" name="PayRates_id" placeholder="Pay Rate ID" required="" />
                      </div>
                      <div class="form-group">
                        <input class="form-control" type="text" name="Vacation_Days" placeholder="Vacation days" required="" />
                      </div>
                      <div class="form-group">
                        <input class="form-control" type="text" name="Paid_To_Date" placeholder="Paid to Date" required="" />
                      </div>
                      <div class="form-group">
                        <input class="form-control" type="text" name="Paid_Last_Year" placeholder="Paid last year" required="" />
                      </div>
                      <div class="d-flex justify-content-end">
                        <button class="btn btn-secondary mr-3" type="button" data-dismiss="modal">Close</button>
                        <button class="btn btn-primary" type="submit">Save</button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            </td>`
            tableContent += '</tr>';
        });
        $('#employeeTable table tbody').html(tableContent);
    });
}

function populatePersonalTable(){
  let tableContent = '';
  $.getJSON('/dashboard/api/personal',function(data){
      $.each(data,function(){
          tableContent += '<tr>';
          tableContent += '<td>'+this.Employee_ID+'</td>';
          tableContent += '<td>'+this.First_Name+'</td>';
          tableContent += '<td>'+this.Last_Name+'</td>';
          tableContent += '<td>'+this.Middle_Initial+'</td>';
          tableContent += '<td>'+this.Address+'</td>';
          tableContent += '<td>'+this.City+'</td>';
          tableContent += '<td>'+this.State+'</td>';
          tableContent += '<td>'+this.Email+'</td>';
          tableContent += '<td>'+this.Phone_Number+'</td>';
          tableContent += `<td>
          <div class="d-flex justify-content-around">
            <button type="button" id="btnDeletePersonal" href="`+this.Employee_ID+`" class="btn btn-danger">X</button>
            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#editPersonal`+this.Employee_ID+`">
              Edit
          </button>
          </div>
          <div class="modal fade" id="editPersonal`+this.Employee_ID+`" tabindex="-1" role="dialog" aria-labelledby="title" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="title">`+this.First_Name+" "+this.Last_Name+`</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                    <form class="form-edit" action="dashboard/api/personal/`+this.Employee_ID+`" method="POST">
                    <div class="form-group">
                      <input class="form-control" type="text" id="inputEmployee_ID" value=`+this.Employee_ID+` readonly="" name="Employee_ID" placeholder="Employee ID" required="" />
                    </div>
                    <div class="form-group">
                      <input class="form-control" type="text" id="inputFirst_Name" name="First_Name" placeholder="First_Name" required="" />
                    </div>
                    <div class="form-group">
                      <input class="form-control" type="text" id="inputLast_Name" name="Last_Name" placeholder="Last Name" required="" />
                    </div>
                    <div class="form-group">
                      <input class="form-control" type="text" id="inputMiddle_Initial" name="Middle_Initial" placeholder="Middle_Initial" required="" />
                    </div>
                    <div class="form-group">
                      <input class="form-control" type="text" id="inputAddress" name="Address" placeholder="Address" required="" />
                    </div>
                    <div class="form-group">
                      <input class="form-control" type="text" id="inputCity" name="City" placeholder="City" required="" />
                    </div>
                    <div class="form-group">
                      <input class="form-control" type="text" id="inputState" name="State" placeholder="State" required="" />
                    </div>
                    <div class="form-group">
                      <input class="form-control" type="text" id="inputEmail" name="Email" placeholder="Email" required="" />
                    </div>
                    <div class="form-group">
                      <input class="form-control" type="text" id="inputPhone_Number" name="Phone_Number" placeholder="Phone Number" required="" />
                    </div>
                    <div class="d-flex justify-content-end">
                      <button class="btn btn-secondary mr-3" type="button" data-dismiss="modal">Close</button>
                      <button class="btn btn-primary" type="submit">Save</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          </td>`
          tableContent += '</tr>';
      });
      $('#personalTable table tbody').html(tableContent);
  });
}


function deleteEmployee(){
  event.preventDefault();
  var confirmation = confirm('Are you sure you want to delete this employee?');
  if(confirmation === true){
    $.ajax({
      type:'DELETE',
      url:'dashboard/api/employees/'+$(this).attr('href')
    });
    populateEmployeeTable();
  }
  else{
    return false;
  }
}

function deletePersonal(){
  event.preventDefault();
  var confirmation = confirm('Are you sure you want to delete this employee?');
  if(confirmation === true){
    $.ajax({
      type:'DELETE',
      url:'dashboard/api/personal/'+$(this).attr('href')
    });
    populateEmployeeTable();
  }
  else{
    return false;
  }
}

