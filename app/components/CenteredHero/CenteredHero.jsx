import {Box, Button, Flex, Heading, Image, LightMode, Stack, Text} from "@chakra-ui/react";

export const CenteredHero = ({header, subtitle, imgSrc, badgeSrc, badgeTwoSrc, useH1, phoneNumber, buttonColor}) => {
    return (
        <Box>
            <Box as="section" color="white" py="7.5rem" minH="140px" position="relative"
                 bg={imgSrc ? 'unset' : 'gray.800'}>
                <Box
                    zIndex={1}
                    maxW={{
                        base: 'xl',
                        md: '5xl',
                    }}
                    mx="auto"
                    px={{
                        base: '6',
                        md: '8',
                    }}
                >
                    <Box textAlign="center">
                        <Box display={'flex'} gap={55} alignItems={'center'} justifyContent={'center'} pb={10}>
                            {badgeSrc &&
                                <img src={badgeSrc} alt=""/>
                            }
                            {badgeTwoSrc &&
                                <img src={badgeTwoSrc} alt=""/>
                            }
                        </Box>
                        <Heading
                            as={useH1 ? 'h1' : 'h2'}
                            size="3xl"
                            fontWeight={useH1 ? 'extrabold' : 'bold'}
                            mx="auto"
                            lineHeight="1.2"
                            letterSpacing="tight"
                        >
                            {header}
                        </Heading>
                        {subtitle &&
                            <Text fontSize="xl" mt="4" mx="auto">
                                {subtitle}
                            </Text>
                        }
                    </Box>

                    <Stack
                        justify="center"
                        direction={{
                            base: 'column',
                            md: 'row',
                        }}
                        mt="10"
                        spacing="4"
                    >
                        <LightMode>
                            <Button as={'a'} href={`tel:${phoneNumber}`} fontSize={'20px'}
                                    bg={buttonColor || 'blue.800'} color={'white'}
                                    _hover={{bg: 'gray.700', color: 'white', cursor: 'pointer'}} borderRadius={0}
                                    lineHeight={'26px'} minH={'56px'} px={10} fontWeight={'bold'} letterSpacing={'1px'}
                                    textTransform={'uppercase'}>call us toady!</Button>
                        </LightMode>
                    </Stack>
                </Box>
                {imgSrc &&
                    <Flex
                        zIndex={-1}
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
                            <Box position="absolute" w="full" h="full" bg="gray.900" opacity={.8}/>
                        </Box>
                    </Flex>
                }
            </Box>
        </Box>
    )
}