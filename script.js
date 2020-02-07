const pageDisplayLimit = 10;
const studentList = document.getElementsByClassName('student-list')[0].getElementsByTagName('LI')


//Show Page Function //
const showPage = (list, page) => {
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

showPage(studentList, 1)




//Append Page Links Function
const appendPageLinks = (list) => {
   //const pageCount = Math.ceil(liList.length / pageDisplayLimit)
   const pageCount = Math.ceil(list.length / pageDisplayLimit)

   let previousPages = document.getElementsByClassName('pagination');
   while(previousPages.length > 0) {
      previousPages[0].parentNode.removeChild(previousPages[0]);
   }
   
   let div = document.createElement('DIV');
   div.className = 'pagination';
   
   let page = document.getElementsByClassName('page')[0];
   
   let ul = document.createElement('UL')

   for (let i = 0; i < pageCount; i++) {
      let li = document.createElement('LI');
      let anchor = document.createElement('A');
      anchor.textContent = i+1;
      //adding a nav link class name so function below doesn't clear active state from non nav-link buttons
      anchor.classList.add('nav-link')
            
      anchor.addEventListener("click", (e) => {
         e.preventDefault();
         //find active nav link anchor tags
         let activeLinks = document.getElementsByClassName('nav-link active')
         //remove active class from any active nav link anchor tags
         while (activeLinks[0]) {
            activeLinks[0].classList.remove('active')
         }
         
         //set active class to clicked nav link button
         e.target.className += ' active';
         //call showPage function with student list and clicked link's text content as parameters
         showPage(list, e.target.textContent);
                  
      })
         
      li.appendChild(anchor);
      ul.appendChild(li);
   }
   
   div.appendChild(ul);
   page.appendChild(div);
}

//call at page load
appendPageLinks(studentList)

const addSearchBar = () => {

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
   
   let header = document.getElementsByClassName('page-header cf')[0];
   header.appendChild(div);
      
}

addSearchBar();

const searchBar = document.querySelector('#searchBar');
const searchButton = document.querySelector('#searchButton');

searchBar.addEventListener('keyup', (e) => {
   searchInput(e.target.value, studentList)
})

function searchInput(searchInput, list) {   

   let matches = [];
   
   for (let i = 0; i < list.length; i++) {
      let currentStudent = list[i];
      let currentStudentName = currentStudent.querySelector('.student-details > h3').textContent;
      
      if (searchInput.length !== 0 && currentStudentName.toLowerCase().includes(searchInput.toLowerCase())) {
         currentStudent.style.display = 'inherit';
         matches.push(currentStudent);         

      } else {
         currentStudent.style.display = 'none';
       }       

      }
      
      if (searchInput.length === 0) {
         appendPageLinks(studentList);
         showPage(studentList, 1);
      }

      if (matches.length > 0) {
         appendPageLinks(matches)
         showPage(matches, 1)
      }

      if (matches.length === 0 && searchInput.length !== 0) {
         alert('no matches found')
         //TODO add logic here to create Inner HTML that no students were found.  Have to delete this at the beginning of this function
         appendPageLinks([])
      }
   
}



