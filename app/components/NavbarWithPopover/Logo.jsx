import {Image, Link} from "@chakra-ui/react";

export const Logo = ({logo}) => (
    <Link href="/"><Image src={logo} alt="logo" width={'120px'} minW={'120px'}/></Link>
)
