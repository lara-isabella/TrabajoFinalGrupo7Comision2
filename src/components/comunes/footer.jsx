function Footer() {
    console.log("Footer renderizado");
  return (
    <footer style={{ 
      backgroundColor: '#ffffff', 
      padding: '20px 0', 
      textAlign: 'center', 
      borderTop: '1px solid #e7e7e7',
      marginTop: 'auto' 
    }}>
      <p style={{ margin: 0, color: '#000000' }}>
       Sunny Bunny TM. Todos los derechos reservados.
      </p>
    </footer>
  );
}

export default Footer;
