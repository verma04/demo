import {Box, Container, Heading, Image, Link, Stack, Text} from '@chakra-ui/react'
import {formatPhone} from "@root/utils/formatPhone.js";

export const CallToAction = ({title, subtitle, buttonText, imgSrc, bgColor, fontColorLight, phoneNumber}) => (
    <Container
        py={{
            base: '16',
            md: '24',
        }}
        maxW={{
            base: 'xl',
            md: '7xl',
        }}
    >
        <Box
            bg={bgColor || 'gray.400'}
            color={fontColorLight ? "#fff" : 'gray.800'}
            borderRadius="xl"
            maxW={'full'}
            px={{
                base: '6',
                lg: '16',
            }}
            py={{
                base: '10',
                lg: '16',
            }}
        >
            <Stack
                spacing="8"
                direction={{
                    base: 'column',
                    lg: 'row',
                }}
                justify="space-between"
                align={'center'}
            >
                {imgSrc &&
                    <Stack>
                        <Image src={imgSrc}/>
                    </Stack>
                }
                <Stack spacing="2" maxW="2xl" borderRight={{base: 'none', xl: '1px solid #fff'}}>
                    <Heading size="lg" fontWeight={'bold'} textAlign={{base: 'center', xl: 'left'}}
                             color={fontColorLight ? "fg.accent.default" : 'gray.800'}>{title}</Heading>
                    {subtitle &&
                        <Text
                            textAlign={{base: 'center', xl: 'left'}}
                            color={fontColorLight ? "fg.accent.default" : 'gray.800'}
                            fontSize={{
                                base: 'lg',
                                lg: 'xl',
                            }}
                            maxW={{
                                base: 'unset',
                                md: 'xl',
                            }}
                            pr={{base: '0', md: '16'}}
                        >
                            {subtitle}
                        </Text>
                    }
                </Stack>
                <Stack
                    spacing="3"
                    direction={{
                        base: 'column',
                        sm: 'row',
                    }}
                    justify={{
                        base: 'start',
                    }}
                >
                    <Link href={`tel:${phoneNumber}`} color={fontColorLight ? "fg.accent.default" : 'gray.800'}
                          _hover={{textDecoration: 'none', color: 'initial'}}>
                        <Stack spacing={-1} textAlign={'center'} lineHeight={'2.5rem'}>
                            <Text textTransform={'capitalize'} fontSize={'xx-large'}
                                  fontWeight={'bold'}>{buttonText}</Text>
                            <Text fontSize={'xx-large'} fontWeight={'bold'}
                                  color={fontColorLight ? 'gray.800' : "fg.accent.default"}>{formatPhone(phoneNumber)}</Text>
                        </Stack>
                    </Link>
                </Stack>
            </Stack>
        </Box>
    </Container>
)