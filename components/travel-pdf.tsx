/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  Font,
} from "@react-pdf/renderer";
import { TravelGuide } from "@/types/travel";

// Registramos fuentes estándar
Font.register({
  family: "Helvetica",
  fonts: [
    {
      src: "https://fonts.gstatic.com/s/helveticaneue/5.13.0/HelveticaNeue-Regular.ttf",
    },
    {
      src: "https://fonts.gstatic.com/s/helveticaneue/5.13.0/HelveticaNeue-Bold.ttf",
      fontWeight: "bold",
    },
    {
      src: "https://fonts.gstatic.com/s/helveticaneue/5.13.0/HelveticaNeue-Italic.ttf",
      fontStyle: "italic",
    },
  ],
});

const styles = StyleSheet.create({
  page: {
    padding: 30,
    backgroundColor: "#FFFFFF",
    fontFamily: "Helvetica",
    fontSize: 10,
    color: "#1a1a1a",
  },
  // --- HEADER ---
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 2,
    borderBottomColor: "#000",
    paddingBottom: 10,
    marginBottom: 20,
  },
  brandTitle: {
    fontSize: 24,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 2,
  },
  subHeader: {
    fontSize: 8,
    color: "#666",
    textTransform: "uppercase",
    marginTop: 2,
  },

  // --- META BOX (CORREGIDO) ---
  metaBox: {
    flexDirection: "row",
    // Quitamos 'justifyContent: space-between' para usar anchos fijos
    borderWidth: 1,
    borderColor: "#000",
    padding: 10,
    marginBottom: 20,
    backgroundColor: "#f8f9fa",
  },
  // Definimos anchos exactos para que no se solapen
  colLeft: {
    width: "25%", // Espacio para "Location"
    borderRightWidth: 1,
    borderRightColor: "#ddd",
    paddingRight: 5,
  },
  colCenter: {
    width: "55%", // Espacio GRANDE para el texto largo de "Season"
    paddingHorizontal: 10,
    borderRightWidth: 1,
    borderRightColor: "#ddd",
  },
  colRight: {
    width: "20%", // Espacio para "Total Scenes"
    paddingLeft: 10,
    alignItems: "center", // Centrado
    justifyContent: "center",
  },

  metaLabel: {
    fontSize: 6,
    color: "#666",
    marginBottom: 2,
    textTransform: "uppercase",
  },
  metaValue: { fontSize: 10, fontWeight: "bold" },

  // --- ESCENAS (SPOTS) ---
  spotContainer: {
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingBottom: 10,
    break: false, // Intenta no romper la caja entre páginas si es posible
  },
  spotHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  spotName: { fontSize: 12, fontWeight: "bold" },
  spotType: {
    fontSize: 8,
    backgroundColor: "#000",
    color: "#FFF",
    padding: 2,
    paddingHorizontal: 4,
  },

  description: { fontSize: 9, lineHeight: 1.4, color: "#444", marginBottom: 6 },

  // --- CAJA TÉCNICA ---
  techBox: {
    marginTop: 5,
    padding: 6,
    backgroundColor: "#f1f1f1",
    borderLeftWidth: 3,
    borderLeftColor: "#ef4444", // Rojo REC
    flexDirection: "row",
    gap: 10,
  },
  techItem: { flexDirection: "column", width: "30%" }, // Ancho fijo para columnas técnicas
  techLabel: { fontSize: 6, color: "#888" },
  techValue: { fontSize: 8, fontWeight: "bold", color: "#111" },

  // --- FOOTER ---
  footer: {
    marginTop: 30, // Cambiado de absolute bottom para evitar superposiciones si la lista es larga
    borderTopWidth: 1,
    borderTopColor: "#000",
    paddingTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  footerCta: { fontSize: 12, fontWeight: "bold", marginBottom: 2 },
  footerLink: { fontSize: 8, color: "#666" },
  qrImage: { width: 50, height: 50 },
});

