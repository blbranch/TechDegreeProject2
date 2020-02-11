//global variables for max students per page & student list from HTML file
const pageDisplayLimit = 10;
const studentList = document.getElementsByClassName('student-list')[0].getElementsByTagName('LI')


//Show Page Function //
const showPage = (list, page) => {
   /*determines the starting and ending index for the student list.  
   If students are out of index they are hidden else they are displayed */
   let startIndex = (page * pageDisplayLimit) - pageDisplayLimit;
   let endIndex = page * pageDisplayLimit;
         
   for (let i = 0; i < list.length; i++) {
      let currentStudent = list[i] 
      
     if (i >= startIndex && i < endIndex) {
        currentStudent.style.display = 'inherit';          
   } else {
      currentStudent.style.display = 'none';          
      }
   }
}

//call function on page load and set it to display page 1
showPage(studentList, 1)


//Append Page Links Function
const appendPageLinks = (list) => {
   //determine how many nav links based on passed list length and page display limit
   const pageCount = Math.ceil(list.length / pageDisplayLimit)

   //remove any prior nav links before creating new ones
   let previousPages = document.getElementsByClassName('pagination');
   while(previousPages.length > 0) {
      previousPages[0].parentNode.removeChild(previousPages[0]);
   }
   
   //create div elements and add pagination class
   let div = document.createElement('DIV');
   div.className = 'pagination';
   
   //create ul element
   let page = document.getElementsByClassName('page')[0];
   let ul = document.createElement('UL')

   //create list element and anchor tags equal to pagecount
   for (let i = 0; i < pageCount; i++) {
      let li = document.createElement('LI');
      let anchor = document.createElement('A');
      anchor.textContent = i+1;
      anchor.href = '#';
      
      anchor.classList.add('nav-link')

      //add event listener to each nav link button            
      anchor.addEventListener("click", (e) => {
         e.preventDefault();
         //find active nav link anchor tags
         let activeLinks = document.getElementsByClassName('nav-link active')
         //remove active class from any active nav link anchor tags
         while (activeLinks[0]) {
            activeLinks[0].classList.remove('active')
         }
         
         //set active class to last clicked nav link button
         e.target.className += ' active';
         //call showPage function with list and page number as parameters
         showPage(list, e.target.textContent);                  
      })
      
      //append anchor tags to the list element and the list elements to the ul
      li.appendChild(anchor);
      ul.appendChild(li);
   }
   
   //append the ul to the div element and the finished div to the page
   div.appendChild(ul);
   page.appendChild(div);

   //on page load and after searching set the first nav link to active
   if (document.getElementsByClassName('nav-link').length > 0) {
      let firstNavButton = document.getElementsByClassName('nav-link')[0]
      firstNavButton.className += ' active'
   }   
}

//call at page load with the entire student list from HTML file
appendPageLinks(studentList)

//create search bar function
const addSearchBar = () => {

   //create a div  for search bar and append input and buttons to it

   let div = document.createElement('DIV');
   div.className = 'student-search';

   let input = document.createElement('INPUT');
   input.placeholder = 'Search for students...';
   input.setAttribute('id', 'searchBar');

   let button = document.createElement('BUTTON');
   button.textContent = 'Search';
   button.setAttribute('id', 'searchButton');

   div.appendChild(input);
   div.appendChild(button);
   
   //add input and buttons to page header
   let header = document.getElementsByClassName('page-header cf')[0];
   header.appendChild(div);      
}

//call at page load
addSearchBar();

const searchBar = document.querySelector('#searchBar');
const searchButton = document.querySelector('#searchButton');

/*add keyup event listener that calls the searchinput function 
  with the input string and the student list*/
searchBar.addEventListener('keyup', (e) => {
   searchInput(e.target.value, studentList)
})

/*add click event in case user copies and pastes versus keys in.  
   Event calls the searchinput function with the input string and the student list*/
searchButton.addEventListener('click', (e) => {
   e.preventDefault();
   searchInput(searchBar.value, studentList);
})

/* create a no results found message and set its display to none.  
   Append it to the page element*/
const page = document.getElementsByClassName('page')[0];
const noResults = document.createElement('H3');
noResults.textContent = 'No students were found.  Please try again.';
noResults.style.display = 'none'
page.appendChild(noResults)

/*Search input function*/
function searchInput(input, list) {   

   //clear any prior no matches found message
   noResults.style.display = 'none'

   let matches = [];
   
   for (let i = 0; i < list.length; i++) {
      let currentStudent = list[i];
      let currentStudentName = currentStudent.querySelector('.student-details > h3').textContent;
      /*if there is at least one character in the search field 
        and a student's name includes that character or string then push to matches array. */        
      if (input.length !== 0 && currentStudentName.toLowerCase().includes(input.toLowerCase())) {
         matches.push(currentStudent);         

      //otherwise set the display to none
      } else {
         currentStudent.style.display = 'none';
       }       
   }
   /*if the search field is empty then call show page and append page with the entire student list 
      and show the first page of students */    
   if (input.length === 0) {
      appendPageLinks(studentList);
      showPage(studentList, 1);
   }

   /*if there is at least one match in the matches array then call appendPageLinks 
     and showPage with the matches array.  Display first page*/
   if (matches.length > 0) {
      appendPageLinks(matches)
      showPage(matches, 1)
   }

   /*if there are no matches in the matches array and there is at least one character in the searh field 
     display the no results message and call appendPageLinks with an empty array*/

   if (matches.length === 0 && input.length !== 0) {
      noResults.style.display = 'inherit';         
      
      appendPageLinks([])
   }
}
