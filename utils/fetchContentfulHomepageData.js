import client from "./contentfulClient.js";

async function fetchContentfulData() {
    const contentTypes = [
        {content_type: 'page'},
        {content_type: 'globalData'},
        {content_type: 'blogPost', 'fields.website': 'https://www.sprayfoaminsulationwestminster.com/'},
        {content_type: 'blogSection'},
        {content_type: 'bannerSection'},
        {content_type: 'contactSection'},
        {content_type: 'serviceSection'},
    ];

    const requests = contentTypes.map((params) => client.getEntries(params));

    try {
        const [
            entries,
            global,
            blogPosts,
            blogSection,
            bannerSection,
            contactSection,
            serviceSection
        ] = await Promise.all(requests);
        return {
            entries,
            global,
            blogPosts,
            blogSection,
            bannerSection,
            contactSection,
            serviceSection
        };
    } catch (error) {
        console.error("Failed to fetch data from Contentful:", error);
        throw error; // or handle error as needed
    }
}

export default fetchContentfulData