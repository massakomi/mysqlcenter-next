import StoreProvider from "@/app/StoreProvider";

export default async function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body>
        <StoreProvider>
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
