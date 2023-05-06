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

        task_div.classList.add('task-div')
        task_button.name = 'checkmark'
        task_title.innerText = JSON.parse(localStorage.getItem(i)).title

        task_li.appendChild(task_div)
        task_div.appendChild(task_emoji)
        task_div.appendChild(task_title)
        task_div.appendChild(task_button)

        if (JSON.parse(localStorage.getItem(i)).emoji == '1') {
            task_emoji.innerText = emoji[0]
        } else if (JSON.parse(localStorage.getItem(i)).emoji == '2') {
            task_emoji.innerText = emoji[1]
        } else if (JSON.parse(localStorage.getItem(i)).emoji == '3') {
            task_emoji.innerText = emoji[2]
        } else {
            task_emoji.innerText = emoji[3]
        }

        ul.appendChild(task_li)
        msg.style.display = 'none'

        task_button.addEventListener('click', function() {
            ul.removeChild(task_li)

            if (ul.childNodes.length == 1) {
                msg.style.display = 'flex'
            }
        })

    }

}