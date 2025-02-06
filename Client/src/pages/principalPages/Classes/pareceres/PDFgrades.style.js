const classes = {
    div_Content: {
      display: "flex",
      flexDirection: "column",
      width: "794px",
      height: "1123px",
      margin: "0 auto",
      padding: "20px",
      border: "1px solid black",
      backgroundColor: "white",
      color: "black",
      fontFamily: "Arial, sans-serif",
      fontSize: "16px",
      lineHeight: "1.6",
      boxSizing: "border-box",
    },
  
    table: {
      width: "100%",
      borderCollapse: "collapse",
      marginTop: "15px",
      fontSize: "12px", // Tamanho da fonte ajustado para caber mais conteúdo
    },
  
    th: {
      backgroundColor: "#f0f0f0",
      padding: "10px",
      border: "1px solid black",
      fontWeight: "bold",
      textAlign: "center",
      fontSize: "13px", // Fontes um pouco maiores para títulos
    },
  
    td: {
      padding: "8px",
      border: "1px solid black",
      textAlign: "center",
    },
    box_Theme: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
    },
    formControl: {
        margin: "10px",
        minWidth: 120,
    },
  };
  
  export default classes;
  