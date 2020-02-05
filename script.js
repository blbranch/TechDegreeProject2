
const pageDisplayLimit = 10;
const studentList = document.getElementsByClassName('student-list')[0];

//Show Page Function //
const showPage = (list, page) => {
   let startIndex = (page * pageDisplayLimit) - pageDisplayLimit;
   let endIndex = page * pageDisplayLimit;
   const nodeList = studentList.getElementsByTagName('LI')
      
   for (let i = 0; i < nodeList.length; i++) {
      let currentStudent = list.children[i];
      
     if (i >= startIndex && i <= endIndex) {
        currentStudent.style.display = 'inherit';          
   } else {
      currentStudent.style.display = 'none';          
      }
   }
}

showPage(studentList, 1)

/*** 
   Create the `appendPageLinks function` to generate, append, and add 
   functionality to the pagination buttons.
***/
const appendPageLinks = (list) => {
   const liList = studentList.getElementsByTagName('LI')
   const pageCount = Math.ceil(liList.length / pageDisplayLimit)
   
   let div = document.createElement('DIV');
   div.className = 'pagination';
   
   let page = document.getElementsByClassName('page')[0];
   
   let ul = document.createElement('UL')
   for (let i = 0; i < pageCount; i++) {
      let li = document.createElement('LI');
      //li.textContent = i+1;
      let anchor = document.createElement('A');
      anchor.textContent = i+1;
      li.appendChild(anchor);
      ul.appendChild(li);
   }
   
   div.appendChild(ul)
   page.appendChild(div)
   console.log(page)
}

appendPageLinks(studentList)
