function Header({ title, description, usuario, botonAnonimo }) {
    return (
        <header className="header">
          <h1 className="header-title">{title}</h1>
          <p>{usuario}</p>
          <button className="task-button" onClick={botonAnonimo}>Anonimato</button>
          <p className="header-description">{description}</p>
        </header>
    )
}

export default Header