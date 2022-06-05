/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable react/prop-types */
// Chakra imports
import {
  Box,
  Button,
  Flex,
  Icon,
  Text,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";
import { SwatchesPicker } from "react-color";
// Assets
import { IoMdTrendingUp } from "react-icons/io";
import {
  useMoralis,
  useMoralisWeb3Api,
  useNewMoralisObject,
} from "react-moralis";
import toImg from "react-svg-to-image";

import { speciesContractAbi, marketplaceContractAbi } from "../../../abi";

export default function ColorPicker(props) {
  // Chakra Color Mode
  const {
    mintPrice,
    setBodyBase,
    setBodyShading,
    setTentacles,
    setTentacleShading,
    setEyeColor,
    setBackgroundColor,
  } = props;
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const shadow = useColorModeValue(
    " 0px 50px 40px -34px rgba(112, 144, 176, 0.16)",
    "unset"
  );
  const borderColor = useColorModeValue("secondaryGray.400", "transparent");
  const cardBg = useColorModeValue("white", "navy.800");
  const [bodyBaseText, setBodyBaseText] = useState("#ffffff"); // default: #71c6c1
  const [bodyShadingText, setBodyShadingText] = useState("#ffffff");
  const [tentaclesText, setTentaclesText] = useState("#ffffff");
  const [tentacleShadingText, setTentacleShadingText] = useState("#ffffff");
  const [eyeColorText, setEyeColorText] = useState("#ffffff");
  const [backgroundColorText, setBackgroundColorText] = useState("#ffffff");
  const [bodyBaseColorPicker, setBodyBaseColorPicker] = useState(false);
  const [bodyShadingColorPicker, setBodyShadingColorPicker] = useState(false);
  const [tentaclesColorPicker, setTentaclesColorPicker] = useState(false);
  const [tentacleShadingColorPicker, setTentacleShadingColorPicker] =
    useState(false);
  const [eyeColorPicker, setEyeColorPicker] = useState(false);
  const [backgroundColorPicker, setBackgroundColorPicker] = useState(false);

  const { user, isAuthenticated, Moralis } = useMoralis();
  const { object, isSaving, error, save } = useNewMoralisObject("DivePhoto");
  const [name, setNFTname] = useState("Agro Octo®");
  const [description, setNFTdescription] = useState("Protecting the oceans");
  const [price, setNFTprice] = useState(100000000000000000); // 0.1 ETH
  const [status, setNFTstatus] = useState("insta_buy");
  const [image, setImage] = useState();
  const [isMintable, setMintable] = useState(false);
  const [isMinting, setMinting] = useState(false);

  const nftContractAddress = "0x29a1d6FFA3d19492ef80B026A987b2E72890B934";
  const marketplaceContractAddress =
    "0x616553097E9531defb0aB1d244c266dffc130f89";

  function svgToImageURI(svg) {
    // example:
    // <svg width='500' height='500' viewBox='0 0 285 350' fill='none' xmlns='http://www.w3.org/2000/svg'><path fill='black' d='M150,0,L75,200,L225,200,Z'></path></svg>
    // data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nNTAwJyBoZWlnaHQ9JzUwMCcgdmlld0JveD0nMCAwIDI4NSAzNTAnIGZpbGw9J25vbmUnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zyc+PHBhdGggZmlsbD0nYmxhY2snIGQ9J00xNTAsMCxMNzUsMjAwLEwyMjUsMjAwLFonPjwvcGF0aD48L3N2Zz4=
    const baseURL = "data:image/svg+xml;base64";
    const s = new XMLSerializer().serializeToString(svg);
    const encodedData = window.btoa(s);
    console.log(encodedData);
    return `${baseURL},${encodedData}`;
  }

  const onChangeColor = () => {
    const octopusSvg = document.getElementById("octopus_svg");
    const octopusSvgURI = svgToImageURI(octopusSvg);
    setImage(octopusSvgURI);
    setMintable(true);
    console.log(octopusSvgURI);
  };

  const popover = {
    position: "absolute",
    zIndex: "2",
  };
  const cover = {
    position: "fixed",
    top: "0px",
    right: "0px",
    bottom: "0px",
    left: "0px",
  };

  const ensureMarketplaceIsApproved = async (tokenId, tokenAddress) => {
    await Moralis.enableWeb3();
    // eslint-disable-next-line prefer-destructuring
    const web3 = Moralis.web3;
    const userAddress = user.get("ethAddress");
    // const marketplaceContract = new web3.eth.Contract(
    //   marketplaceContractAbi,
    //   marketplaceContractAddress
    // );
    const contract = new web3.eth.Contract(speciesContractAbi, tokenAddress);
    const approvedAddress = await contract.methods
      .getApproved(tokenId)
      .call({ from: userAddress });
    if (approvedAddress !== marketplaceContractAddress) {
      await contract.methods
        .approve(marketplaceContractAddress, tokenId)
        .send({ from: userAddress });
    }
  };

  const MintNft = async (metadataUrl) => {
    const web3 = await Moralis.enableWeb3();
    // const web3 = useMoralisWeb3Api();
    // debugger;
    const tokenContract = new web3.eth.Contract(
      speciesContractAbi,
      nftContractAddress
    );

    const colorString = `${bodyBaseText}${bodyShadingText}${tentaclesText}${tentacleShadingText}${eyeColorText}${backgroundColorText}`;

    const receipt = await tokenContract.methods
      .createToken(metadataUrl, colorString)
      .send({ from: user.attributes.ethAddress, value: 100000000000000000 });
    // .then((response) => console.log(response))
    // .catch((err) => AlertBox(err.message));
    console.log(receipt);
    await ensureMarketplaceIsApproved(
      receipt.events.Transfer.returnValues.tokenId,
      nftContractAddress
    ); // Expecting tokenId to represent nftId
    return receipt.events.Transfer.returnValues.tokenId;
  };

  const handleSave = async (e) => {
    setMinting(true);
    if (!user) {
      // navigate("/auth/signin");
      return;
      // Need to add a notification box after navigation
    }

    const svgFile = new Moralis.File("Octopus.svg", {
      base64: image,
    });
    const pngFile = await toImg("#octopus_svg", "octopus", {
      scale: 1,
      // format: 'webp',
      // quality: 0.01,
      download: false,
      // ignore: '.ignored'
    });

    const nftFile = new Moralis.File("Octopus.svg", {
      base64: pngFile,
    });

    await nftFile.saveIPFS();
    const nftFilePath = nftFile.ipfs();
    const nftFileHash = nftFile.hash();

    const metadata = {
      name,
      description,
      image: nftFilePath,
      attributes: [
        {
          trait_type: "Species",
          value: "Octopus",
        },
        {
          trait_type: "Category",
          value: "Mollusk",
        },
        {
          trait_type: "Body Base",
          value: bodyBaseText,
        },
        {
          trait_type: "Body Shading",
          value: bodyShadingText,
        },
        {
          trait_type: "Tentacles Base",
          value: tentaclesText,
        },
        {
          trait_type: "Tentacles Shading",
          value: tentacleShadingText,
        },
        {
          trait_type: "Eyes",
          value: eyeColorText,
        },
        {
          trait_type: "Background",
          value: backgroundColorText,
        },
      ],
    };

    const nftMetadata = new Moralis.File("metadata.json", {
      base64: btoa(JSON.stringify(metadata)),
    });
    await nftMetadata.saveIPFS();
    const nftMetadataFilePath = nftMetadata.ipfs();
    const nftMetadataFileHash = nftMetadata.hash();
    const nftId = await MintNft(nftMetadataFilePath);
    const priceInWei = price.toString();

    try {
      await save({
        user,
        name,
        priceInWei,
        description,
        nftFilePath,
        nftFileHash,
        nftMetadataFilePath,
        nftMetadataFileHash,
        status,
        nftId,
        nftContractAddress,
        nftFile,
      });
    } catch (error2) {
      console.error("Failed to create new Object: ", error2);
    }

    setMinting(false);
    // navigate("../my_collection");
  };

  return (
    <Flex
      direction="column"
      ps={{ base: "unset", lg: "'65px'" }}
      mx="auto"
      maxW={{ base: "100%", md: "max-content" }}
    >
      <Text
        color={textColor}
        fontSize={{ base: "36px", "2xl": "54px" }}
        fontWeight="700"
        // mb="-30px"
        lineHeight="100%"
      >
        {name}
      </Text>
      <Text color="gray.500" fontSize="md" mt={3}>
        {`Select your character's colors. Every character is guaranteed to be unique.`}
      </Text>
      {/* Start Color Picker */}
      <SimpleGrid gap={{ sm: "12px" }} columns={2} mt="25px" mb="40px">
        <Flex direction="column">
          <Flex alignItems="center">
            <Box
              h={{ base: "40px", md: "60px" }}
              w={{ base: "40px", md: "60px" }}
              me="20px"
              borderRadius="50px"
              justify="center"
              align="center"
              border="1px solid"
              borderColor="gray.300"
              bg={bodyBaseText}
              onClick={() => setBodyBaseColorPicker(true)}
            />
            {bodyBaseColorPicker ? (
              <Box style={popover}>
                <Box
                  style={cover}
                  onClick={() => setBodyBaseColorPicker(false)}
                />
                <SwatchesPicker
                  color={bodyBaseText.toUpperCase()}
                  onChangeComplete={(color) => {
                    setBodyBase(color.hex);
                    setBodyBaseText(color.hex);
                    onChangeColor();
                  }}
                />
              </Box>
            ) : null}
            <Box>
              <Text color="secondaryGray.600" fontSize="md" fontWeight="500">
                Body Color
              </Text>
              <Flex align="center">
                <Text color={textColor} fontSize="lg" fontWeight="700" me="5px">
                  {bodyBaseText.toUpperCase()}
                </Text>
              </Flex>
            </Box>
          </Flex>
        </Flex>
        <Flex direction="column">
          <Flex alignItems="center">
            <Box
              h={{ base: "40px", md: "60px" }}
              w={{ base: "40px", md: "60px" }}
              me="20px"
              borderRadius="50px"
              justify="center"
              align="center"
              border="1px solid"
              borderColor="gray.300"
              bg={bodyShadingText}
              onClick={() => setBodyShadingColorPicker(true)}
            />
            {bodyShadingColorPicker ? (
              <Box style={popover}>
                <Box
                  style={cover}
                  onClick={() => setBodyShadingColorPicker(false)}
                />
                <SwatchesPicker
                  color={bodyShadingText}
                  onChangeComplete={(color) => {
                    setBodyShading(color.hex);
                    setBodyShadingText(color.hex);
                    onChangeColor();
                  }}
                />
              </Box>
            ) : null}
            <Box>
              <Text color="secondaryGray.600" fontSize="md" fontWeight="500">
                Body Shading
              </Text>
              <Flex align="center">
                <Text color={textColor} fontSize="lg" fontWeight="700" me="5px">
                  {bodyShadingText.toUpperCase()}
                </Text>
              </Flex>
            </Box>
          </Flex>
        </Flex>
        <Flex direction="column">
          <Flex alignItems="center">
            <Box
              h={{ base: "40px", md: "60px" }}
              w={{ base: "40px", md: "60px" }}
              me="20px"
              borderRadius="50px"
              justify="center"
              align="center"
              border="1px solid"
              borderColor="gray.300"
              bg={tentaclesText}
              onClick={() => setTentaclesColorPicker(true)}
            />
            {tentaclesColorPicker ? (
              <Box style={popover}>
                <Box
                  style={cover}
                  onClick={() => setTentaclesColorPicker(false)}
                />
                <SwatchesPicker
                  align="center"
                  color={tentaclesText}
                  onChangeComplete={(color) => {
                    setTentacles(color.hex);
                    setTentaclesText(color.hex);
                    onChangeColor();
                  }}
                />
              </Box>
            ) : null}
            <Box>
              <Text color="secondaryGray.600" fontSize="md" fontWeight="500">
                Tentacles
              </Text>
              <Flex align="center">
                <Text color={textColor} fontSize="lg" fontWeight="700" me="5px">
                  {tentaclesText.toUpperCase()}
                </Text>
              </Flex>
            </Box>
          </Flex>
        </Flex>
        <Flex direction="column">
          <Flex alignItems="center">
            <Box
              h={{ base: "40px", md: "60px" }}
              w={{ base: "40px", md: "60px" }}
              me="20px"
              borderRadius="50px"
              justify="center"
              align="center"
              border="1px solid"
              borderColor="gray.300"
              bg={tentacleShadingText}
              onClick={() => setTentacleShadingColorPicker(true)}
            />
            {tentacleShadingColorPicker ? (
              <Box style={popover}>
                <Box
                  style={cover}
                  onClick={() => setTentacleShadingColorPicker(false)}
                />
                <SwatchesPicker
                  color={tentacleShadingText}
                  onChangeComplete={(color) => {
                    setTentacleShading(color.hex);
                    setTentacleShadingText(color.hex);
                    onChangeColor();
                  }}
                />
              </Box>
            ) : null}
            <Box>
              <Text color="secondaryGray.600" fontSize="md" fontWeight="500">
                Tentacle Shading
              </Text>
              <Flex align="center">
                <Text color={textColor} fontSize="lg" fontWeight="700" me="5px">
                  {tentacleShadingText.toUpperCase()}
                </Text>
              </Flex>
            </Box>
          </Flex>
        </Flex>
        <Flex direction="column">
          <Flex alignItems="center">
            <Box
              h={{ base: "40px", md: "60px" }}
              w={{ base: "40px", md: "60px" }}
              me="20px"
              borderRadius="50px"
              justify="center"
              align="center"
              border="1px solid"
              borderColor="gray.300"
              bg={eyeColorText}
              onClick={() => setEyeColorPicker(true)}
            />
            {eyeColorPicker ? (
              <Box style={popover}>
                <Box style={cover} onClick={() => setEyeColorPicker(false)} />
                <SwatchesPicker
                  color={eyeColorText}
                  onChangeComplete={(color) => {
                    setEyeColor(color.hex);
                    setEyeColorText(color.hex);
                    onChangeColor();
                  }}
                />
              </Box>
            ) : null}
            <Box>
              <Text color="secondaryGray.600" fontSize="md" fontWeight="500">
                Eye Color
              </Text>
              <Flex align="center">
                <Text color={textColor} fontSize="lg" fontWeight="700" me="5px">
                  {eyeColorText.toUpperCase()}
                </Text>
              </Flex>
            </Box>
          </Flex>
        </Flex>
        <Flex direction="column">
          <Flex alignItems="center">
            <Box
              h={{ base: "40px", md: "60px" }}
              w={{ base: "40px", md: "60px" }}
              me="20px"
              borderRadius="50px"
              justify="center"
              align="center"
              border="1px solid"
              borderColor="gray.300"
              bg={backgroundColorText}
              onClick={() => setBackgroundColorPicker(true)}
            />
            {backgroundColorPicker ? (
              <Box style={popover}>
                <Box
                  style={cover}
                  onClick={() => setBackgroundColorPicker(false)}
                />
                <SwatchesPicker
                  color={backgroundColorText}
                  onChangeComplete={(color) => {
                    setBackgroundColor(color.hex);
                    setBackgroundColorText(color.hex);
                    onChangeColor();
                  }}
                />
              </Box>
            ) : null}
            <Box>
              <Text color="secondaryGray.600" fontSize="md" fontWeight="500">
                Background
              </Text>
              <Flex align="center">
                <Text color={textColor} fontSize="lg" fontWeight="700" me="5px">
                  {backgroundColorText.toUpperCase()}
                </Text>
              </Flex>
            </Box>
          </Flex>
        </Flex>
      </SimpleGrid>
      <Flex
        w="100%"
        align="center"
        p="60px"
        direction="column"
        border="1px solid"
        borderColor={borderColor}
        boxShadow={shadow}
        bg={cardBg}
        borderRadius="30px"
        mb="50px"
      >
        <Text fontWeight="500" color={textColor} fontSize="22px">
          Mint Price
        </Text>
        <Text
          fontWeight="700"
          color={textColor}
          fontSize={{ base: "48px", md: "54px", xl: "64px" }}
          my="10px"
          lineHeight="100%"
        >
          {mintPrice} ETH
        </Text>
        {/* <Flex mb={{ base: "0px", md: "30px" }}>
          <Text
            fontWeight="700"
            color="secondaryGray.600"
            fontSize="24px"
            mb="50px"
          >
            $10.927,84
          </Text>
          <Icon
            ms="6px"
            mt="4px"
            as={IoMdTrendingUp}
            h="24px"
            w="24px"
            color="green.500"
          />
        </Flex> */}

        <Text
          fontSize="xl"
          color={textColor}
          fontWeight="500"
          mb="28px"
          mt="30px"
        >
          Minting begins in
        </Text>
        <Flex w="100%" justify="center">
          <Flex direction="column" align="center" me="60px">
            <Text
              color={textColor}
              fontSize={{ base: "34px", md: "44px" }}
              fontWeight="700"
            >
              -
            </Text>
            <Text color="secondaryGray.600" fontSize="24px" fontWeight="500">
              Hrs
            </Text>
          </Flex>
          <Flex direction="column" align="center" me="60px">
            <Text
              color={textColor}
              fontSize={{ base: "34px", md: "44px" }}
              fontWeight="700"
            >
              --
            </Text>
            <Text color="secondaryGray.600" fontSize="24px" fontWeight="500">
              Mins
            </Text>
          </Flex>
          <Flex direction="column" align="center">
            <Text
              color={textColor}
              fontSize={{ base: "34px", md: "44px" }}
              fontWeight="700"
            >
              --
            </Text>
            <Text color="secondaryGray.600" fontSize="24px" fontWeight="500">
              Secs
            </Text>
          </Flex>
        </Flex>
      </Flex>

      {isAuthenticated && isMintable ? (
        <Button
          variant="brand"
          fontSize="sm"
          fontWeight="500"
          h="46px"
          onClick={handleSave}
          isLoading={isMinting}
        >
          Mint my NFT
        </Button>
      ) : (
        <Button
          variant="brand"
          fontSize="sm"
          fontWeight="500"
          h="46px"
          disabled="true"
        >
          {!isAuthenticated ? "Login " : "Select Colors "}
          to begin
        </Button>
      )}
    </Flex>
  );
}
