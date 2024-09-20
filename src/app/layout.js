import { Inter } from "next/font/google";
import "./global.css";
import { ChakraProviders } from "./ChakraProvider";
import NavigationProvider from "./NavigationProvider";
import { AuthContext } from "@/service/AuthProvider";
import { AuthProvider } from "@/service/AuthProvider";

const inter = Inter({ subsets: ["latin"] });
export const metadata = {
  title: "Bikes Hub",
  description: "Get your desired vehicle now",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ChakraProviders>
          <AuthProvider>
            <NavigationProvider>{children}</NavigationProvider>
          </AuthProvider>
        </ChakraProviders>
      </body>
    </html>
  );
}
