 
// MODEL 
class Task { //TASK MODEL
  // CONSTRUCTOR FOR TASK MODEL
  constructor(title, priority,isCompleted) {
      this.title = title; //TASK TITLE
      this.priority = priority; //TASK PRIORITY
      this.isCompleted = false; //TASK COMPLETION STATUS
  }
}

function openPopup() { //OPEN POPUP FUNCTION
  document.getElementById('popup').style.display = 'flex';
}

function closePopup() { //CLOSE POPUP FUNCTION
  document.getElementById('popup').style.display = 'none';
}

// CONTROLLER 

let taskArr = []; //ARRAY TO STORE TASKS

// FUNCTION FOR ADDING TASK 

function addTask() {
  const title = document.getElementById("TaskTitle").value.trim(); //GET THE TASK TITLE FROM INPUT FIELD AND TRIM WHITESPACE
  const priorityInput = document.querySelector('input[name="priority"]:checked'); //GET THE SELECTED PRIORITY RADIO BUTTON
  //VALIDATION FOR EMPTY TITLE OR PRIORITY
  if (title === "" || priorityInput === null) { 
      alert("PLEASE FILL ALL FIELDS"); //CHECK IF TITLE OR PRIORITY IS EMPTY
      return;
  }

  // FOR ADDING NEW TASK TO THE TASK ARRAY
  const newTask = new Task(title, priorityInput.value); //CREATE A NEW TASK OBJECT
  taskArr.push(newTask); //ADD THE NEW TASK TO THE TASK ARRAY
  document.querySelector('.Hero').style.display = 'none';
  displayTask();
  updateDashboard();
  document.getElementById('dashboard-container').style.display = 'flex'; //DISPLAY DASHBOARD AFTER ADDING TASK
  // RESET THE FORM FIELDS
  document.getElementById('TaskTitle').value = '';
  priorityInput.checked = false;
  closePopup();
}

// FUNCTION FOR DISPLAYING TASKS
function displayTask () {
  const list = document.getElementById('taskList'); //TASK LIST ELEMENT
  list.innerHTML = ''; //CLEAR THE LIST BEFORE DISPLAYING NEW TASKS

  taskArr.forEach((task, index) => {
      const template = document.getElementById('task-template'); //TASK TEMPLATE
      const card = template.cloneNode(true); //CLONE THE TEMPLATE
      card.style.display = 'flex';
      // card.classList.add('task-card'); //ADD CLASS TO THE CLONED TEMPLATE

      card.querySelector('.task-title').textContent = task.title; //TASK TITLE DISPLAY
      card.querySelector('.task-priority').textContent = task.priority; //TASK PRIORITY DISPLAY

      // CHECKBOX FUNCTIONALITY
      card.querySelector('.task-status').textContent = task.isCompleted ? 'Completed' : 'Pending';
      const checkbox = card.querySelector('input[type="checkbox"]');
      checkbox.checked = task.isCompleted;
      checkbox.addEventListener('change', () => {
          toggleTaskStatus(index);
      });

      // DELETE BUTTON
      card.querySelector('.delete-btn').addEventListener('click', () => {
          taskArr.splice(index, 1);
          displayTask();
          updateDashboard();
      });
      list.appendChild(card); //APPEND THE CARD TO THE LIST
  })
}
  // CHECKBOX FUNCTIONALITY
function toggleTaskStatus(index) {
  taskArr[index].isCompleted = !taskArr[index].isCompleted;
  displayTask();
  updateDashboard();
}

// DASHBOARD FUNCTION 

function updateDashboard() {
  document.getElementById('dashboard-container').style.display = 'flex';
  const totalTasks = taskArr.length; //TOTAL TASK 
  const completedTasks = taskArr.filter(task => task.isCompleted).length;   //COMPELTE TASK 
  const successRate = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);   //SUCCESS RATE  

  const pendingTasks = taskArr.filter(task=> !task.isCompleted);   //PENDING TASK 
  const pendingHigh = pendingTasks.filter(task => task.priority === 'High').length;   //PENDING HIGH TASK 
  const pendingLow = pendingTasks.filter(task => task.priority === 'Low').length;  //PENDING LOW TASK 
  const pendingMedium = pendingTasks.filter(task => task.priority === 'Medium').length;  //PENDING MEDIUM TASK 

  document.querySelectorAll('.container-innerDiv')[0].querySelector('h1').textContent = totalTasks; //ACCESS DIV1 IN CLASS .container-innerDiv
  document.querySelectorAll('.container-innerDiv')[1].querySelector('h1').textContent = completedTasks; //ACCESS DIV2 IN CLASS .container-innerDiv
  document.querySelectorAll('.container-innerDiv')[2].querySelector('h1').textContent = successRate + '%'; //ACCESS DIV3 IN CLASS .container-innerDiv

  document.querySelector('.high p').textContent = pendingHigh;  //PENDING HIGH TASK DISPLAY
  document.querySelector('.medium p').textContent = pendingMedium;  //PENDING MEDIUM TASK DISPLAY
  document.querySelector('.low p').textContent = pendingLow;  //PENDING LOW TASK DISPLAY
}