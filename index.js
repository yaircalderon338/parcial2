const express = require('express');
const cors = require('cors');
const app = express();
const pool = require('./db'); // Asegúrate que ./db exporta pool correctamente

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: '10mb' }));

// ================== RESTAURANTE ==================
app.get('/restaurantes', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM restaurante');
    res.json(result.rows);
  } catch (err) {
    res.status(500).send(`Error: ${err.message}`);
  }
});

app.post('/restaurantes', async (req, res) => {
  const { nombre, ciudad, direccion, fecha_apertura } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO restaurante (nombre, ciudad, direccion, fecha_apertura) VALUES ($1, $2, $3, $4) RETURNING *',
      [nombre, ciudad, direccion, fecha_apertura]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).send(`Error: ${err.message}`);
  }
});

app.put('/restaurantes/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre, ciudad, direccion, fecha_apertura } = req.body;
  try {
    const result = await pool.query(
      'UPDATE restaurante SET nombre = $1, ciudad = $2, direccion = $3, fecha_apertura = $4 WHERE id_rest = $5 RETURNING *',
      [nombre, ciudad, direccion, fecha_apertura, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).send(`Error: ${err.message}`);
  }
});

app.delete('/restaurantes/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM restaurante WHERE id_rest = $1', [req.params.id]);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).send(`Error: ${err.message}`);
  }
});

// ================== EMPLEADOS ==================
app.get('/empleados', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM empleado');
    res.json(result.rows);
  } catch (err) {
    res.status(500).send(`Error: ${err.message}`);
  }
});

app.get('/empleados/:id_rest', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM empleado WHERE id_rest = $1', [req.params.id_rest]);
    res.json(result.rows);
  } catch (err) {
    res.status(500).send(`Error: ${err.message}`);
  }
});

app.post('/empleados', async (req, res) => {
  const { nombre, rol, id_rest } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO empleado (nombre, rol, id_rest) VALUES ($1, $2, $3) RETURNING *',
      [nombre, rol, id_rest]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).send(`Error: ${err.message}`);
  }
});

app.put('/empleados/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre, rol, id_rest } = req.body;
  try {
    const result = await pool.query(
      'UPDATE empleado SET nombre = $1, rol = $2, id_rest = $3 WHERE id_empleado = $4 RETURNING *',
      [nombre, rol, id_rest, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).send(`Error: ${err.message}`);
  }
});

app.delete('/empleados/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM empleado WHERE id_empleado = $1', [req.params.id]);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).send(`Error: ${err.message}`);
  }
});

// ================== PRODUCTOS ==================
app.get('/productos', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM producto');
    res.json(result.rows);
  } catch (err) {
    res.status(500).send(`Error: ${err.message}`);
  }
});

app.post('/productos', async (req, res) => {
  const { nombre, precio } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO producto (nombre, precio) VALUES ($1, $2) RETURNING *',
      [nombre, precio]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).send(`Error: ${err.message}`);
  }
});

app.put('/productos/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre, precio } = req.body;
  try {
    const result = await pool.query(
      'UPDATE producto SET nombre = $1, precio = $2 WHERE id_prod = $3 RETURNING *',
      [nombre, precio, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).send(`Error: ${err.message}`);
  }
});

app.delete('/productos/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM producto WHERE id_prod = $1', [req.params.id]);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).send(`Error: ${err.message}`);
  }
});

// ================== PEDIDOS ==================
app.get('/pedidos', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM pedido');
    res.json(result.rows);
  } catch (err) {
    res.status(500).send(`Error: ${err.message}`);
  }
});

app.get('/pedidos/:id_rest', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM pedido WHERE id_rest = $1', [req.params.id_rest]);
    res.json(result.rows);
  } catch (err) {
    res.status(500).send(`Error: ${err.message}`);
  }
});

app.post('/pedidos', async (req, res) => {
  const { fecha, id_rest, total } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO pedido (fecha, id_rest, total) VALUES ($1, $2, $3) RETURNING *',
      [fecha, id_rest, total]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).send(`Error: ${err.message}`);
  }
});

app.put('/pedidos/:id', async (req, res) => {
  const { id } = req.params;
  const { fecha, id_rest, total } = req.body;
  try {
    const result = await pool.query(
      'UPDATE pedido SET fecha = $1, id_rest = $2, total = $3 WHERE id_pedido = $4 RETURNING *',
      [fecha, id_rest, total, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).send(`Error: ${err.message}`);
  }
});

app.delete('/pedidos/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM pedido WHERE id_pedido = $1', [req.params.id]);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).send(`Error: ${err.message}`);
  }
});

// ================== DETALLE PEDIDO ==================
app.get('/detallepedido', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM detallepedido');
    res.json(result.rows);
  } catch (err) {
    res.status(500).send(`Error: ${err.message}`);
  }
});

app.get('/detallepedido/:id_pedido', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM detallepedido WHERE id_pedido = $1', [req.params.id_pedido]);
    res.json(result.rows);
  } catch (err) {
    res.status(500).send(`Error: ${err.message}`);
  }
});

app.post('/detallepedido', async (req, res) => {
  const { id_pedido, id_prod, cantidad, subtotal } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO detallepedido (id_pedido, id_prod, cantidad, subtotal) VALUES ($1, $2, $3, $4) RETURNING *',
      [id_pedido, id_prod, cantidad, subtotal]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).send(`Error: ${err.message}`);
  }
});

app.put('/detallepedido/:id', async (req, res) => {
  const { id } = req.params;
  const { id_pedido, id_prod, cantidad, subtotal } = req.body;
  try {
    const result = await pool.query(
      'UPDATE detallepedido SET id_pedido = $1, id_prod = $2, cantidad = $3, subtotal = $4 WHERE id_detalle = $5 RETURNING *',
      [id_pedido, id_prod, cantidad, subtotal, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).send(`Error: ${err.message}`);
  }
});

app.delete('/detallepedido/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM detallepedido WHERE id_detalle = $1', [req.params.id]);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).send(`Error: ${err.message}`);
  }
});

// ================== INICIAR SERVIDOR ==================
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
