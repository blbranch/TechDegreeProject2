const pageDisplayLimit = 10;
const studentList = document.getElementsByClassName('student-list')[0];

//Show Page Function //
const showPage = (list, page) => {
   let startIndex = (page * pageDisplayLimit) - pageDisplayLimit;
   let endIndex = page * pageDisplayLimit;
   const nodeList = studentList.getElementsByTagName('LI')
      
   for (let i = 0; i < nodeList.length; i++) {
      let currentStudent = list.children[i];
      
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
   const liList = studentList.getElementsByTagName('LI')
   const pageCount = Math.ceil(liList.length / pageDisplayLimit)
   
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
         showPage(studentList, e.target.textContent);
                  
      })
         
      li.appendChild(anchor);
      ul.appendChild(li);
   }
   
   div.appendChild(ul)
   page.appendChild(div)
}

appendPageLinks(studentList)

const addSearchBar = () => {

   let div = document.createElement('DIV');
   div.className = 'student-search';

   let input = document.createElement('INPUT');
   input.placeholder = 'Search for students...';

   let button = document.createElement('BUTTON');
   button.textContent = 'Search';

   div.appendChild(input)
   div.appendChild(button);
   
   let header = document.getElementsByClassName('page-header cf')[0];
   header.appendChild(div)
   
}

addSearchBar()
