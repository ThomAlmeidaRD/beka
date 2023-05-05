
function Task(props) {

     return (
        <>
        <li id="li-100">
            <div className="message" id="msg">
                <h3>{props.name}</h3>
            </div>
        </li>
        </>
    )
}

export default Task
