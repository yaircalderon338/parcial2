const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres.hfvgpxqpmaosrugcdpqc',
  host: 'aws-0-us-east-1.pooler.supabase.com',
  database: 'postgres',
  password: '1234',
  port: 5432,
});

module.exports = pool;
