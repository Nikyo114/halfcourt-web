import { ImageResponse } from "next/og";

export const alt = "Halfcourt: Pickup Basketball, Finally Done Right";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0A0A0A",
          backgroundImage:
            "radial-gradient(circle at center, rgba(232,77,26,0.22) 0%, rgba(232,77,26,0.08) 30%, #0A0A0A 65%)",
          color: "#FAFAFA",
          fontFamily: "sans-serif",
        }}
      >
        {/* Logo mark */}
        <svg
          width="220"
          height="220"
          viewBox="108 108 460 460"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M567.898 331.595L567.304 309.742H424.881C432.634 283.708 451.205 257.733 480.26 232.351C485.847 227.467 505.186 212.73 512.164 207.455L523.373 198.992L483.289 158.264L474.659 164.843C473.688 165.582 450.726 183.102 443.082 189.782C400.259 227.192 374.646 267.493 366.791 309.735H366.255V366.251H366.871C374.812 408.334 400.404 448.497 443.075 485.776C450.784 492.515 473.942 510.158 474.927 510.904L483.572 517.491L523.59 476.712L512.388 468.263C505.367 462.967 485.912 448.149 480.268 443.222C451.371 417.978 432.844 392.147 425.018 366.251H567.319L567.913 344.398C567.971 342.101 568.007 340 568.007 337.993C568.007 335.986 567.978 333.892 567.913 331.588L567.898 331.595Z" fill="#EB4310" />
          <path d="M309.745 366.258V309.742H309.209C301.362 267.499 275.74 227.199 232.918 189.789C225.273 183.109 202.311 165.596 201.34 164.85L192.711 158.271L152.62 198.991L163.829 207.454C170.807 212.722 190.138 227.46 195.732 232.35C224.788 257.732 243.359 283.708 251.112 309.742H108.696L108.094 331.587C108.029 333.87 108 335.971 108 338C108 340.029 108.029 342.13 108.094 344.42L108.696 366.258H250.982C243.149 392.154 224.621 417.985 195.725 443.229C190.08 448.156 170.626 462.981 163.604 468.277L152.402 476.726L192.428 517.505L201.072 510.926C202.051 510.179 225.208 492.529 232.918 485.798C275.588 448.518 301.18 408.356 309.122 366.265H309.738L309.745 366.258Z" fill="#EB4310" />
          <path d="M337.997 568C340.004 568 342.098 567.971 344.402 567.906L366.255 567.311V108.703L344.424 108.094C339.917 107.963 336.076 107.963 331.577 108.094L309.745 108.703V567.311L331.598 567.906C333.895 567.963 335.997 568 338.004 568H337.997Z" fill="#EB4310" />
        </svg>

        {/* Wordmark */}
        <div
          style={{
            display: "flex",
            fontSize: 112,
            fontWeight: 900,
            letterSpacing: -3,
            marginTop: 40,
            lineHeight: 1,
            color: "#FAFAFA",
          }}
        >
          halfcourt
        </div>

        {/* Tagline */}
        <div
          style={{
            display: "flex",
            fontSize: 30,
            color: "#AAAAAA",
            marginTop: 18,
            fontWeight: 500,
          }}
        >
          Pickup basketball, done for all.
        </div>

        {/* Footer bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginTop: 48,
            padding: "12px 28px",
            borderRadius: 100,
            border: "1px solid rgba(232,77,26,0.4)",
            backgroundColor: "rgba(232,77,26,0.1)",
          }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              backgroundColor: "#E84D1A",
            }}
          />
          <div
            style={{
              display: "flex",
              fontSize: 22,
              fontWeight: 700,
              color: "#E84D1A",
              letterSpacing: 1,
            }}
          >
            LAUNCHING SOON · BENDIGO, VIC
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
