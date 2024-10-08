import { Inter } from "next/font/google";
import "./global.css";
import { ChakraProviders } from "./ChakraProvider";
import NavigationProvider from "./NavigationProvider";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { AuthContext } from "@/service/AuthProvider";
import { AuthProvider } from "@/service/AuthProvider";
import { AdsProvider } from "@/service/AdsProvider";
import { ApiProvider } from "@/service/ApiContext";
import { ChatProvider } from "@/service/ChatContext";
import { StoresProvider } from "@/service/StoresProvider";

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
            <AdsProvider>
              <ApiProvider>
                <ChatProvider>
                  <StoresProvider>
                    <NavigationProvider>{children}</NavigationProvider>
                  </StoresProvider>
                </ChatProvider>
              </ApiProvider>
            </AdsProvider>
          </AuthProvider>
        </ChakraProviders>
      </body>
    </html>
  );
}
