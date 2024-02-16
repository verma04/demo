import {Button, Drawer, DrawerBody, DrawerContent, Show, Stack, useDisclosure} from '@chakra-ui/react'
import {DocumentCollapse} from './DocumentCollapse'
import {ToggleButton} from './ToggleButton'
import {getNavPath} from "@root/utils/getNavPath.js";

export const MobileDrawer = ({navigation}) => {
    const {isOpen, onToggle, onClose} = useDisclosure()
    return (
        <Show below={'lg'}>
            <ToggleButton
                isOpen={isOpen}
                onClick={onToggle}
                aria-label="Open menu"
                display='inline-flex'
            />
            <Drawer placement="top" isOpen={isOpen} onClose={onClose}>
                <DrawerContent>
                    <DrawerBody mt="72px" p="4">
                        <Stack spacing="1">
                            {/* eslint-disable-next-line react/prop-types */}
                            {navigation.map((navItem) => {
                                if (navItem.fields.hideFromTopNav) {
                                    return null
                                }
                                if (navItem.fields.children) {
                                    return (
                                        <DocumentCollapse items={navItem.fields.children} title={navItem.fields.title} key={navItem.fields.page.fields.slug}/>
                                    )
                                }
                                return (
                                    <Button size="lg" variant="tertiary" justifyContent="start" as={'a'} key={navItem.fields.title}
                                            href={getNavPath(navItem.fields.page.fields.slug)}>{navItem.fields.title}</Button>
                                )
                            })}

                        </Stack>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </Show>
    )
}
