import {
  Box,
  Button,
  Container,
  Heading,
  SimpleGrid,
  Stack,
  Text,
  Flex,
  Center,
} from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { LightenDarkenColor } from "@root/utils/lightenDarkenColor.js";
import { richTextOptions } from "@components/RichTextSection/RichTextSection.jsx";
import GetIcon from "@components/GetIcon/GetIcon.jsx";

export const ServiceSection = ({
  preHeading,
  title,
  subtitle,
  services,
  brandColor,
  website,
  backgroundColor,
}) => {
  if (services.length < 1) {
    return <></>;
  }
  return (
    <Box bg={backgroundColor.value} maxW={"full"}>
      <Container
        py={{
          base: "16",
          md: "24",
        }}
        maxW={{
          base: "xl",
          md: "6xl",
        }}
      >
        <Stack
          spacing={{
            base: "12",
            xl: "24",
          }}
          direction={["column", "column", "column", "column", "row"]}
        >
          <Stack spacing="10">
            <Stack
              spacing="3"
              full
              maxW={["full", "full", "full", "full", "sm"]}
              width="full"
            >
              <Text
                fontSize={{
                  base: "sm",
                  md: "md",
                }}
                textAlign={["center", "center", "center", "center", "left"]}
                color="accent"
                textTransform="uppercase"
                fontWeight="bold"
              >
                {preHeading}
              </Text>
              <Stack
                spacing={{
                  base: "4",
                  md: "5",
                }}
              >
                <Heading
                  size={{
                    base: "md",
                    md: "lg",
                  }}
                  color={brandColor.value}
                  textAlign={["center", "center", "center", "center", "left"]}
                >
                  {title}
                </Heading>
                <Text
                  fontSize={{
                    base: "lg",
                    md: "xl",
                  }}
                  color="fg.muted"
                  textAlign={["center", "center", "center", "center", "left"]}
                >
                  {subtitle}
                </Text>
              </Stack>
            </Stack>
            <Stack
              spacing="3"
              direction={{
                base: "column-reverse",
                md: "row",
              }}
            >
              <Button
                size="lg"
                rightIcon={<ArrowForwardIcon />}
                bgColor={brandColor.value}
                color={"white"}
                _hover={{
                  bg: `#${LightenDarkenColor(
                    brandColor.value.replace("#", ""),
                    40
                  )}`,
                }}
              >
                See our services
              </Button>
            </Stack>
          </Stack>
          <SimpleGrid
            columns={[1, 1, 1, 1, 2]}
            columnGap="8"
            rowGap={{
              base: "10",
              lg: "12",
            }}
            flex="1"
            maxW={"full"}
          >
            {services.splice(0, 6).map((service) => {
              return (
                <Center key={service.title} direction="row">
                  <Stack
                    width={["70%", "70%", "70%", "70%", "100%"]}
                    spacing="4"
                  >
                    <Stack>
                      <Box>
                        {service.iconLibrary && service.iconName && (
                          <GetIcon
                            lib={service.iconLibrary}
                            name={service.iconName}
                          />
                        )}
                        <Text fontWeight="bold" fontSize="lg">
                          {service.title}
                        </Text>
                      </Box>
                      {documentToReactComponents(
                        service.excerpt,
                        richTextOptions(website)
                      )}
                    </Stack>
                  </Stack>
                </Center>
              );
            })}
          </SimpleGrid>
        </Stack>
      </Container>
    </Box>
  );
};
