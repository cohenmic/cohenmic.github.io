document.addEventListener('DOMContentLoaded', bindButtons);

function bindButtons(){
  var buttonDrops = document.querySelectorAll("li.dropdown>a");
  for (var i=0;i<buttonDrops.length;i++)
    buttonDrops[i].addEventListener("click", toggleDropdown);

  //make dropdowns collapse when clicking away from navbar
  var topNav = document.getElementById('topNav');
  //topNav.addEventListener('click', function(e){
  document.body.addEventListener('click', function(e){
    if (!isInside(e.target, topNav))
      clearDropdowns();
  });
}

function toggleDropdown(e){
  //save current status in a variable, then hide em all, then show current, or do nothing
  
	console.log("should be showing list");
  var activeElm;
  console.log(e.target.tagName);
  if (e.target.tagName == "A")
    activeElm = e.target.parentElement;
  else
    activeElm = e.target;

  var currentExpanded;
  if (activeElm.querySelector("ul.dropdownContent").getAttribute('data-expanded') == "true")
    currentExpanded = true;
  else
    currentExpanded = false;

  var children = activeElm.parentElement.querySelectorAll('li.dropdown > ul.dropdownContent'); //target is the li, then parent is the ul (horizontal)
  for (var i=0;i<children.length;i++){
      children[i].setAttribute("data-expanded","false");
      children[i].style.display = "none";
  }
  //now deal with the current one
  if(currentExpanded){
    activeElm.querySelector("ul.dropdownContent").style.display = "none";
    activeElm.querySelector("ul.dropdownContent").setAttribute("data-expanded","false");
  }
  else{
    activeElm.querySelector("ul.dropdownContent").style.display = "block";
    activeElm.querySelector("ul.dropdownContent").setAttribute("data-expanded","true");
  }
  
/*  if (e.target.querySelector("ul.dropdownContent").getAttribute('data-expanded') == "true")
    currentExpanded = true;
  else
    currentExpanded = false;

  var children = e.target.parentElement.querySelectorAll('li.dropdown > ul.dropdownContent'); //target is the li, then parent is the ul (horizontal)
  for (var i=0;i<children.length;i++){
      children[i].setAttribute("data-expanded","false");
      children[i].style.display = "none";
  }
  //now deal with the current one
  if(currentExpanded){
    e.target.querySelector("ul.dropdownContent").style.display = "none";
    e.target.querySelector("ul.dropdownContent").setAttribute("data-expanded","false");
  }
  else{
    e.target.querySelector("ul.dropdownContent").style.display = "block";
    e.target.querySelector("ul.dropdownContent").setAttribute("data-expanded","true");
  }
*/
}
function clearDropdowns(){
  //save current status in a variable, then hide em all, then show current, or do nothing
  
	console.log("clearing dropdowns");
  var dropdowns = document.querySelectorAll("ul.dropdownContent");
  for (var i=0;i<dropdowns.length;i++){
    dropdowns[i].style.display = "none";
    dropdowns[i].setAttribute("data-expanded","false");
  }
}
/*see if node is inside target.
* this function taken from Eloquent Javascript, page 243 */
function isInside(node,target){
  for(; node!=null;node=node.parentNode)
    if(node==target)
      return true;
  //return false;
}

