function TaskSummary( {summary, pending }) {
    return (
        <section className="card">
            <h2 className="section-title">{summary}</h2>
            <p>{pending}</p>
        </section>
    )
}

export default TaskSummary