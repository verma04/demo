import {documentToReactComponents} from '@contentful/rich-text-react-renderer';
import pkg, {INLINES} from '@contentful/rich-text-types';
import {
    Box,
    Heading,
    Link,
    ListItem,
    OrderedList,
    Stack,
    Table,
    Td,
    Text,
    Th,
    Tr,
    UnorderedList
} from "@chakra-ui/react";


const {BLOCKS, MARKS} = pkg;

export const richTextOptions = (website) => {
    return {
        renderMark: {
            [MARKS.BOLD]: (text) => <span fontWeight={'bold'}>{text}</span>,
        },
        renderNode: {
            [INLINES.HYPERLINK]: ({data}, children) => (
                <Link
                    href={data.uri}
                    target={`${data.uri.startsWith(website) || data.uri.startsWith('/') ? '_self' : '_blank'}`}
                    rel={`${data.uri.startsWith(website) || data.uri.startsWith('/') ? '' : 'noopener noreferrer'}`}
                >{children}</Link>
            ),
            [BLOCKS.PARAGRAPH]: (node, children) => <Text>{children}</Text>,
            [BLOCKS.LIST_ITEM]: (node, children) => <ListItem>{children}</ListItem>,
            [BLOCKS.UL_LIST]: (node, children) => <UnorderedList>{children}</UnorderedList>,
            [BLOCKS.OL_LIST]: (node, children) => <OrderedList>{children}</OrderedList>,
            [BLOCKS.HEADING_1]: (node, children) => <Heading as={'h1'} pt={2} pb={1}>{children}</Heading>,
            [BLOCKS.HEADING_2]: (node, children) => <Heading as={'h2'} pt={2} pb={1}>{children}</Heading>,
            [BLOCKS.HEADING_3]: (node, children) => <Heading as={'h3'} pt={2} pb={1}>{children}</Heading>,
            [BLOCKS.HEADING_4]: (node, children) => <Heading as={'h4'} pt={2} pb={1}>{children}</Heading>,
            [BLOCKS.HEADING_5]: (node, children) => <Heading as={'h5'} pt={2} pb={1}>{children}</Heading>,
            [BLOCKS.HEADING_6]: (node, children) => <Heading as={'h6'} pt={2} pb={1}>{children}</Heading>,
            [BLOCKS.TABLE]: (node, children) => <Table>{children}</Table>,
            [BLOCKS.TABLE_CELL]: (node, children) => <Td>{children}</Td>,
            [BLOCKS.TABLE_ROW]: (node, children) => <Tr>{children}</Tr>,
            [BLOCKS.TABLE_HEADER_CELL]: (node, children) => <Th>{children}</Th>
        },
    }
};


export const RichTextSection = ({richTextDocument, website}) => {
    return (
        <Box as="section" mx="auto" py={16} maxW={{
            base: 'xl',
            md: '6xl',
        }}>
            <Stack spacing={2} px={5}>
                {documentToReactComponents(richTextDocument, richTextOptions(website))}
            </Stack>
        </Box>
    )
}
