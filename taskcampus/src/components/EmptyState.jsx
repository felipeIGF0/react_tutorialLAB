const EmptyState = ({ mensaje, icono }) => {
    return(
      <div style={{ textAlign: "center", padding: "24px 10px", color: "#64748b" }}>
        <div style={{ fontSize: "2.5rem", marginBottom: "8px" }}>
            {icono}
        </div>
        <p style={{ margin: 0, fontSize: "1rem", fontWeight: 500 }}>{mensaje}</p>
      </div>
    );
};

export default EmptyState;