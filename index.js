const express = require('express');
const app = express();
const pool = require('./db');
const PORT = 3000;

app.use(express.json());

// ------------------ RESTAURANTE ------------------
app.get('/api/restaurantes', async (req, res) => {
  const result = await pool.query('SELECT * FROM Restaurante');
  res.json(result.rows);
});

app.post('/api/restaurantes', async (req, res) => {
  const { nombre, ciudad, direccion, fecha_apertura } = req.body;
  const result = await pool.query(
    'INSERT INTO Restaurante (nombre, ciudad, direccion, fecha_apertura) VALUES ($1, $2, $3, $4) RETURNING *',
    [nombre, ciudad, direccion, fecha_apertura]
  );
  res.json(result.rows[0]);
});

app.put('/api/restaurantes/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre, ciudad, direccion, fecha_apertura } = req.body;
  const result = await pool.query(
    'UPDATE Restaurante SET nombre=$1, ciudad=$2, direccion=$3, fecha_apertura=$4 WHERE id_rest=$5 RETURNING *',
    [nombre, ciudad, direccion, fecha_apertura, id]
  );
  res.json(result.rows[0]);
});

app.delete('/api/restaurantes/:id', async (req, res) => {
  await pool.query('DELETE FROM Restaurante WHERE id_rest=$1', [req.params.id]);
  res.sendStatus(204);
});

// ------------------ EMPLEADO ------------------
app.get('/api/empleados', async (req, res) => {
  const result = await pool.query('SELECT * FROM Empleado');
  res.json(result.rows);
});

app.post('/api/empleados', async (req, res) => {
  const { nombre, rol, id_rest } = req.body;
  const result = await pool.query(
    'INSERT INTO Empleado (nombre, rol, id_rest) VALUES ($1, $2, $3) RETURNING *',
    [nombre, rol, id_rest]
  );
  res.json(result.rows[0]);
});

app.put('/api/empleados/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre, rol, id_rest } = req.body;
  const result = await pool.query(
    'UPDATE Empleado SET nombre=$1, rol=$2, id_rest=$3 WHERE id_empleado=$4 RETURNING *',
    [nombre, rol, id_rest, id]
  );
  res.json(result.rows[0]);
});

app.delete('/api/empleados/:id', async (req, res) => {
  await pool.query('DELETE FROM Empleado WHERE id_empleado=$1', [req.params.id]);
  res.sendStatus(204);
});

// ------------------ PRODUCTO ------------------
app.get('/api/productos', async (req, res) => {
  const result = await pool.query('SELECT * FROM Producto');
  res.json(result.rows);
});

app.post('/api/productos', async (req, res) => {
  const { nombre, precio } = req.body;
  const result = await pool.query(
    'INSERT INTO Producto (nombre, precio) VALUES ($1, $2) RETURNING *',
    [nombre, precio]
  );
  res.json(result.rows[0]);
});

app.put('/api/productos/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre, precio } = req.body;
  const result = await pool.query(
    'UPDATE Producto SET nombre=$1, precio=$2 WHERE id_prod=$3 RETURNING *',
    [nombre, precio, id]
  );
  res.json(result.rows[0]);
});

app.delete('/api/productos/:id', async (req, res) => {
  await pool.query('DELETE FROM Producto WHERE id_prod=$1', [req.params.id]);
  res.sendStatus(204);
});

// ------------------ PEDIDO ------------------
app.get('/api/pedidos', async (req, res) => {
  const result = await pool.query('SELECT * FROM Pedido');
  res.json(result.rows);
});

app.post('/api/pedidos', async (req, res) => {
  const { fecha, id_rest, total } = req.body;
  const result = await pool.query(
    'INSERT INTO Pedido (fecha, id_rest, total) VALUES ($1, $2, $3) RETURNING *',
    [fecha, id_rest, total]
  );
  res.json(result.rows[0]);
});

app.put('/api/pedidos/:id', async (req, res) => {
  const { id } = req.params;
  const { fecha, id_rest, total } = req.body;
  const result = await pool.query(
    'UPDATE Pedido SET fecha=$1, id_rest=$2, total=$3 WHERE id_pedido=$4 RETURNING *',
    [fecha, id_rest, total, id]
  );
  res.json(result.rows[0]);
});

app.delete('/api/pedidos/:id', async (req, res) => {
  await pool.query('DELETE FROM Pedido WHERE id_pedido=$1', [req.params.id]);
  res.sendStatus(204);
});

// ------------------ DETALLE PEDIDO ------------------
app.get('/api/detalles', async (req, res) => {
  const result = await pool.query('SELECT * FROM DetallePedido');
  res.json(result.rows);
});

app.post('/api/detalles', async (req, res) => {
  const { id_pedido, id_prod, cantidad, subtotal } = req.body;
  const result = await pool.query(
    'INSERT INTO DetallePedido (id_pedido, id_prod, cantidad, subtotal) VALUES ($1, $2, $3, $4) RETURNING *',
    [id_pedido, id_prod, cantidad, subtotal]
  );
  res.json(result.rows[0]);
});

app.put('/api/detalles/:id', async (req, res) => {
  const { id } = req.params;
  const { id_pedido, id_prod, cantidad, subtotal } = req.body;
  const result = await pool.query(
    'UPDATE DetallePedido SET id_pedido=$1, id_prod=$2, cantidad=$3, subtotal=$4 WHERE id_detalle=$5 RETURNING *',
    [id_pedido, id_prod, cantidad, subtotal, id]
  );
  res.json(result.rows[0]);
});

app.delete('/api/detalles/:id', async (req, res) => {
  await pool.query('DELETE FROM DetallePedido WHERE id_detalle=$1', [req.params.id]);
  res.sendStatus(204);
});

// ------------------ INICIAR SERVIDOR ------------------
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
