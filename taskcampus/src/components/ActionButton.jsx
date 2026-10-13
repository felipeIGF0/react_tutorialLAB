function AcctionButton({ onReview }) {
    return (
        <section>
            <h2 className="section-title">Acciones</h2>
            <button onClick={onReview}>
                Revisar tareas
            </button>
        </section>
    )
}

export default AcctionButton