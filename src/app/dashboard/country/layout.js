import localFont from '@next/font/local';
import "/src/app/globals.css";

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
