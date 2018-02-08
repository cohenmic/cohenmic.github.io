var myTable = document.createElement('table');
myTable.appendChild(makeHeader("Header"));
for (var i=1;i<4;i++)
  myTable.appendChild(makeBodyRow(i));

//add to body, then start styling
document.body.appendChild(myTable);

normalBorders("td");
styleHeader("th");

var commands = ["up","down","left","right","mark cell"]
for (var direction in commands)
  document.body.appendChild(makeButton(commands[direction]));

//initiate by outlining top left cell, and saving in global var to keep track of selected element
var selected = document.body.getElementsByTagName('thead')[0].nextElementSibling.firstChild;
select(selected);

/* function definitions */
function normalBorders(tagIn){
	var nodes = document.getElementsByTagName(tagIn);
	for(var i=0;i<nodes.length;i++){
    nodes[i].style.borderWidth = "1px";
    nodes[i].style.borderColor = "black";
    nodes[i].style.borderStyle = "solid";
  }
}

function styleHeader(tagIn){
  normalBorders(tagIn);
  var nodes = document.getElementsByTagName(tagIn);
  for(var i=0;i<nodes.length;i++)
    nodes[i].style.backgroundColor = "lime";
}
    

function makeBodyRow(rowNum){
  var newRow = document.createElement('tr');
  for(var col=1;col<5;col++){
    var cell = document.createElement('td');
    cell.textContent = col+","+rowNum;
    newRow.appendChild(cell);
  }
  return newRow;
}
function makeHeader(label){
  var head = document.createElement('thead');
  var newRow = document.createElement('tr');
  for(var i=1;i<5;i++){
    var cell = document.createElement('th');
    cell.textContent = label+" "+i;
    newRow.appendChild(cell);
  }
  head.appendChild(newRow); 
  return head;
}

function makeButton(labelIn){
  var newButton = document.createElement('button');
  var label = labelIn.toUpperCase();
  newButton.textContent = label;
  switch(label){
    case "LEFT":
      newButton.addEventListener("click", moveLeft);
      break;
    case "RIGHT":
      newButton.addEventListener("click", moveRight);
      break;
    case "UP":
      newButton.addEventListener("click", moveUp);
      break;
    case "DOWN":
      newButton.addEventListener("click", moveDown);
      break;
    case "MARK CELL":
      newButton.addEventListener("click", markCell);
      break;
  }
  return newButton;
}

function moveLeft(){
  if(selected.previousElementSibling){
    unselect(selected);
    selected = selected.previousElementSibling;
    select(selected);
  }
}
function moveRight(){
  if(selected.nextElementSibling){
    unselect(selected);
    selected = selected.nextElementSibling;
    select(selected);
  }
}

function moveUp(){
  var parentRow = selected.parentNode;
  var newRow = parentRow.previousElementSibling;
  if ((newRow.tagName).toLowerCase() != "thead"){
    var colNum = getColumn(selected);
    unselect(selected);
    selected = newRow.children[colNum];
    select(selected);
  }
}

function moveDown(){
  var parentRow = selected.parentNode;
  var newRow = parentRow.nextElementSibling;
  if (newRow){
    var colNum = getColumn(selected);
    unselect(selected);
    selected = newRow.children[colNum];
    select(selected);
  }
}

function getColumn(cellIn){
//have first column at index 0
  var column = 0;
  while(cellIn.previousElementSibling){
    cellIn = cellIn.previousElementSibling;
    column += 1; 
  }
  return column;
}

function unselect(boxIn){
  boxIn.style.borderWidth = "1px";
  boxIn.style.borderColor = "black";
  boxIn.style.borderStyle = "solid";
}

function select(boxIn){
  boxIn.style.borderWidth = "3px";
}

function markCell(){
  selected.style.backgroundColor = "yellow";
}
