function TaskSummary( {summary, pending }) {
    return (
        <section>
            <h2>{summary}</h2>
            <p>{pending}</p>
        </section>
    )
}

export default TaskSummary