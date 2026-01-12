import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/reset.css";
import "@/styles/GlobalFontsSetting.css";
import "@/styles/MainStyle.css";
import "@/styles/laptopResponsive.css";
import ClientWrapper from "./ClientWrapper";
import ReduxProvider from "@/store/ReduxProvider";

export const metadata = {
  title: "Ending Homelessness ",
  description: "The Plan to end homelessness in Bermuda by 2030",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ReduxProvider>
          <ClientWrapper>{children}</ClientWrapper>
        </ReduxProvider>
      </body>
    </html>
  );
}
