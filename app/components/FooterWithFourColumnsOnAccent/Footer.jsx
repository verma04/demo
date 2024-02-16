import {
    Box,
    Button,
    ButtonGroup,
    Container,
    Divider,
    HStack,
    IconButton,
    SimpleGrid,
    Stack,
    Text,
} from '@chakra-ui/react'
import {FaClock, FaGithub, FaLinkedin, FaTwitter} from 'react-icons/fa'
import {getNavPath} from "@root/utils/getNavPath.js";

export const Footer = ({hoursOfOperation, heading, subtitle, copyrightText, navigation, secondaryFooterNavigation}) => {
    return (
        <Box bg="gray.800" color="white">
            <Container as="footer" role="contentinfo" maxW={'1170px'} mx={'auto'} w={'full'} px={{base: 5, xl: 0}}>
                <Stack
                    justify="space-between"
                    align="baseline"
                    direction={{
                        base: 'column',
                        lg: 'row',
                    }}
                    py={{
                        base: '12',
                        md: '16',
                    }}
                    spacing="8"
                >
                    <Stack
                        spacing={{
                            base: '3',
                            md: '3',
                        }}
                        align="start"
                        maxW={'300px'}
                    >
                        <Text color="fg.accent.muted" fontSize={'x-large'}
                              fontWeight={'bold'}>{heading}</Text>
                        <Text color="fg.accent.muted">{subtitle}</Text>
                        {/*<Text color="fg.accent.muted">{SiteData.homepage.footerText2}</Text>*/}
                        <HStack color="fg.accent.muted"><FaClock/>
                            <Text
                                color="fg.accent.muted">{hoursOfOperation}</Text>
                        </HStack>

                    </Stack>
                    <SimpleGrid
                        columns={{
                            base: 1,
                            md: 3,
                        }}
                        gap="10"
                        width={{
                            base: 'full',
                            lg: 'auto',
                        }}
                        justifyContent={'space-between'}
                    >
                        {navigation?.length > 0 &&
                            <Stack
                                spacing="4"
                                minW={{
                                    lg: '40',
                                }}
                            >
                                <Text fontSize="sm" fontWeight="semibold" color="fg.accent.subtle">
                                    Services
                                </Text>
                                <Stack spacing="3" align={'start'}>
                                    {/* eslint-disable-next-line react/prop-types */}
                                    {navigation.slice(0, 6).map((navItem, idx) => {
                                        return (
                                            <Button key={idx} as="a" variant="text.accent" justifyContent={'start'}
                                                    href={getNavPath(navItem.fields.page.fields.slug)}>
                                                {navItem.fields.title}
                                            </Button>
                                        )
                                    })}
                                </Stack>
                            </Stack>
                        }
                        {navigation?.length > 6 &&
                            <Stack
                                spacing="4"
                                minW={{
                                    lg: '40',
                                }}
                            >
                                <Text fontSize="sm" fontWeight="semibold" color="fg.accent.subtle">
                                    &nbsp;
                                </Text>
                                <Stack spacing="3" align={'start'}>
                                    {/* eslint-disable-next-line react/prop-types */}
                                    {navigation.slice(6).map((navItem, idx) => {
                                        return (
                                            <Button key={idx} as="a" variant="text.accent" justifyContent={'start'}
                                                    href={getNavPath(navItem.fields.page.fields.slug)}>
                                                {navItem.fields.title}
                                            </Button>
                                        )
                                    })}
                                </Stack>
                            </Stack>
                        }
                        {secondaryFooterNavigation?.length > 0 &&
                            <Stack
                                spacing="4"
                                minW={{
                                    lg: '40',
                                }}
                            >
                                <Text fontSize="sm" fontWeight="semibold" color="fg.accent.subtle">
                                    Useful Links
                                </Text>
                                <Stack spacing="3" align={'start'}>
                                    {/* eslint-disable-next-line react/prop-types */}
                                    {secondaryFooterNavigation.map((navItem, idx) => {
                                        return (
                                            <Button key={idx} as="a" variant="text.accent" justifyContent={'start'}
                                                    href={getNavPath(navItem.fields.page.fields.slug)}>
                                                {navItem.fields.title}
                                            </Button>
                                        )
                                    })}
                                </Stack>
                            </Stack>
                        }
                    </SimpleGrid>
                </Stack>
                <Divider borderColor="bg.accent.subtle"/>
                <Stack
                    pt="8"
                    pb="12"
                    justify="space-between"
                    direction={{
                        base: 'column-reverse',
                        md: 'row',
                    }}
                    align="center"
                >
                    <Text fontSize="sm" color="fg.accent.subtle">
                        &copy; {new Date().getFullYear()} {copyrightText}
                    </Text>
                    <ButtonGroup variant="tertiary.accent">
                        <IconButton as="a" href="#" aria-label="LinkedIn" icon={<FaLinkedin/>}/>
                        <IconButton as="a" href="#" aria-label="GitHub" icon={<FaGithub/>}/>
                        <IconButton as="a" href="#" aria-label="Twitter" icon={<FaTwitter/>}/>
                    </ButtonGroup>
                </Stack>
            </Container>
        </Box>
    )
}
