"use client";

import React, { useEffect, useState } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import QRCode from "qrcode";
import { Download } from "lucide-react"; // Usamos Lucide que ya está en tu proyecto
import { TravelPdf } from "./travel-pdf";
import { TravelGuide } from "@/types/travel";

export default function DownloadButton({ guide }: { guide: TravelGuide }) {
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("");
  const [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => {
    setIsClient(true);

    const generateQR = async () => {
      try {
        // Obtenemos la URL actual
        const url = window.location.href;

        const qrData = await QRCode.toDataURL(url, {
          width: 150,
          margin: 1,
          color: {
            dark: "#000000",
            light: "#ffffff",
          },
        });
        setQrCodeUrl(qrData);
      } catch (err) {
        console.error("Error generando QR:", err);
      }
    };

    generateQR();
  }, []);

  if (!isClient) return null;

  return (
    <div className="mt-12 flex justify-center w-full pb-10">
      <PDFDownloadLink
        document={<TravelPdf guide={guide} qrCodeUrl={qrCodeUrl} />}
        fileName={`LUMENS_CallSheet_${guide.destination.replace(/\s+/g, "_").toUpperCase()}.pdf`}
        className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-white px-8 py-4 transition-all hover:bg-zinc-200 hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.3)]"
      >
        {({ loading }) =>
          loading ? (
            <span className="text-xs font-bold tracking-widest text-black font-mono">
              GENERATING PDF...
            </span>
          ) : (
            <>
              <Download className="h-4 w-4 text-black" />
              <span className="text-xs font-bold tracking-widest text-black font-mono">
                DOWNLOAD PRODUCTION GUIDE
              </span>
            </>
          )
        }
      </PDFDownloadLink>
    </div>
  );
}
