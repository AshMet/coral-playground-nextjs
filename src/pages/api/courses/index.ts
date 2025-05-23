/* eslint-disable sonarjs/no-duplicate-string */
import type { NextApiRequest, NextApiResponse } from "next";

const equipment = (req: NextApiRequest, res: NextApiResponse) => {
  res.statusCode = 200;
  res.json([
    {
      id: 1,
      title: "Discover Scuba Diving",
      imageUrl: "/svg/certifications/open_water_cert.svg",
      desc: "Have you always wondered what it's like to breathe underwater? If you want to try scuba diving, but aren't quite ready to take the plunge into a certification course, Discover Scuba Diving is for you. A quick and easy introduction into what it takes to explore the underwater world. Although this is not a scuba certification course, you'll learn all the steps it takes to be a PADI certified diver.",
      agency: "PADI®",
      duration: "3-4 days",
      price: "$150",
      priceId: "price_1KuKzvAvLPvC9h7xv48NXNwx",
      category: "recreational",
    },
    {
      id: 2,
      title: "Open Water Diver",
      imageUrl: "/svg/certifications/open_water_cert.svg",
      desc: "This is the first scuba certification level. A highly-trained PADI Instructor will teach you how to scuba dive in a relaxed, supportive learning environment. By the end of the course, you'll have the skills and knowledge to dive at home or abroad and be an ambassador for the underwater world.",
      agency: "PADI®",
      duration: "3-4 days",
      price: "$300",
      priceId: "price_1Ku8SWAvLPvC9h7xzfnsF4fi",
      category: "recreational",
    },
    {
      id: 3,
      title: "Advanced Open Water Diver",
      imageUrl: "/svg/certifications/advanced_diver_cert.svg",
      desc: "You'll practice navigation and buoyancy, try deep diving and make three specialty dives of your choosing (it's like a specialty sampler platter). For every specialty dive you complete, you can earn credit toward PADI® specialty certifications. Here are a few of the many options: Deep, Digital Underwater Photography, Dive Against Debris, Dry Suit, Enriched Air Nitrox, Fish Identification, Night, Peak Performance Buoyancy, Search & Recovery, Underwater Naturalist, Underwater Navigation, and Wreck Diver.",
      agency: "PADI®",
      duration: "3-4 days",
      price: "$260",
      priceId: "price_1KuL2sAvLPvC9h7xhpASS4NB",
      category: "recreational",
    },
    {
      id: 4,
      title: "Master Scuba Diver",
      imageUrl: "/svg/certifications/advanced_diver_cert.svg",
      desc: "Join the best of the best in recreational scuba diving and live the dive life as a PADI Master Scuba Diver. The Master Scuba Diver rating places you in an elite group of respected divers who have earned this rating through both significant experience and scuba training. Fewer than two percent of divers ever achieve this rating. When you flash your Master Scuba Diver card, people know that you've spent time underwater in a variety of environments and had your share of dive adventures.",
      agency: "PADI®",
      duration: "3-4 days",
      price: "$900",
      priceId: "price_1KuL5bAvLPvC9h7xGzAUvk7Y",
      category: "professional",
    },
    {
      id: 5,
      title: "Nitrox Diver",
      imageUrl: "/svg/certifications/advanced_diver_cert.svg",
      desc: "Enriched air, also known as nitrox or EANx, contains less nitrogen than regular air. Breathing less nitrogen means you can enjoy longer dives and shorter surface intervals. No wonder Enriched Air Diver is the most popular PADI® specialty.",
      agency: "PADI®",
      duration: "3-4 days",
      price: "$120",
      priceId: "price_1KuL8pAvLPvC9h7x68kesoC4",
      category: "professional",
    },
    {
      id: 6,
      title: "Rescue Diver",
      imageUrl: "/svg/certifications/advanced_diver_cert.svg",
      desc: "The PADI® Rescue Diver course will change the way you dive – in the best possible way. Learn to identify and fix minor issues before they become big problems, gain a lot of confidence and have serious fun along the way. Discover why countless divers say Rescue Diver is their favorite scuba course.",
      agency: "PADI®",
      duration: "3-4 days",
      price: "$160",
      priceId: "price_1KuL7SAvLPvC9h7xvvM2KS3r",
      category: "rescue",
    },
  ]);
};

export default equipment;
