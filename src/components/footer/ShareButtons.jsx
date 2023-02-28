/* eslint-disable import/no-extraneous-dependencies */
import { HStack, Text } from "@chakra-ui/react";
import {
  FacebookShareButton,
  FacebookIcon,
  PinterestShareButton,
  PinterestIcon,
  RedditShareButton,
  RedditIcon,
  WhatsappShareButton,
  WhatsappIcon,
  LinkedinShareButton,
  LinkedinIcon,
  TwitterShareButton,
  TwitterIcon,
  FacebookMessengerShareButton,
  FacebookMessengerIcon,
  EmailShareButton,
  EmailIcon,
} from "next-share";

import Card from "components/card/Card";

export default function ShareButtons() {
  return (
    <Card mt={10}>
      <Text fontSize="xl">Love this article?</Text>
      <Text mb={5}>Share on your favorite social platform</Text>
      <HStack spacing="24px">
        <FacebookShareButton url="https://www.coralplayground.com">
          <FacebookIcon size={32} round />
        </FacebookShareButton>
        <PinterestShareButton url="https://www.coralplayground.com">
          <PinterestIcon size={32} round />
        </PinterestShareButton>
        <RedditShareButton url="https://www.coralplayground.com">
          <RedditIcon size={32} round />
        </RedditShareButton>
        <LinkedinShareButton url="https://www.coralplayground.com">
          <LinkedinIcon size={32} round />
        </LinkedinShareButton>
        <FacebookMessengerShareButton
          url="https://www.coralplayground.com"
          appId=""
        >
          <FacebookMessengerIcon size={32} round />
        </FacebookMessengerShareButton>
        <EmailShareButton
          url="https://www.coralplayground.com"
          subject="Next Share"
          body="body"
        >
          <EmailIcon size={32} round />
        </EmailShareButton>
        <WhatsappShareButton
          url="https://www.coralplayground.com"
          title="next-share is a social share buttons for your next React apps."
          separator=":: "
        >
          <WhatsappIcon size={32} round />
        </WhatsappShareButton>
        <TwitterShareButton
          url="https://www.coralplayground.com"
          title="next-share is a social share buttons for your next React apps."
        >
          <TwitterIcon size={32} round />
        </TwitterShareButton>
      </HStack>
    </Card>
  );
}
