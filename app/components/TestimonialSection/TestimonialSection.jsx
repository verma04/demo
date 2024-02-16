import {
    Box,
    Flex,
    Heading,
    HStack,
    Icon,
    Img,
    SimpleGrid,
    Text,
    useColorModeValue as mode,
    VStack
} from '@chakra-ui/react'
import {ImQuotesLeft, ImQuotesRight} from 'react-icons/im'
import {BsFillStarFill} from "react-icons/bs";

const Testimonial = (props) => {

    const {children, image, author, location} = props
    const accentColor = mode(`blue.600`, `blue.400`)
    return (
        <Flex
            direction="column"
            rounded={{
                md: 'lg',
            }}
            bg={mode('white', 'gray.700')}
            shadow="lg"
        >
            <Flex
                direction="column"
                position="relative"
                mb="4"
                textAlign="center"
                justify="center"
                align="center"
                pt="10"
                pb="6"
                px="10"
            >
                <Box mb="2">
                    <HStack spacing="1.5" {...props}>
                        {Array.from({length: 5})
                            .map((_, index) => index + 1)
                            .map((index) => (
                                <Icon
                                    key={index}
                                    as={BsFillStarFill}
                                    fontSize="xl"
                                    color="blue.500"
                                    _dark={{color: 'blue.200'}}
                                />
                            ))}
                    </HStack>
                </Box>
                <Box maxW="340px" mx="auto" my="4">
                    <Box
                        position="absolute"
                        top="6"
                        left="5"
                        display={{
                            base: 'none',
                            md: 'inline',
                        }}
                        fontSize="3xl"
                        color={accentColor}
                        opacity={0.2}
                    >
                        <ImQuotesLeft/>
                    </Box>
                    <Text fontSize="small" as={"blockquote"}>{children}</Text>
                    <Box
                        position="absolute"
                        bottom="-2"
                        right="5"
                        display={{
                            base: 'none',
                            md: 'inline',
                        }}
                        fontSize="3xl"
                        color={accentColor}
                        opacity={0.2}
                    >
                        <ImQuotesRight/>
                    </Box>
                </Box>
            </Flex>
            <Flex
                direction="column"
                position="relative"
                align="center"
                justify="center"
                color="white"
                px="6"
                pb="8"
            >
                <Box
                    position="absolute"
                    left="0"
                    bottom="0"
                    w="full"
                    h="full"
                    roundedBottom={{
                        md: 'lg',
                    }}
                    overflow="hidden"
                    _before={{
                        content: `''`,
                        display: 'block',
                        position: 'absolute',
                        bottom: '0',
                        left: '-10%',
                        width: '120%',
                        height: '90%',
                        roundedTop: '120%',
                        bg: accentColor,
                    }}
                />
                <Img
                    src={image}
                    alt={author}
                    rounded="full"
                    border="6px solid"
                    borderColor={accentColor}
                    position="relative"
                    mt="-5"
                    w="16"
                    h="16"
                    objectFit="cover"
                />
                <Box position="relative" fontSize="sm" mt="3" textAlign="center">
                    <Text as="h3" fontWeight="bold" fontSize="md">
                        {author}
                    </Text>
                    <Text>{location}</Text>
                </Box>
            </Flex>
        </Flex>
    )
}


export const TestimonialSection = ({heading, subtitle, testimonials}) => {
    return (
        <Box as="section" bg={mode('gray.100', 'gray.800')} py="24">
            <Box
                maxW={{
                    base: 'xl',
                    md: '6xl',
                }}
                mx="auto"
                px={{
                    md: '8',
                }}
            >
                <VStack textAlign={'center'} pb={16}>
                    <Heading as={'h2'} size="2xl" fontWeight="bold">
                        {heading}
                    </Heading>
                    <Text
                        fontSize={{
                            md: 'xl',
                        }}
                        mt="4"
                    >
                        {subtitle}
                    </Text>
                </VStack>
                <SimpleGrid
                    columns={{
                        base: 1,
                        md: 3,
                    }}
                    spacing="10"
                >
                    {
                        testimonials.map((testimonial) =>
                            <Testimonial
                                key={testimonial.fields.name}
                                author={testimonial.fields.name}
                                location={testimonial.fields.location}
                                image={testimonial.fields.avatar.fields.file.url}
                            >
                                {testimonial.fields.testimonial}
                            </Testimonial>
                        )}
                </SimpleGrid>
            </Box>
        </Box>
    )
}
