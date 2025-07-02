// src/lib/db.ts
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

export async function openDB() {
  return open({
    filename: './cloudmonitor.db', // make sure this file is in project root
    driver: sqlite3.Database,
  });
}
