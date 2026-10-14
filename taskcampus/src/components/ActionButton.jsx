function reviewTasks() {
    alert('Tienes 3 tareas pendientes, por favor revisar')
}

function AcctionButton({ onReview }) {
    return (
        <section>
            <h2 className="section-title">Acciones</h2>
            <button className="task-button" onClick={reviewTasks}>
                Revisar tareas
            </button>
        </section>
    )
}

export default AcctionButton