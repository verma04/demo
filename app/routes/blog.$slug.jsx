import client from "@root/utils/contentfulClient.js";
import {json} from "@remix-run/node";
import {useLoaderData} from "@remix-run/react";
import {Box, Button, Heading, HStack, Image, Link, Stack, Text, VStack} from "@chakra-ui/react";
import {formatDate} from "@root/utils/formatDate.js";
import {documentToReactComponents} from "@contentful/rich-text-react-renderer";
import {PhoneIcon} from "@chakra-ui/icons";
import {CenteredHero} from "~/components/CenteredHero/CenteredHero.jsx";
import {richTextOptions} from "@components/RichTextSection/RichTextSection.jsx";

const CONTENT_TYPE_BLOGPOST = 'blogPost';
const WEBSITE_URL = process.env.WEBSITE_URL;

export const loader = async ({params}) => {
    const {slug} = params;

    try {
        const [entryResponse, latestPostsResponse, global] = await Promise.all([
            client.getEntries({
                content_type: CONTENT_TYPE_BLOGPOST,
                'fields.slug': slug,
            }),
            client.getEntries({
                content_type: CONTENT_TYPE_BLOGPOST,
                'fields.website': WEBSITE_URL,
                limit: 4,
                order: '-sys.updatedAt',
            }),
            client.getEntries({
                content_type: 'globalData', // Make sure this matches your Contentful content type ID
            })
        ]);

        if (entryResponse.items.length === 0) {
            throw new Response("Not Found", {status: 404});
        }

        return json({
            blogPost: entryResponse.items[0], // Assuming the first item is the target post
            latestPosts: latestPostsResponse.items,
            globalData: global.items[0].fields,
            WEBSITE: process.env.WEBSITE_URL
        });
    } catch (error) {
        console.error(error); // Consider a more robust logging solution for production
        throw new Response("An error occurred", {status: 500});
    }
};

export const meta = ({data}) => {
    const {title, metaDescription, image} = data.blogPost.fields;
    return [
        {title: title},
        {name: "description", content: metaDescription},
        {name: "og:image", content: image.fields.file.url},
    ];
};

export default function BlogPost() {
    const {blogPost, latestPosts, globalData, WEBSITE} = useLoaderData();
    return (
        <Box>
            <CenteredHero header={blogPost.fields.title} phoneNumber={globalData.phoneNumber} useH1={true}
                          subtitle={blogPost.fields.excerpt}
                          imgSrc={blogPost.fields.image.fields.file.url} buttonColor={'#1eb924'}/>
            <Box mx="auto" py={16} maxW={{
                base: 'xl',
                md: '6xl',
            }}>
                <Stack
                    direction={{
                        base: 'column',
                        lg: 'row',
                    }}
                    spacing={{
                        base: '12',
                        lg: '16',
                    }}
                    flex="1"
                >
                    <Box as="main" role="main" width="full" bg="bg.accent.default">
                        <Stack spacing="8">
                            <Box overflow="hidden">
                                <Image
                                    src={blogPost.fields.image.fields.file.url}
                                    alt={blogPost.fields.title}
                                    width="full"
                                    height={{base: '15rem', md: 'sm'}}
                                    objectFit="cover"
                                    transition="all 0.2s"
                                    _groupHover={{transform: 'scale(1.05)'}}
                                />
                            </Box>
                            <Stack spacing="6">
                                <Stack spacing="3">
                                    <HStack spacing="1" fontSize="sm" fontWeight="semibold" color="accent">
                                        <Text>{formatDate(blogPost.sys.updatedAt)}</Text>
                                    </HStack>
                                    <Heading size={{base: 'md', md: 'lg'}}>{blogPost.fields.title}</Heading>
                                    {documentToReactComponents(blogPost.fields.body, richTextOptions(WEBSITE))}
                                </Stack>
                                <Stack textAlign={'center'} boxShadow="md" bg={'#eee'} px={10} py={10}>
                                    <Heading as={'h2'}>{globalData.heading}</Heading>
                                    <Text fontSize={'x-large'}>{globalData.subtitle}</Text>
                                    <Button leftIcon={<PhoneIcon/>} size={'lg'} bg={'#1eb924'} textTransform="uppercase"
                                            mt={5}
                                            color={'#fff'} as={'a'} _hover={{bg: globalData.brandColor.value}}
                                            mx={'auto'}
                                            href={`tel:${globalData.phoneNumber}`} maxW={'2xl'}>Call us today!</Button>
                                </Stack>

                            </Stack>
                        </Stack>
                    </Box>
                    <Box
                        as="aside"
                        role="complementary"
                        bg="bg.accent.default"
                        width={{
                            base: 'full',
                            lg: 'xl',
                        }}
                        alignSelf="start"
                        position={{
                            base: 'unset',
                            lg: 'sticky',
                        }}
                        top="36"
                    >
                        <VStack>
                            {latestPosts.filter(post => post.fields.slug !== blogPost.fields.slug).slice(0, 3).map((post) => {
                                return (
                                    <Link key={post.sys.id} href={`/blog/${post.fields.slug}`}
                                          _hover={{textDecor: 'none'}}
                                          role="group">
                                        <Box
                                            p="6"
                                            bg="bg.surface"
                                            boxShadow="md"
                                            _groupHover={{boxShadow: 'xl'}}
                                            transition="all 0.2s"
                                            height="full"
                                        >
                                            <Stack spacing={{base: '8', lg: '16'}} justify="space-between"
                                                   height="full">
                                                <Stack spacing="8">
                                                    <Box overflow="hidden">
                                                        <Image
                                                            src={post.fields.image.fields.file.url}
                                                            alt={post.fields.title}
                                                            width="full"
                                                            height="15rem"
                                                            objectFit="cover"
                                                        />
                                                    </Box>
                                                    <Stack spacing="3">
                                                        <Text fontSize="sm" fontWeight="semibold" color="accent">
                                                            {formatDate(post.sys.updatedAt)}
                                                        </Text>
                                                        <Heading size="md">{post.fields.title}</Heading>
                                                        <Text color="fg.muted">{post.fields.excerpt}</Text>
                                                        <Text fontWeight="bold">Read article</Text>
                                                    </Stack>
                                                </Stack>
                                            </Stack>
                                        </Box>
                                    </Link>
                                )
                            })}
                        </VStack>
                    </Box>
                </Stack>
            </Box>
        </Box>
    );
}