import {Box, Button, Flex, Heading, Image, Link, Stack, Text} from '@chakra-ui/react'
import {formatPhone} from "@root/utils/formatPhone.js";


export const Hero = ({header, subtitle, imgSrc, colorOverlay, overlayOpacity, isH1, buttonBg, buttonTextColor, phoneNumber}) => {
    return (
        <Box bg="gray.800" as="section" minH="140px" position="relative" minW={'full'}>
            <Box py="32" position="relative" zIndex={1} minW={'full'}>
                <Box
                    maxW={{
                        base: 'xl',
                        md: '7xl',
                    }}
                    mx={'auto'}
                    px={{
                        base: '6',
                        md: '8',
                    }}

                    color="white"
                >
                    <Box maxW="5xl">
                        <Link href={`tel:${phoneNumber}`} _hover={{textDecoration: 'none'}}>
                            <Stack color={'yellow.500'} fontWeight={'bold'} display={'flex'}
                                   flexDirection={{base: 'column', md: 'row'}} alignItems={'end'} spacing={2}>
                                <Text textTransform={'uppercase'} fontSize={'x-large'}
                                      letterSpacing={'1px'}>call us anytime</Text>
                                <Text
                                    as={'span'} size={{
                                    base: 'md',
                                    md: 'large'
                                }} letterSpacing={'normal'}
                                    fontSize={{base: 'lg', md: 'xxx-large'}}> {formatPhone(phoneNumber)}</Text>
                            </Stack>
                        </Link>
                        <Heading as={isH1 ? 'h1' : 'h2'} size="3xl" fontWeight="extrabold">
                            {header}
                        </Heading>
                        <Text
                            fontSize={{
                                md: '2xl',
                            }}
                            mt="4"
                            maxW="lg"
                        >
                            {subtitle}
                        </Text>
                        <Stack
                            direction={{
                                base: 'column',
                                md: 'row',
                            }}
                            mt="10"
                            spacing="4"
                        >
                            <Button as={'a'} href={`tel:${phoneNumber}`} fontSize={'20px'} bg={buttonBg}
                                    _hover={{bg: 'gray.700', color: buttonTextColor, cursor: 'pointer'}} borderRadius={0}
                                    lineHeight={'26px'} minH={'56px'} px={10} fontWeight={'bold'} letterSpacing={'1px'}
                                    textTransform={'uppercase'}>call us toady!</Button>
                        </Stack>
                    </Box>
                </Box>
            </Box>
            <Flex
                id="image-wrapper"
                position="absolute"
                insetX="0"
                insetY="0"
                w="full"
                h="full"
                overflow="hidden"
                align="center"
            >
                <Box position="relative" w="full" h="full">
                    <Image
                        src={imgSrc}
                        alt="Main Image"
                        w="full"
                        h="full"
                        objectFit="cover"
                        objectPosition="top bottom"
                        position="absolute"
                    />
                    <Box position="absolute" w="full" h="full" bg={colorOverlay} opacity={overlayOpacity / 100}/>
                </Box>
            </Flex>
        </Box>
    )
}
