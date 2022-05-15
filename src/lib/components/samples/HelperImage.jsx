import { Box, Tooltip } from "@chakra-ui/react";
import Image from "next/image";

// type HelperImageProps = {
//   label?: string;
//   src: string;
// };

// const HelperImage = ({ label, src }: HelperImageProps) => {
const HelperImage = (props) => {
  return (
    <Tooltip hasArrow aria-label={props.label} label={props.label} placement="auto-end">
      <Box marginX={2}>
        <Image src={props.src} alt={props.label} title={props.label} height={33} width={33} />
      </Box>
    </Tooltip>
  );
};

HelperImage.defaultProps = {
  label: "",
};

export default HelperImage;
