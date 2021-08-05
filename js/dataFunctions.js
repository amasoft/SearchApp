export const getSearchTerm=()=>{
  const rowsearchterm=document.getElementById("search").value.trim();
  const regex=/[ ]{2,}/gi;//will look for more than one space in the search bar
  const searchTerm=rowsearchterm.replace(regex,' '); //finds tow spaces and replaces with one
   return searchTerm;

}

export const retriveSearchResult=async(searchTerm)=>{
  const wikiSearchString=getWikiSearchString(searchTerm);
const wikiSearchresults=await requestData(wikiSearchString);
let resultArray=[];
if(wikiSearchresults.hasOwnProperty("query")){
  resultArray=processWikiResult(wikiSearchresults.query.pages);
}
return resultArray;
}
const getWikiSearchString=(searchTearm)=>{
  const maxChars=getMaxChars()//tels wiki maximum charachert to resceive
  // const rawSearchString="https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=Dave&gsrlimit=20&prop=pageimages|extracts&exchars=130&exintro&explaintext&exlimit=max&format=json&origin=*';
  const rawSearchString=`https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=${searchTearm}&gsrlimit=20&prop=pageimages|extracts&exchars=${maxChars}&exintro&explaintext&exlimit=max&format=json&origin=*`;
 const searchString=encodeURI(rawSearchString);//for replacing space with smthin like 20%
 return searchString;
}
const getMaxChars=()=>{
  const width=window.innerWidth||document.body.clientWidth;
  let maxChars;
  if(width<414)maxChars=65;
  if(width>=414 && width<1400)maxChars=100;
  if(width>=1400)maxChars=130;
  return maxChars;

} 
const requestData=async (searchString)=>{
  try{
    const response =await fetch(searchString);
    const data=await response.json();
    return data;
  }catch(err){
    console.error(err);
  }
}

const processWikiResult=(results)=>{
  const resultArray=[];
  //loops start here
  Object.keys(results).forEach(key=>{
    const id=key;
    const title=results[key].title;
    const text=results[key].extract;
    const img=results[key].hasOwnProperty("thumbnail")? results[key].thumbnail.source:null;
     const item={
       id:id,
       title:title,
       img:img,
       text:text
     };
     resultArray.push(item);
  });
  //loops stops here.
return resultArray;
}
