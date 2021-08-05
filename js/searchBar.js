export const setSearchFocus=()=>{
  document.getElementById("search").focus();
};
//make the x button show up when typoing
export const showClearTextButton=()=>{
  const search=document.getElementById("search");
  const clear=document.getElementById("clear");
  if(search.value.length){
    clear.classList.remove("none");
    clear.classList.add("flex");

  }else{
    clear.classList.add("none");

    clear.classList.remove("flex");
  
  }
}
export const clearSearchText=(event)=>{
  event.preventDefault();
  document.getElementById("search").value="";
  const clear=document.getElementById("clear");
  clear.classList.add("none");
  clear.classList.remove("flex");
  setSearchFocus();
};
export const clearPushListener=(event)=>{
  if(event.key==="Enter"|| event.key===" "){
    event.preventDefault();
    document.getElementById("clear").click();
  }
}