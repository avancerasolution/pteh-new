import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/reset.css";
import "@/styles/GlobalFontsSetting.css";
import "@/styles/MainStyle.css";
import "@/styles/laptopResponsive.css";
import "@/styles/MobileResponsive.css";
import ClientWrapper from "./ClientWrapper";
import ReduxProvider from "@/store/ReduxProvider";

import NextTopLoader from "nextjs-toploader";

export const metadata = {
  title: "Ending Homelessness ",
  description: "The Plan to end homelessness in Bermuda by 2030",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <NextTopLoader color="#ECCD75" height={8} showSpinner={false} speed={200} />
        <ReduxProvider>
          <ClientWrapper>{children}</ClientWrapper>
        </ReduxProvider>
      </body>
    </html>
  );
}
