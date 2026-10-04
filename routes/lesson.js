// routes/lessons.js
const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/levels', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM signs ORDER BY level_index, section_index');

    const levelsMap = {};
    rows.forEach(s => {
      if (!levelsMap[s.level_index]) {
        levelsMap[s.level_index] = { n: s.level_name, secs: [[], [], [], []] };
      }
      levelsMap[s.level_index].secs[s.section_index].push({
        w: s.word,
        f: s.image_file
      });
    });

    res.json(Object.values(levelsMap));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;