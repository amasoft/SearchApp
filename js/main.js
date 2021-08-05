
//import funtion 
import{ clearSearchText, 
  setSearchFocus, 
  showClearTextButton, 
clearPushListener
} from "./searchBar.js"
import { deleteSearchresults,buildSearchResult,clearStatsLine, setStatsLine } from "./searchResults.js"
import { getSearchTerm,retriveSearchResult } from "./dataFunctions.js"


//check if page ahve finised loading
document.addEventListener('readystatechange',(event)=>{
  if(event.target.readyState==="complete"){
    initApp();
  } 

});

const initApp=()=>{
  setSearchFocus();
const search=document.getElementById("search");
search.addEventListener("input", showClearTextButton);

  //set focus on text inputs
// TODO 3 listeners clear text
//clear text listener
const clear=document.getElementById("clear");
clear.addEventListener("click",clearSearchText);
clear.addEventListener("keydown",clearPushListener);//to listen to enter key or space bar key gfrom the keyboard

const form =document.getElementById("searchBar");
form.addEventListener("submit",submitTheSearch);
}
//procedural workflow function: it will call aother functions
const submitTheSearch=(event)=>{
  event.preventDefault();
  //delete search result to display new result
deleteSearchresults();
  //process the search
  processTheSearch();
  //set the focus
  setSearchFocus();

}

const processTheSearch= async ()=>{
  //async because we wil be intereating with wiipedia api
   //clear the stats line
   clearStatsLine();
   const searchTerm=getSearchTerm();
if(searchTerm==="")return;
const resultArray=await retriveSearchResult(searchTerm);
if(resultArray.length) buildSearchResult(resultArray);//build search results
//set stats line
setStatsLine(resultArray.length);
  }
