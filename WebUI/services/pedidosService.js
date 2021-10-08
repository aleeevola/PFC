const urlAPI = 'http://localhost:8080'

export async function getPedidosByEstado() {
  
    const res = await fetch('http://localhost:8080/pedidos/estado/PENDIENTE');
    const pedidosPendientes = await res.json();
    const pedidos2 = pedidosPendientes.map((pedido) => {
      const id = pedido.idPedido   
      const fechaEstimadaEntrega = pedido.fechaEstimadaEntrega
  
      return {
        id,
        fechaEstimadaEntrega
      }
    })
    console.log(pedidosPendientes)
    console.log(pedidos2)
    const pedidos = [
      { id: 1, nombre: 'Lucia Arias', fechaLimite: '12 ago 2020 12:30', email: 'ejemplo@gmail.com', paginas: 8, pago: 'Pagado'},
      { id: 2, nombre: 'Germán Perez', fechaLimite: '12 ago 2020 15:00', email: 'ejemplo@gmail.com', paginas: 150, pago: 'Pagado'},
      { id: 3, nombre: 'Cristian Roldán', fechaLimite: '12 ago 2020 15:30', email: 'ejemplo@gmail.com', paginas: 63, pago: 'Adeuda'},
      { id: 4, nombre: 'Lucia Correa', fechaLimite: '12 ago 2020 12:30', email: 'ejemplo@gmail.com', paginas: 15, pago: 'Adeuda'},
      { id: 5, nombre: 'Camila Rodriguez', fechaLimite: '12 ago 2020 12:30', email: 'ejemplo@gmail.com', paginas: 20, pago: 'Pagado'},
      { id: 6, nombre: 'Alejandro Acosta', fechaLimite: '12 ago 2020 17:00', email: 'ejemplo@gmail.com', paginas: 55, pago: 'Adeuda'},
      { id: 7, nombre: 'José Romero', fechaLimite: '12 ago 2020 15:30', email: 'ejemplo@gmail.com', paginas: 640, pago: 'Pagado'},
      { id: 8, nombre: 'Julieta Fernandez', fechaLimite: '12 ago 2020 12:30', email: 'ejemplo@gmail.com', paginas: 5, pago: 'Pagado'},
      { id: 9, nombre: 'Pedro Gomez', fechaLimite: '13 ago 2020 12:30', email: 'ejemplo@gmail.com', paginas: 20, pago: 'Pagado'},
      { id: 10, nombre: 'Cristian Roldán', fechaLimite: '12 ago 2020 15:30', email: 'ejemplo@gmail.com', paginas: 63, pago: 'Adeuda'},
      { id: 11, nombre: 'Lucia Correa', fechaLimite: '12 ago 2020 12:30', email: 'ejemplo@gmail.com', paginas: 15, pago: 'Adeuda'},
      { id: 12, nombre: 'Camila Rodriguez', fechaLimite: '12 ago 2020 12:30', email: 'ejemplo@gmail.com', paginas: 20, pago: 'Pagado'},
      { id: 13, nombre: 'Alejandro Acosta', fechaLimite: '12 ago 2020 17:00', email: 'ejemplo@gmail.com', paginas: 55, pago: 'Adeuda'},
      { id: 14, nombre: 'José Romero', fechaLimite: '12 ago 2020 15:30', email: 'ejemplo@gmail.com', paginas: 640, pago: 'Pagado'},
      { id: 15, nombre: 'Julieta Fernandez', fechaLimite: '12 ago 2020 12:30', email: 'ejemplo@gmail.com', paginas: 5, pago: 'Pagado'},
      { id: 16, nombre: 'Pedro Gomez', fechaLimite: '13 ago 2020 12:30', email: 'ejemplo@gmail.com', paginas: 20, pago: 'Pagado'},
    ];
  
    return{ 
        pedidos2
    } 
  };

