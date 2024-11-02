export const metadata = {
    title: "Plant.ly",
    description: "Cuide de sua plantinha",
  };
  
  export default function RootLayout({ children }) {
    return (
      <html lang="en">
        <body>{children}</body>
      </html>
    );
  }