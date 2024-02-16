import {
    Box,
    Button,
    Container,
    Heading,
    HStack,
    Image,
    Link,
    SimpleGrid,
    Stack,
    Text,
    useBreakpointValue,
} from '@chakra-ui/react'
import {ArrowForwardIcon} from "@chakra-ui/icons";
import {formatDate} from "@root/utils/formatDate.js";
import {LightenDarkenColor} from "@root/utils/lightenDarkenColor.js";

export const BlogSection = ({posts, preheader, title, subtitle, cta, brandColor}) => {
    const isMobile = useBreakpointValue({
        base: true,
        md: false,
    })
    return (
        <Box as="section" bg="white">
            <Container
                py={{
                    base: '16',
                    md: '24',
                }}
                maxW={{
                    base: 'xl',
                    md: '6xl',
                }}
            >
                <Stack
                    minW={'full'}
                    spacing={{
                        base: '12',
                        md: '16',
                    }}
                >
                    <Stack direction="row" justify="space-between">
                        <Stack
                            spacing={{
                                base: '4',
                                md: '5',
                            }}
                        >
                            <Stack spacing="3">
                                <Text
                                    color="accent"
                                    fontWeight="semibold"
                                    textTransform='uppercase'
                                    fontSize={{
                                        base: 'sm',
                                        md: 'md',
                                    }}
                                >
                                    {preheader}
                                </Text>
                                <Heading
                                    size={{
                                        base: 'md',
                                        md: 'lg',
                                    }}
                                >
                                    {title}
                                </Heading>
                            </Stack>
                            <Text
                                color="fg.muted"
                                fontSize={{
                                    base: 'lg',
                                    md: 'xl',
                                }}
                            >
                                {subtitle}
                            </Text>
                        </Stack>
                        {!isMobile &&
                            <Button variant="ghost" as={'a'} size="xl" px={5} href={'/blog'} _hover={{bg: 'initial'}}
                                    rightIcon={<ArrowForwardIcon/>}>{cta}</Button>}
                    </Stack>
                    <SimpleGrid
                        columns={{
                            base: 1,
                            md: 2,
                            lg: 3,
                        }}
                        gap={{
                            base: '12',
                            lg: '8',
                        }}
                    >
                        {/* eslint-disable-next-line react/prop-types */}
                        {posts.sort((a, b) => new Date(b.sys.updatedAt) - new Date(a.sys.updatedAt)).slice(0, 3).map((post, idx) => {
                            return (
                                <Link
                                    key={`${post.id}-${idx}`}
                                    _hover={{
                                        textDecor: 'none',
                                    }}
                                    href={`/blog/${post.fields.slug}`}
                                    role="group"
                                >
                                    <Stack spacing="3">
                                        <Box overflow="hidden">
                                            <Image
                                                src={post.fields.image.fields.file.url}
                                                alt={post.fields.title}
                                                width="full"
                                                height="15rem"
                                                objectFit="cover"
                                                transition="all 0.2s"
                                                _groupHover={{
                                                    transform: 'scale(1.05)',
                                                }}
                                            />
                                        </Box>
                                        <HStack>
                                            <Box fontSize="sm">
                                                <Text color="fg.muted"
                                                      fontWeight={'bold'}>{formatDate(post.sys.updatedAt)}</Text>
                                            </Box>
                                        </HStack>
                                        <Stack spacing="3">
                                            <Heading size="md" noOfLines={2}>{post.fields.title}</Heading>
                                            <Text color="fg.muted" noOfLines={3}>{post.fields.excerpt}</Text>
                                            {/* eslint-disable-next-line react/prop-types */}
                                            <Text fontWeight={'bold'} color={brandColor.value}
                                                  _hover={{textDecoration: 'underline'}}>Read more</Text>
                                        </Stack>
                                    </Stack>
                                </Link>
                            )
                        })}
                    </SimpleGrid>
                    <Box mx={'auto'}>
                        {isMobile &&
                            <Button size="lg" color={'white'} bg={brandColor.value} rightIcon={<ArrowForwardIcon/>}
                                    _hover={{
                                        bg: `#${LightenDarkenColor(brandColor.value.replace("#", ''), 40)}`
                                    }}>See all blog posts</Button>}
                    </Box>
                </Stack>

            </Container>
        </Box>
    )
}
