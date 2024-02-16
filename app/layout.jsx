import { ChakraProvider } from "@chakra-ui/react";
import { Links, Outlet, Scripts, ScrollRestoration } from "@remix-run/react";
import { TopBar } from "~/components/TopBar/TopBar.jsx";
import { NavBar } from "~/components/NavbarWithPopover/NavbarWithPopover.jsx";
import { Footer } from "~/components/FooterWithFourColumnsOnAccent/Footer.jsx";
import theme from "./theme";
export const Layout = (data) => {
  const {
    topBarText,
    hoursOfOperation,
    phoneNumber,
    brandColor,
    logo,
    heading,
    subtitle,
    copyrightText,
    navigation,
    footerNavigation,
    secondaryFooterNavigation,
  } = data;
  const { url: logoSrc } = logo.fields.file || "";
  return (
    <html lang="en">
      <head>
        <Links />
      </head>
      <body>
        <div id="root">
          <ChakraProvider theme={theme}>
            <TopBar
              topBarText={topBarText}
              hoursOfOperation={hoursOfOperation}
              brandColor={brandColor}
              phoneNumber={phoneNumber}
            />
            <NavBar
              logo={logoSrc}
              phoneNumber={phoneNumber}
              navigation={navigation}
            />
            <Outlet />
            <Footer
              hoursOfOperation={hoursOfOperation}
              heading={heading}
              navigation={footerNavigation}
              usefulLinks={secondaryFooterNavigation}
              subtitle={subtitle}
              copyrightText={copyrightText}
            />
          </ChakraProvider>
        </div>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
};
