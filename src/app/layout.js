import "./globals.css";

export const metadata = {
  title: "Country",
  description: "Prueba Tecnica",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body >
        {children}
      </body>
    </html>
  );
}
