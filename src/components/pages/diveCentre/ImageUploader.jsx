/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { AspectRatio, Box, Button, useToast } from "@chakra-ui/react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useState, useRef } from "react";

import AlertPopup from "components/alerts/AlertPopup";
import Card from "components/card/Card";
import * as gtag from "lib/data/gtag";

export default function DiveCentreCover({ diveCentre }) {
  const [uploading, setUploading] = useState(null);
  const toast = useToast();
  const inputRef = useRef(null);
  const supabase = useSupabaseClient();

  async function updateDiveCentre(newCoverPhotoUrl) {
    const { error } = await supabase
      .from("dive_centres")
      .update({
        id: diveCentre.id,
        cover_photo: newCoverPhotoUrl,
        // updated_at: new Date().toISOString(),
      })
      .eq("id", diveCentre.id);
    // Alert & Analytics for successful load
    toast({
      position: "top",
      render: () => (
        <AlertPopup
          type="success"
          text="Cover Photo Updated!"
          subtext={newCoverPhotoUrl}
        />
      ),
    });
    gtag.event({
      action: "update-cover-photo",
      category: "button",
      label: "Dive Centre",
      value: diveCentre.id,
    });
    // Alert & Analytics for failed load
    if (error) {
      toast({
        position: "top",
        render: () => (
          <AlertPopup
            type="danger"
            text="Image Upload Failed!"
            // subtext="View Shopping Cart to complete your order"
          />
        ),
      });
      gtag.event({
        action: "update-profile",
        category: "button",
        label: "DiveCentre",
        // value: newItem.title,
      });
    }
  }

  const uploadCoverPhoto = async (event) => {
    if (!event.target.files || event.target.files.length === 0) {
      throw new Error("You must select an image to upload.");
    }
    const file = event.target.files[0];
    const fileExt = file.name.split(".").pop();
    const fileName = `${diveCentre.slug || diveCentre.id}.${fileExt}`;
    const filePath = `dive-centres/${fileName}`;
    const newCoverPhotoUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/cover-photos/${filePath}`;
    // https://tfpamgcqwydaqamjcxpu.supabase.co/storage/v1/object/sign/avatars/b374e3e9-b7a0-4f07-937a-a7698bf159e1.jpeg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhdmF0YXJzL2IzNzRlM2U5LWI3YTAtNGYwNy05MzdhLWE3Njk4YmYxNTllMS5qcGVnIiwidHJhbnNmb3JtYXRpb25zIjoiIiwiaWF0IjoxNjcyNDY4OTU2LCJleHAiOjE5ODc4Mjg5NTZ9.Z2cbltrf8oRlyqNwHGJEnGwPNjM5m1E6AHL-TyMzUOU

    const { status, error: uploadError } = await supabase.storage
      .from("cover-photos")
      .upload(filePath, file, { upsert: true });

    if (uploadError && status !== 406) {
      throw uploadError;
    }
    updateDiveCentre(newCoverPhotoUrl);
    setUploading(false);
  };

  return (
    <AspectRatio w="100%" maxW="100%" ratio={1130 / 636}>
      <Card
        bgSize="cover"
        w=""
        minH={{ base: "200px", md: "100%" }}
        h="400px"
        bgImage={diveCentre?.cover_photo || "/img/diving/dive_centre_bg.jpg"}
      >
        <Box mt="auto">
          {/* <Button
            variant="no-hover"
            w="max-content"
            backdropFilter="blur(11px)"
            borderRadius="70px"
            fontSize="sm"
            bg="linear-gradient(112.83deg, rgba(255, 255, 255, 0.52) 0%, rgba(255, 255, 255, 0) 110.84%)"
            color="white"
            fontWeight="bold"
          >
            More photos
          </Button> */}
          <Button
            variant="no-hover"
            w="max-content"
            backdropFilter="blur(11px)"
            borderRadius="70px"
            mt="auto"
            fontSize="sm"
            bg="linear-gradient(112.83deg, rgba(0, 0, 0, 0.32) 0%, rgba(255, 255, 255, 0) 110.84%)"
            color="white"
            fontWeight="bold"
            onClick={() => inputRef.current.click()}
          >
            Upload Cover Photo
          </Button>
          <input
            name="coverPhotoUrl"
            style={{
              visibility: "hidden",
              position: "absolute",
            }}
            type="file"
            ref={inputRef}
            accept="image/*"
            onChange={uploadCoverPhoto}
            disabled={uploading}
          />
        </Box>
      </Card>
    </AspectRatio>
  );
}