interface PdfProps {
  guide: TravelGuide;
  qrCodeUrl: string;
}

export const TravelPdf = ({ guide, qrCodeUrl }: PdfProps) => {
  const date = new Date().toLocaleDateString();

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* HEADER */}
        <View style={styles.header}>
          <View>
            <Text style={styles.brandTitle}>LUMENS</Text>
            <Text style={styles.subHeader}>Production Location Scout</Text>
          </View>
          <View style={{ alignItems: "flex-end" }}>
            <Text style={styles.subHeader}>STATUS: CONFIRMED</Text>
            <Text style={styles.subHeader}>DATE: {date}</Text>
          </View>
        </View>

        {/* META INFO - CORREGIDO CON COLUMNAS */}
        <View style={styles.metaBox}>
          {/* Columna 1: Ubicación */}
          <View style={styles.colLeft}>
            <Text style={styles.metaLabel}>LOCATION</Text>
            <Text style={styles.metaValue}>
              {guide.destination.toUpperCase()}
            </Text>
          </View>

          {/* Columna 2: Clima (El texto largo) */}
          <View style={styles.colCenter}>
            <Text style={styles.metaLabel}>BEST SEASON & WEATHER</Text>
            <Text style={styles.metaValue}>{guide.best_month_to_visit}</Text>
          </View>

          {/* Columna 3: Escenas */}
          <View style={styles.colRight}>
            <Text style={styles.metaLabel}>TOTAL SCENES</Text>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              {guide.spots.length}
            </Text>
          </View>
        </View>

        {/* INTRODUCCIÓN */}
        <Text
          style={{
            ...styles.description,
            fontStyle: "italic",
            marginBottom: 15,
          }}
        >
          "{guide.description_intro}"
        </Text>

        <Text
          style={{
            fontSize: 10,
            fontWeight: "bold",
            marginBottom: 10,
            backgroundColor: "#000",
            color: "#fff",
            padding: 4,
          }}
        >
          SHOT LIST / LOCATIONS
        </Text>

        {/* LOOP DE LUGARES */}
        {guide.spots.map((spot, index) => (
          <View key={index} style={styles.spotContainer} wrap={false}>
            <View style={styles.spotHeader}>
              <Text style={styles.spotName}>
                {index + 1}. {spot.name.toUpperCase()}
              </Text>
              <Text style={styles.spotType}>{spot.category || "EXTERIOR"}</Text>
            </View>

            <Text style={styles.description}>{spot.description}</Text>

            {spot.visitor_tip && (
              <Text style={styles.description}>
                <Text style={{ fontWeight: "bold" }}>⚠️ DIRECTOR'S NOTE: </Text>
                {spot.visitor_tip}
              </Text>
            )}

            {/* TECH SPECS */}
            <View style={styles.techBox}>
              <View style={styles.techItem}>
                <Text style={styles.techLabel}>LIGHTING</Text>
                <Text style={styles.techValue}>{spot.best_time_to_visit}</Text>
              </View>
              <View style={styles.techItem}>
                <Text style={styles.techLabel}>ISO</Text>
                <Text style={styles.techValue}>{spot.camera_settings.iso}</Text>
              </View>
              <View style={styles.techItem}>
                <Text style={styles.techLabel}>LENS</Text>
                <Text style={styles.techValue}>
                  {spot.camera_settings.lens_recommendation}
                </Text>
              </View>
            </View>
          </View>
        ))}

        {/* FOOTER CON QR */}
        <View style={styles.footer}>
          <View>
            <Text style={styles.footerCta}>PLAN YOUR OWN CINEMATIC TRIP</Text>
            <Text style={styles.footerLink}>
              Generated by LUMENS AI • Scan to view digital guide
            </Text>
          </View>
          {qrCodeUrl ? <Image src={qrCodeUrl} style={styles.qrImage} /> : null}
        </View>
      </Page>
    </Document>
  );
};
