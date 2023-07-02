import "@/styles/globals.scss";
import { Inter } from "next/font/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Providers } from "@/components/Providers";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Rift Insights",
  description: "LoL Performance Analysis",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
          <ReactQueryDevtools />
        </Providers>
      </body>
    </html>
  );
}
