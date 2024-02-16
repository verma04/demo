import {Button, Collapse, Stack, Text, useDisclosure} from '@chakra-ui/react'
import {PopoverIcon} from './PopoverIcon'

export const DocumentCollapse = ({items, title}) => {
    const {isOpen, onToggle} = useDisclosure()
    return (
        <>
            <Button justifyContent="space-between" variant="tertiary" size="lg" onClick={onToggle}>
                <Text as="span">{title}</Text>
                <PopoverIcon isOpen={isOpen}/>
            </Button>
            <Collapse in={isOpen} animateOpacity>
                <Stack spacing="1" alignItems="stretch" ps="4">
                    {/* eslint-disable-next-line react/prop-types */}
                    {items.map(({name, path}) => (
                        <Button as={'a'} href={path} key={name} size="lg" variant="tertiary" justifyContent="start">
                            {name}
                        </Button>
                    ))}
                </Stack>
            </Collapse>
        </>
    )
}
