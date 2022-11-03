// Chakra imports
import { Button, FormControl, Icon, Link, SimpleGrid } from "@chakra-ui/react";
import { MdChevronRight } from "react-icons/md";

import Card from "components/card/Card";
import InputField from "components/fields/InputField";
import TextField from "components/fields/TextField";

export default function Information(props) {
  const { ...rest } = props;
  // Chakra Color Mode
  return (
    <FormControl>
      <Card mb="20px" w={{ sm: "450px", md: "650px", xl: "850px" }} {...rest}>
        <SimpleGrid
          columns={{ sm: 1, md: 2 }}
          spacing={{ base: "20px", xl: "20px" }}
          pt="20px"
        >
          <InputField
            mb="20px"
            me="30px"
            id="first_name"
            label="First Name"
            placeholder="John"
          />
          <InputField
            mb="20px"
            id="last_name"
            label="Last Name"
            placeholder="William"
          />
        </SimpleGrid>
        <InputField
          mb="30px"
          id="email"
          label="Email Address"
          placeholder="mail@coralplayground.com"
        />
        <TextField
          id="message"
          label="Message"
          h="100px"
          placeholder="Let us know how we can help you"
        />
        <Link href="/">
          <Button
            py="20px"
            px="16px"
            fontSize="sm"
            variant="brand"
            borderRadius="12px"
            me={{ base: "0px", md: "20px" }}
            mb={{ base: "20px", md: "0px" }}
            w={{ base: "335px", md: "210px" }}
            h="54px"
          >
            Submit
            <Icon as={MdChevronRight} ms="5px" mt="2px" h="16px" w="16px" />
          </Button>
        </Link>
      </Card>
    </FormControl>
  );
}
