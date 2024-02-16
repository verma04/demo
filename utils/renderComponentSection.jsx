import {Hero} from "~/components/Hero/Hero.jsx";
import {TestimonialSection} from "~/components/TestimonialSection/TestimonialSection.jsx";
import {BlogSection} from "~/components/BlogSection/BlogSection.jsx";
import {CallToAction} from "~/components/CallToAction/CallToAction.jsx";
import {ContactForm} from "~/components/ContactForm/ContactForm.jsx";
import {RichTextSection} from "@components/RichTextSection/RichTextSection.jsx";
import {ServiceSection} from "@components/ServiceSection/ServiceSection.jsx";

export const renderComponentSection = (
    component,
    globalData,
    testimonials,
    services,
    serviceSection,
    blogPosts,
    blogSection,
    bannerSection,
    contactSection,
    WEBSITE
) => {
    const sectionType = component.sys.contentType.sys.id
    const {fields} = component;
    switch (sectionType) {
        case 'headerSection':
            return <Hero header={fields.heading} subtitle={fields.subHeader} colorOverlay={fields.colorOverlay.value}
                         buttonBg={fields.buttonBackgroundColor.value} buttonTextColor={fields.buttonTextColor.value}
                         imgSrc={fields.backgroundImage.fields.file.url} overlayOpacity={fields.overlayOpacity}
                         isH1={fields.h1} phoneNumber={globalData.phoneNumber}/>
        case 'contactSection':
            return <ContactForm imgSrc={contactSection.imgSrc.fields.file.url} heading={contactSection.heading}
                                subtitle={contactSection.subtitle} buttonText={contactSection.buttonText}
                                buttonColor={globalData.brandColor}/>
        case 'bannerSection':
            return <CallToAction title={bannerSection.bannerText} subtitle={bannerSection.subtitle}
                                 phoneNumber={globalData.phoneNumber}
                                 buttonText={bannerSection.bannerCta} imgSrc={bannerSection.imgSrc.fields.file.url}
                                 bgColor={bannerSection.backgroundColor.value}
                                 fontColorLight={bannerSection.fontColorLight}/>
        case 'serviceSection':
            return <ServiceSection preHeading={fields.preHeading} title={fields.title} subtitle={fields.subtitle}
                                   services={services} brandColor={globalData.brandColor} website={WEBSITE} backgroundColor={fields.backgroundColor}/>
        case 'blogSection':
            return <BlogSection posts={blogPosts} preheader={blogSection.preHeading} title={blogSection.heading}
                                subtitle={blogSection.description} cta={blogSection.cta}
                                brandColor={globalData.brandColor}/>
        case 'testimonialSection':
            return <TestimonialSection heading={fields.heading} subtitle={fields.subtitle} testimonials={testimonials}/>
        case 'richTextSection':
            return <RichTextSection richTextDocument={fields.content} website={WEBSITE}/>
        default:
            break;
    }
}