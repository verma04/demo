import {json} from '@remix-run/node';
import {useLoaderData} from "@remix-run/react";
import {renderComponentSection} from "@root/utils/renderComponentSection.jsx";
import {Box} from "@chakra-ui/react";
import {getReferencedEntriesFromFields,} from "@root/utils/getReferencedEntriesFromFields.js";
import fetchContentfulData from "@root/utils/fetchContentfulHomepageData.js";

export const loader = async ({params}) => {
    const {slug} = params;
    const {
        entries,
        global,
        blogPosts,
        blogSection,
        bannerSection,
        contactSection,
        serviceSection
    } = await fetchContentfulData()

    const pageData = entries.items.find((entry) => entry.fields.slug === slug)
    if (!pageData || !pageData.fields) {
        throw new Response('Not Found', {status: 404});
    }
    const services = entries.items.filter((entry) => entry.fields.servicePage).map((page) => {
        return {
            title: page.fields.title,
            excerpt: page.fields.servicePageSnippet,
            iconName: page.fields.iconName,
            iconLibrary: page.fields.iconLibrary
        }
    })
    const referencedEntries = await getReferencedEntriesFromFields(pageData?.fields.components)
    return json({
        ...pageData.fields,
        services,
        bannerSection: bannerSection.items[0].fields,
        blogSection: blogSection.items[0].fields,
        globalData: global.items[0].fields,
        blogPosts: blogPosts.items,
        serviceSection: serviceSection.items[0].fields,
        contactSection: contactSection.items[0].fields,
        testimonials: referencedEntries.filter((entry) => entry.sys.contentType.sys.id === 'testimonial'),
        servicePageSection: referencedEntries.filter((entry) => entry.sys.contentType.sys.id === 'service')
    });
};

export const meta = ({data}) => {
    return [
        {title: data.metaTitle},
        {name: "description", content: data.metaDescription},
        {name: "og:image", content: data.metaImage.fields.file.url},
    ];
};

export default function Page() {
    const {
        components,
        globalData,
        testimonials,
        services,
        blogPosts,
        blogSection,
        bannerSection,
        serviceSection,
        contactSection
    } = useLoaderData();
    return (
        <Box>
            {components.map((component, idx) => {
                return (
                    <Box key={`${component.sys.contentType.sys.id}-${idx}`}>
                        {renderComponentSection(
                            component,
                            globalData,
                            testimonials,
                            services,
                            serviceSection,
                            blogPosts,
                            blogSection,
                            bannerSection,
                            contactSection
                        )}
                    </Box>
                )
            })}
        </Box>
    );
}