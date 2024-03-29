document.getElementById('IssueInputForm').addEventListener('submit',saveIssue);

function saveIssue(e){
    let issueDesc = document.getElementById('IssueDescriptionInput').value;
    let issueSeverity = document.getElementById("IssueSeverityInput").value;
    let issueAssignedTo = document.getElementById("IssueAssignedToInput").value;
    let issueId = chance.guid();
    let issueStatus = 'Open';

    let issue = {
        id: issueId,
        description:issueDesc,
        severity: issueSeverity,
        assignedTo: issueAssignedTo,
        status:issueStatus
    }

    if(localStorage.getItem('issues')==null){
        let issues = [];
     issues.push(issue);
     localStorage.setItem('issues',JSON.stringify(issues));
    }
    else{
        let issues = JSON.parse(localStorage.getItem('issues'));
        issues.push(issue);
        localStorage.setItem('issues',JSON.stringify(issues));
    }
    document.getElementById('IssueInputForm').reset();
    fetchIssues();
    e.preventDefault();
}

function setStatusClosed(id) {
    let issues = JSON.parse(localStorage.getItem('issues'));
  
    for (let i = 0; i < issues.length; i++) {
      if (issues[i].id == id) {
        issues[i].status = 'Closed';
      }
    }
  
    localStorage.setItem('issues', JSON.stringify(issues));
  
    fetchIssues();
  }
  
  function deleteIssue(id) {
    let issues = JSON.parse(localStorage.getItem('issues'));
  
    for (let i = 0; i < issues.length; i++) {
      if (issues[i].id == id) {
        issues.splice(i, 1);
      }
    }
  
    localStorage.setItem('issues', JSON.stringify(issues));
  
    fetchIssues();
  }
  
function fetchIssues(){
    let issues = JSON.parse(localStorage.getItem('issues'));
     let listI = document.getElementById('IssueList');

    IssueList.innerHTML = '';

     for (let i = 0; i< issues.length; i++) {
         let id = issues[i].id;
         let desc = issues[i].description;
         let severity = issues[i].severity;
         let assignedTo = issues[i].assignedTo;
         let status = issues[i].status;
         
         IssueList.innerHTML += '<div class = "well">'+
                                 ' <h6>Issue ID:'+id+ '</h6>'+
                                 '<p><span class ="label label-info">' +status+ '</span></p>'+
                                 '<h3>' +desc+ '</h3>'+
                                 '<p><span class="glyphicon glyphicon-time"></span> ' +severity+ '</p>'+
                                 '<p><span class="glyphicon glyphicon-user"></span> ' +assignedTo+ '</p>'+    
                                 '<a href="#" onclick="setStatusClosed(\''+id+'\')" class="btn btn-warning">Close</a> '+
                                 '<a href="#" onclick="deleteIssue(\''+id+'\')" class="btn btn-danger">Delete</a>'+
                                  '</div>';
     }
}