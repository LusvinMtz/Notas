"use client";

import styles from "./page.module.css";
import { useMemo, useState } from "react";

export default function Home() {
  const [cantidad, setCantidad] = useState<number>(0);
  const [calificaciones, setCalificaciones] = useState<(number | "")[]>([]);

  const sanitizeInput = (raw: string): number | "" => {
    const digits = raw.replace(/\D/g, "");
    if (!digits) return "";
    if (digits === "100") return 100;
    const d2 = digits.slice(0, 2);
    const n = Number(d2);
    if (Number.isNaN(n)) return "";
    return Math.min(99, Math.max(0, n));
  };

  const handleCantidadChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const n = Math.max(0, Number(e.target.value));
    setCantidad(n);
    setCalificaciones(Array.from({ length: n }, () => ""));
  };

  const handleNotaChange = (i: number, value: string) => {
    const v = sanitizeInput(value);
    setCalificaciones((prev) => {
      const next = [...prev];
      next[i] = v;
      return next;
    });
  };

  const notasValidas = useMemo(() => {
    const nums = calificaciones.filter((n) => typeof n === "number") as number[];
    const todasLlenas = calificaciones.length > 0 && calificaciones.every((n) => n !== "");
    const enRango = nums.every((n) => n >= 0 && n <= 100);
    return { nums, todasLlenas, enRango };
  }, [calificaciones]);

  const reporte = useMemo(() => {
    if (!notasValidas.todasLlenas || !notasValidas.enRango) return null;
    const nums = notasValidas.nums;
    const suma = nums.reduce((acc, n) => acc + n, 0);
    const promedio = nums.length ? suma / nums.length : 0;
    const max = Math.max(...nums);
    const min = Math.min(...nums);
    const aprobados = nums.filter((n) => n >= 61).length;
    const reprobados = nums.length - aprobados;
    return { promedio, max, min, aprobados, reprobados, total: nums.length };
  }, [notasValidas]);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Registro de Calificaciones</h1>
        <p>Ingrese la cantidad de estudiantes y sus calificaciones (0 a 100).</p>

        <label className={styles.label}>
          Cantidad de estudiantes:
          <input
            type="number"
            min={0}
            value={cantidad || ""}
            onChange={handleCantidadChange}
            className={styles.input}
            placeholder="Ej. 5"
          />
        </label>

        {cantidad > 0 && (
          <div className={styles.gridNotas}>
            {calificaciones.map((nota, i) => (
              <label
                key={i}
                className={`${styles.notaItem} ${
                  typeof nota === "number"
                    ? nota >= 61
                      ? styles.aprobado
                      : styles.reprobado
                    : ""
                }`}
              >
                Nota #{i + 1}
                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={3}
                  value={nota === "" ? "" : String(nota)}
                  onChange={(e) => handleNotaChange(i, e.target.value)}
                  onBlur={(e) => handleNotaChange(i, e.target.value)}
                  onPaste={(e) => {
                    e.preventDefault();
                    const pasted = e.clipboardData.getData("text");
                    handleNotaChange(i, pasted);
                  }}
                  className={`${styles.input} ${nota === "" ? styles.inputEmpty : ""}`}
                  placeholder="0-100"
                  title="Solo 2 dígitos (00–99) o 100"
                />
              </label>
            ))}
          </div>
        )}

        {calificaciones.length > 0 && !notasValidas.enRango && (
          <p className={styles.error}>Todas las notas deben estar entre 0 y 100.</p>
        )}

        {reporte && (
          <section className={styles.reporte}>
            <h2>Reporte de Estadísticas</h2>
            <ul className={styles.listaReporte}>
              <li>Total de estudiantes: {reporte.total}</li>
              <li>Promedio: {reporte.promedio.toFixed(2)}</li>
              <li>Calificación más alta: {reporte.max}</li>
              <li>Calificación más baja: {reporte.min}</li>
              <li>Aprobados (≥ 61): {reporte.aprobados}</li>
              <li>Reprobados: {reporte.reprobados}</li>
            </ul>
          </section>
        )}
      </main>
    </div>
  );
}
