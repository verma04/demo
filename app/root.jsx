import client from "@root/utils/contentfulClient.js";
import { json } from "@remix-run/node";
import { getReferencedEntriesItems } from "@root/utils/getReferencedEntriesFromFields.js";
import {
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
import { NotFoundSection } from "~/components/NotFoundSection/NotFoundSection.jsx";
import { Layout } from "./layout.jsx";
import { ChakraProvider } from "@chakra-ui/react";

export const loader = async () => {
  const global = await client.getEntries({
    content_type: "globalData", // Make sure this matches your Contentful content type ID
  });

  // const referencedEntries = await getReferencedEntriesFromFields(global.items)
  const navigation = global.items[0].fields.navigation?.fields?.navigationItems
    ? await getReferencedEntriesItems(
        global.items[0].fields.navigation.fields.navigationItems
      )
    : [];
  const footerNavigation = global.items[0].fields.footerNavigation?.fields
    ?.navigationItems
    ? await getReferencedEntriesItems(
        global.items[0].fields.footerNavigation.fields.navigationItems
      )
    : [];
  const secondaryFooterNavigation = global.items[0].fields
    .secondaryFooterNavigation?.fields?.navigationItems
    ? await getReferencedEntriesItems(
        global.items[0].fields.secondaryFooterNavigation.fields.navigationItems
      )
    : [];
  return json({
    globalData: global.items[0].fields,
    navigation: navigation
      .filter((entry) => entry.sys.contentType.sys.id === "navigationItem")
      .reverse(),
    footerNavigation: footerNavigation
      .filter((entry) => entry.sys.contentType.sys.id === "navigationItem")
      .reverse(),
    secondaryFooterNavigation: secondaryFooterNavigation
      .filter((entry) => entry.sys.contentType.sys.id === "navigationItem")
      .reverse(),
  });
};

export const meta = () => {
  return [
    { name: "viewport", content: "width=device-width, initial-scale=1.0" },
  ];
};

export default function App() {
  const {
    globalData,
    navigation,
    footerNavigation,
    secondaryFooterNavigation,
  } = useLoaderData();
  return (
    <Layout
      {...globalData}
      navigation={navigation}
      footerNavigation={footerNavigation}
      secondaryFooterNavigation={secondaryFooterNavigation}
    />
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      return (
        <ChakraProvider>
          <NotFoundSection />
        </ChakraProvider>
      );
    }
    throw new Error(`${error.status} ${error.statusText}`);
  }
  throw new Error(error instanceof Error ? error.message : "Unknown Error");
}
