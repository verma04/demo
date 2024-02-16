import {
    Box,
    Button,
    Container,
    Heading,
    Image,
    Input,
    InputGroup,
    InputLeftElement,
    Stack,
    Text,
    Textarea,
    theme,
} from '@chakra-ui/react'
import {Formik} from "formik";
import {FaUserAlt} from "react-icons/fa";
import {EmailIcon, PhoneIcon} from "@chakra-ui/icons";
import {submitContactForm} from "@root/utils/submitContactForm.js";
import {formatPhone} from "@root/utils/formatPhone.js";
import {LightenDarkenColor} from "@root/utils/lightenDarkenColor.js";

export const ContactForm = ({heading, imgSrc, buttonText, buttonColor}) => (
    <Box bg="bg.surface">
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
                spacing="16"
                direction={{
                    base: 'column',
                    md: 'row',
                }}
                align={{
                    base: 'start',
                    md: 'center',
                }}
            >
                <Stack
                    spacing={{
                        base: '8',
                        md: '10',
                    }}
                    width="full"
                >
                    <Stack
                        spacing={{
                            base: '4',
                            md: '6',
                        }}
                    >
                        <Heading
                            size={{
                                base: 'sm',
                                md: 'lg',
                            }}
                        >
                            {heading}
                        </Heading>
                        <Text
                            fontSize={{
                                base: 'lg',
                                md: 'xl',
                            }}
                            color="fg.muted"
                        >
                            We will write you when we have new components released so you can try them first.
                        </Text>
                    </Stack>
                    <Stack
                        width="full"
                        maxW={'450px'}
                        fontWeight={'normal'}
                    >
                        <Formik
                            initialValues={{
                                name: '',
                                email: '',
                                phoneNumber: '',
                                message: '',
                                "form-name": "contactForm",
                            }}
                            validate={values => {
                                const errors = {};
                                if (!values.phoneNumber) {
                                    errors.phoneNumber = 'Required';
                                } else if (!/^\(\d{3}\) \d{3}-\d{4}$/.test(values.phoneNumber)) {
                                    errors.phoneNumber = 'Invalid phone number format. Expected format: (XXX) XXX-XXXX';
                                }
                                if (!values.email) {
                                    errors.email = 'Required';
                                } else if (
                                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                                ) {
                                    errors.email = 'Invalid email address';
                                }
                                return errors;
                            }}
                            onSubmit={(data, {setSubmitting, resetForm}) => {
                                submitContactForm(data, setSubmitting, resetForm, 'contactForm')
                            }}
                        >
                            {({
                                  values,
                                  errors,
                                  touched,
                                  handleChange,
                                  handleBlur,
                                  handleSubmit,
                                  isSubmitting,
                                  setFieldValue
                                  /* and other goodies */
                              }) => (
                                <form onSubmit={handleSubmit} id="contactForm" data-netlify="true"
                                      name="contactForm" method="POST">
                                    <input type="hidden" name="form-name" value="contactForm"/>
                                    {touched.message && errors.message ? (
                                        <div className="text-danger"
                                             style={{paddingBottom: "5px"}}>{errors.message}</div>
                                    ) : null}
                                    <Stack spacing={'3'} minW={'full'}>
                                        <InputGroup>
                                            <InputLeftElement pointerEvents='none'>
                                                <FaUserAlt style={{
                                                    color: theme.colors.gray['300'],
                                                    position: 'relative',
                                                }}/>
                                            </InputLeftElement>
                                            <Input
                                                style={{paddingLeft: '2.5rem', fontWeight: 'normal'}}
                                                px={2}
                                                type="text"
                                                name="name"
                                                className="form-control"
                                                id="exampleInputText1"
                                                placeholder="Full Name"
                                                required="required"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.name}
                                            />
                                        </InputGroup>

                                        {touched.name && errors.name ? (
                                            <div className="text-danger"
                                                 style={{paddingBottom: "5px", color: "#b00"}}>{errors.name}</div>
                                        ) : null}
                                        <InputGroup>
                                            <InputLeftElement pointerEvents='none'>
                                                <EmailIcon color='gray.300' pos={'relative'}/>
                                            </InputLeftElement>
                                            <Input
                                                style={{paddingLeft: '2.5rem', fontWeight: 'normal'}}
                                                px={2}
                                                type="email"
                                                className="form-control"
                                                id="exampleInputEmail1"
                                                placeholder="Email Address"
                                                name="email"
                                                required="required"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.email}
                                            />
                                        </InputGroup>

                                        {touched.email && errors.email ? (
                                            <div className="text-danger"
                                                 style={{paddingBottom: "5px", color: "#b00"}}>{errors.email}</div>
                                        ) : null}
                                        <InputGroup>
                                            <InputLeftElement pointerEvents='none'>
                                                <PhoneIcon color='gray.300' pos={'relative'}/>
                                            </InputLeftElement>
                                            <Input
                                                style={{paddingLeft: '2.5rem', fontWeight: 'normal'}}
                                                px={2}
                                                type="text"
                                                className="form-control"
                                                placeholder="Phone Number"
                                                name="phoneNumber"
                                                onChange={e => {
                                                    // Custom handler for phone number formatting
                                                    const formattedPhoneNumber = formatPhone(e.target.value);
                                                    setFieldValue('phoneNumber', formattedPhoneNumber);
                                                }}
                                                onBlur={handleBlur}
                                                value={values.phoneNumber}
                                            />
                                        </InputGroup>
                                        <InputGroup>
                                            <Textarea
                                                style={{fontWeight: 'normal'}}
                                                name="message"
                                                placeholder="Question / Message?"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.message}
                                            />
                                        </InputGroup>
                                        {Object.keys(errors).length > 0 && Object.keys(touched).length > 0 && (
                                            <div className="global-error-message text-danger"
                                                 style={{marginTop: '15px', color: "#b00"}}>
                                                Please correct the errors before submitting.
                                            </div>
                                        )}
                                    </Stack>
                                    <Button type="submit" style={{color: "#fff"}} bg={buttonColor.value} _hover={{
                                        bg: `#${LightenDarkenColor(buttonColor.value.replace("#", ''), 40)}`
                                    }}
                                            disabled={isSubmitting} size={'lg'} mt={4} minW={'200px'}>
                                        {buttonText} <i className="fa-solid fa-angles-right"/>
                                    </Button>
                                    <div className="form-status" id="contactFormStatus"/>
                                </form>
                            )}
                        </Formik>
                    </Stack>
                </Stack>
                <Box
                    width="full"
                    height={{
                        base: 'sm',
                        md: 'md',
                    }}
                >
                    <Image
                        boxSize="full"
                        alt="Contact form image"
                        src={imgSrc}
                        objectFit="cover"
                    />
                </Box>
            </Stack>
        </Container>
    </Box>
)
