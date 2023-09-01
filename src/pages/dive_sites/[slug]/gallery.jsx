/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
import { useState, useCallback } from "react";
import Carousel, { Modal, ModalGateway } from "react-images";
import Gallery from "react-photo-gallery";

const photos = [
  {
    src: "/img/liveaboards/boat_interior1.webp",
    width: 4,
    height: 3,
  },
  {
    src: "/img/liveaboards/boat_interior2.webp",
    width: 4,
    height: 3,
  },
  {
    src: "/img/liveaboards/boat_interior3.webp",
    width: 4,
    height: 3,
  },
  {
    src: "/img/liveaboards/boat_interior4.webp",
    width: 4,
    height: 3,
  },
  {
    src: "/img/liveaboards/boat_interior5.webp",
    width: 4,
    height: 3,
  },
  {
    src: "/img/liveaboards/boat_interior6.webp",
    width: 4,
    height: 3,
  },
];

export default function SiteGallery() {
  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);

  const openLightbox = useCallback((event, { photo, index }) => {
    setCurrentImage(index);
    setViewerIsOpen(true);
  }, []);

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };

  return (
    <div>
      <Gallery photos={photos} onClick={openLightbox} />
      <ModalGateway>
        {viewerIsOpen ? (
          <Modal onClose={closeLightbox}>
            <Carousel
              currentIndex={currentImage}
              views={photos.map((x) => ({
                ...x,
                srcset: x.srcSet,
                caption: x.title,
              }))}
            />
          </Modal>
        ) : null}
      </ModalGateway>
    </div>
  );
}
