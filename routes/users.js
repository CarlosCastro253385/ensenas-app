// routes/users.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// Registrar o Iniciar Sesión rápido
router.post('/login', async (req, res) => {
  const { email, username } = req.body;
  try {
    let [users] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    let user = users[0];

    if (!user) {
      const [result] = await db.query(
        'INSERT INTO users (email, username, password) VALUES (?, ?, "123456")',
        [email, username || email.split('@')[0]]
      );
      [users] = await db.query('SELECT * FROM users WHERE id = ?', [result.insertId]);
      user = users[0];
    }

    // Cargar progreso de secciones
    const [progress] = await db.query('SELECT section_key, stars FROM user_progress WHERE user_id = ?', [user.id]);
    const doneObj = {};
    progress.forEach(p => { doneObj[p.section_key] = p.stars; });

    res.json({ user, done: doneObj });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Guardar Victoria / Progreso
router.post('/save-win', async (req, res) => {
  const { userId, levelIdx, sectionIdx, stars, coinsEarned, newStreak, lastDay } = req.body;
  const sectionKey = `${levelIdx}-${sectionIdx}`;

  try {
    // 1. Guardar o actualizar la sección completada
    await db.query(`
      INSERT INTO user_progress (user_id, section_key, stars) 
      VALUES (?, ?, ?) 
      ON DUPLICATE KEY UPDATE stars = GREATEST(stars, VALUES(stars))
    `, [userId, sectionKey, stars]);

    // 2. Actualizar monedas y racha
    await db.query(`
      UPDATE users SET coins = ?, streak = ?, last_played_day = ? WHERE id = ?
    `, [coinsEarned, newStreak, lastDay, userId]);

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;