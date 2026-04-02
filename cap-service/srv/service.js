const cds = require("@sap/cds");
const mysql = require("mysql2/promise");

const DB_CONFIG = {
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Altamura080!",
  database: "fiori",
  waitForConnections: true,
  connectionLimit: 10,
  timezone: "+00:00",
};

let pool;

function getPool() {
  if (!pool) pool = mysql.createPool(DB_CONFIG);
  return pool;
}

function applyPaging(sql, query) {
  const { top, skip } = query.SELECT || {};
  if (top != null) sql += ` LIMIT ${Number(top)}`;
  if (skip != null) sql += ` OFFSET ${Number(skip)}`;
  return sql;
}

module.exports = class FioriService extends cds.ApplicationService {
  async init() {
    // ── Genders ──────────────────────────────────────────────────────────
    this.on("READ", "Genders", async (req) => {
      const db = getPool();
      let sql = "SELECT * FROM genders ORDER BY id ASC";
      sql = applyPaging(sql, req.query);
      const [rows] = await db.execute(sql);
      return rows;
    });

    // ── Roles ─────────────────────────────────────────────────────────────
    this.on("READ", "Roles", async (req) => {
      const db = getPool();
      let sql = "SELECT * FROM roles ORDER BY id ASC";
      sql = applyPaging(sql, req.query);
      const [rows] = await db.execute(sql);
      return rows;
    });

    // ── Menu ──────────────────────────────────────────────────────────────
    this.on("READ", "Menu", async (req) => {
      const db = getPool();
      let sql = "SELECT * FROM menu ORDER BY pos ASC";
      sql = applyPaging(sql, req.query);
      const [rows] = await db.execute(sql);
      return rows;
    });

    // ── UsersView (with role + gender expand) ────────────────────────────────
    this.on("READ", "UsersView", async (req) => {
      const db = getPool();
      let sql = "SELECT * FROM users_view ORDER BY id ASC";
      sql = applyPaging(sql, req.query);
      const [rows] = await db.execute(sql);
      return rows;
    });

    await super.init();
  }
};
