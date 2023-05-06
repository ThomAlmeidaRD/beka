function updateTasks() {

    var msg = document.querySelector('#msg')
    var ul = document.querySelector('ul')
    var emoji = ['🤙🏼', '⏱', '🔥', '💖']

    for (var i = 0; i < localStorage.length; i++) {

        var task_li = document.createElement('li')
        var task_div = document.createElement('div')
        var task_title = document.createElement('h3')
        var task_button = document.createElement('ion-icon')
        var task_emoji = document.createElement('b')
        var task_key = document.createElement('p')

        task_div.classList.add('task-div')
        task_button.name = 'checkmark'
        task_title.innerText = JSON.parse(localStorage.getItem(i)).title
        task_key.innerText = localStorage.key(i)

        if (JSON.parse(localStorage.getItem(i)).emoji == '1') {
            task_emoji.innerText = emoji[0]
        } else
        if (JSON.parse(localStorage.getItem(i)).emoji == '2') {
            task_emoji.innerText = emoji[1]
        } else if (JSON.parse(localStorage.getItem(i)).emoji == '3') {
            task_emoji.innerText = emoji[2]
        } else {
            task_emoji.innerText = emoji[3]
        }

        if (JSON.parse(localStorage.getItem(i)).visible == false) {
            task_li.style.display = 'none'
        }

        task_li.appendChild(task_div)
        task_div.appendChild(task_emoji)
        task_div.appendChild(task_title)
        task_div.appendChild(task_key)
        task_div.appendChild(task_button)
        ul.appendChild(task_li)

        msg.style.display = 'none'

        task_button.addEventListener('click', function() {

            var taskDIV = this.parentNode
            var taskLI = taskDIV.parentNode
            var KEY = taskDIV.childNodes[2].innerText
            var thisOBJ = localStorage.getItem(KEY)

            var updateOBJ = JSON.parse(thisOBJ)
            updateOBJ.visible = false
            localStorage.setItem(KEY, JSON.stringify(updateOBJ));

            console.log(thisOBJ)
            ul.removeChild(taskLI)


            if (ul.childNodes.length == 1) {
                msg.style.display = 'flex'
            }

        })

    }

}