
import './assets/main.css'
import Navbar from "./components/navbar"
import Task from './components/task'
var color_task = ['🤙🏼', '⏱', '🔥', '💖']

import Dexie from "dexie"

var db = new Dexie("MEUDB")

db.version(1).stores({
  tarefas: '++id,title,emoji,visible'
})

var body = document.querySelector('body')

body.onload = function () {

  db.tarefas.toArray().then(function (tarefas) {

    var ul = document.querySelector('ul')

    for (var i = 0; i < tarefas.length; i++) {

      var newItem = document.createElement('li')
      var newItem_Div = document.createElement('div')
      var newItem_Title = document.createElement('h3')
      var newItem_Button = document.createElement('ion-icon')
      var newItem_span = document.createElement('b')
      var newItem_ID = document.createElement('p')

      newItem_Button.name = 'checkmark'
      newItem_span.style.padding = '8px'
      newItem_span.style.borderRadius = '50%'

      newItem_Title.innerText = tarefas[i].title
      newItem_span.innerText = tarefas[i].emoji
      newItem_ID.innerText = tarefas[i].id

      newItem_Div.classList.add('task-div')
      newItem_ID.classList.add('task-id')

      newItem_Div.appendChild(newItem_span)
      newItem_Div.appendChild(newItem_Title)
      newItem_Div.appendChild(newItem_ID)
      newItem_Div.appendChild(newItem_Button)
      newItem.appendChild(newItem_Div)

      ul.appendChild(newItem)

      newItem_Button.addEventListener('click', function () {

        var thisDIV = this.parentNode
        var thisLI = thisDIV.parentNode
        var thisID = thisDIV.childNodes[2].innerText
        var integerID = parseInt(thisID)

        db.tarefas.delete(integerID)
        ul.removeChild(thisLI)

        if (ul.childNodes.length == 1) {
          msg.style.display = 'flex'
        }

      })

      if (ul.childNodes.length > 1) {
        msg.style.display = 'none'
      }

    }

  })


}

function clearDB() {
  db.tarefas.clear().then(() => {
    console.log('Tabela LIMPA')
  })
}

setInterval(function () {
  var count = document.querySelector('#count')
  var ul = document.querySelector('ul')
  count.innerText = ul.childNodes.length - 1
}, 0)

function openForm() {
  var form = document.querySelector('#form-container')
  form.style.display = 'flex'
}

function close() {
  var form = document.querySelector('#form-container')
  form.style.display = 'none'
}

function createTask() {

  var msg = document.querySelector('#msg')
  var form = document.querySelector('#form-container')
  var txtTarefa = document.querySelector('#txtTitle')
  var select_color = document.querySelector('select')
  var ul = document.querySelector('ul')

  form.onsubmit = function (ev) {
    ev.preventDefault()
  }

  var newItem = document.createElement('li')
  var newItem_Div = document.createElement('div')
  var newItem_Title = document.createElement('h3')
  var newItem_Button = document.createElement('ion-icon')
  var newItem_span = document.createElement('b')
  var newItem_ID = document.createElement('p')


  newItem_Div.classList.add('task-div')
  newItem_ID.classList.add('task-id')

  if (select_color.value == 1) {
    newItem_span.innerText = color_task[0]
  } else if (select_color.value == 2) {
    newItem_span.innerText = color_task[1]
  } else if (select_color.value == 3) {
    newItem_span.innerText = color_task[2]
  } else {
    newItem_span.innerText = color_task[3]
  }

  newItem_Button.name = 'checkmark'
  newItem_span.style.padding = '8px'
  newItem_span.style.borderRadius = '50%'

  newItem_Div.appendChild(newItem_span)
  newItem_Div.appendChild(newItem_Title)
  newItem_Div.appendChild(newItem_ID)
  newItem_Div.appendChild(newItem_Button)
  newItem.appendChild(newItem_Div)

  newItem_Title.innerText = txtTarefa.value
  ul.appendChild(newItem)


  // db insert
  db.tarefas.put({
    title: txtTarefa.value,
    emoji: newItem_span.innerText,
    visible: true
  })


  db.tarefas.toArray().then(function (tarefas) {

    console.log(tarefas.length)

    var lastIndex = tarefas.length - 1
    if (tarefas.length <= 1) {
      newItem_ID.innerText = tarefas[0].id
    } else {
      newItem_ID.innerText = tarefas[lastIndex].id
    }

  })


  newItem_Button.addEventListener('click', function () {

    var thisDIV = this.parentNode
    var thisLI = thisDIV.parentNode
    var thisID = thisDIV.childNodes[2].innerText
    var intergerID = parseInt(thisID)

    db.tarefas.delete(intergerID)
    ul.removeChild(thisLI)

    if (ul.childNodes.length == 1) {
      msg.style.display = 'flex'
    }

  })

  msg.style.display = 'none'
  txtTarefa.value = ''
  form.style.display = 'none'


}

function App() {

  return (
    <>

      <Navbar />

      <div className="container">
        <div className="container-content">

          <header>
            <h1>Trabalho & Estudo</h1>
            <p>Anote e conclua tarefas sobre trabalho e faculdade.</p>
          </header>

          <p className='label'>Tarefas <b id='count'>0</b></p>

          <ul className="task-list">
            <Task name="Não há tarefas" />
          </ul>

          <div className='btn-field'>
            <button id='btn-create-task' onClick={openForm}>
              <ion-icon name="add-outline"></ion-icon>
            </button>
          </div>

        </div>
      </div>

      <div className="form-container" id='form-container' >
        <form>
          <i onClick={close}>
            <ion-icon name="close"></ion-icon>
          </i>
          <div>
            <h2>Criar Tarefa</h2>
            <input type="text" id='txtTitle' placeholder="Ex: muitos bjinhos no Thom 🥰" />
            <select name="" id="color-options">
              <option value="1">Simples</option>
              <option value="2">Média</option>
              <option value="3">Urgente</option>
              <option value="4">Pessoal</option>
            </select>
            <input type="submit" value="Criar Tarefa" onClick={createTask} />
          </div>
        </form>
      </div>

    </>
  )
}



export default App
