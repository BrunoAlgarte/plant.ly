export const metadata = {
    title: "Plantinha",
    description: "Cuide de sua plantinha",
  };
  
  export default function RootLayout({ children }) {
    return (
      <html lang="en">
        <body>{children}</body>
      </html>
    );
  }