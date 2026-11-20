// The approved Figma copy and photos. Used two ways:
//  1. studio/scripts/import-defaults.ts seeds Sanity with it, once.
//  2. The site falls back to it for any field that's empty in Sanity, so a half-filled
//     document never leaves a hole in the page.
import type { SiteContent } from "./types";

export const defaults: SiteContent = {
  business: {
    name: "Red Clay Crawlspace Repair",
    phone: "(336) 403-7093",
    city: "Pfafftown",
    region: "NC",
    ownedIn: "Stokes County",
    seoTitle: "Crawlspace Repair in Stokes, Surry, Forsyth & Yadkin, NC",
    seoDescription:
      "Stokes County owned crawlspace repair: encapsulation, footings, drainage, sump pumps and framing in Stokes, Surry, Forsyth & Yadkin, NC. Free inspections.",
    counties: ["Stokes", "Surry", "Forsyth", "Yadkin"],
    utilityText: "Stokes County owned & operated  ·  Serving Stokes, Surry, Forsyth & Yadkin counties",
    footerTagline: "Built on Solid Ground.",
    footerBlurb:
      "Stokes County owned & operated. Crawlspace and basement moisture solutions for Stokes, Surry, Forsyth & Yadkin counties.",
    facebookUrl: "https://www.facebook.com/profile.php?id=61584487661159",
  },
  hero: {
    eyebrow: "Crawlspace & Basement Moisture Solutions",
    headline: "Protecting Homes from the Ground Up.",
    intro:
      "National chains may work here. We’re from here. Red Clay is built on Carolina soil, rooted in hard work and driven by integrity — fixing wet crawlspaces, failing footings and sagging floors across Stokes, Surry, Forsyth & Yadkin.",
    introShort:
      "National chains may work here. We’re from here. Built on Carolina soil, rooted in hard work, driven by integrity.",
    checks: ["Free inspections", "Honest answers, no upsells", "Stokes County owned"],
    photo: { src: "/images/hero.jpg", alt: "New footing being poured in a crawlspace" },
  },
  problemTiles: [
    { title: "Water or moisture", detail: "Musty smell, damp air, puddles", service: "Water or moisture" },
    { title: "Sagging floors", detail: "Soft, bouncy or uneven spots", service: "Sagging floors" },
    { title: "Foundation cracks", detail: "Block, brick or footing damage", service: "Foundation cracks" },
    { title: "Something else", detail: "Sump pumps, drainage, vents & more", service: "Something else" },
  ],
  warningSigns: [
    {
      title: "Musty odors or high humidity",
      detail: "Damp air and mold below the floor show up as smells and stickiness upstairs.",
    },
    {
      title: "Standing water or damp soil",
      detail: "Poor drainage lets water pool under the house after every rain.",
    },
    {
      title: "Soft, sagging or uneven floors",
      detail: "Bouncy or uneven floors point to moisture-damaged joists or supports.",
    },
    {
      title: "Rotting wood or damaged framing",
      detail: "Constant moisture breaks down sills, joists and beams over time.",
    },
  ],
  services: [
    {
      id: "encapsulation",
      title: "Vapor Barriers & Encapsulation",
      summary:
        "Heavy-duty vapor barrier, sealed vents and walls, and dehumidification to stop moisture and musty odors at the source.",
      summaryShort: "Vapor barrier, sealed vents and dehumidification.",
      photo: { src: "/images/encap.jpg", alt: "Encapsulated crawlspace with white vapor barrier on floor and walls" },
    },
    {
      id: "footings",
      title: "Footing & Foundation Repair",
      summary: "New reinforced footings and block foundation walls that put your home back on solid ground.",
      summaryShort: "New reinforced footings and foundation walls.",
      photo: { src: "/images/footing.jpg", alt: "New concrete footing with block piers along a crawlspace wall" },
    },
    {
      id: "water-mitigation",
      title: "Interior & Exterior Water Mitigation",
      summary: "French drains, grading and interior drainage that move water away from your home for good.",
      summaryShort: "Drains and grading that move water away.",
      photo: { src: "/images/drain.jpg", alt: "Drain pipe laid along a brick foundation" },
    },
    {
      id: "framing",
      title: "Framing Repairs",
      summary: "Sistered and replaced joists, sills and beams to fix rot and sagging, bouncy floors.",
      summaryShort: "Joists, sills and beams for sagging floors.",
      photo: { src: "/images/joists.jpg", alt: "New floor joists installed over a crawlspace" },
    },
    {
      id: "masonry",
      title: "Masonry Repairs",
      summary: "Brick and block wall repair and rebuilds, done by hand and done right.",
      summaryShort: "Brick and block walls, built by hand.",
      photo: { src: "/images/block.jpg", alt: "Brick being laid over a new block foundation wall" },
    },
    {
      id: "sump-pumps",
      title: "Basement Water Intrusion",
      summary: "Sump pumps and drainage systems that keep groundwater out of basements and crawlspaces.",
      summaryShort: "Sump systems that keep groundwater out.",
      photo: { src: "/images/sump.jpg", alt: "Sump pump basin set in gravel beside a block wall" },
    },
  ],
  beforeAfter: {
    heading: "Solid Foundations, Built by Hand",
    intro: "Failing foundation walls rebuilt course by course in new block, then finished in brick to match the house.",
    before: { src: "/images/before.jpg", alt: "Foundation wall mid-rebuild in new concrete block" },
    after: { src: "/images/after.jpg", alt: "Finished foundation wall faced in red brick" },
  },
  steps: [
    {
      title: "Free Inspection",
      detail: "We crawl under, take photos and show you exactly what we find. No pressure.",
      detailShort: "We crawl under, take photos and show you exactly what we find.",
    },
    {
      title: "Clear Written Plan",
      detail: "You get a written quote with the options, the price and the timeline up front.",
      detailShort: "A written quote with options, price and timeline up front.",
    },
    {
      title: "Done Right",
      detail: "Our own crew does the work, keeps the site clean and keeps you posted.",
      detailShort: "Our own crew does the work and keeps you posted.",
    },
    {
      title: "Final Walkthrough",
      detail: "We walk the finished job with you and stand behind what we build.",
      detailShort: "We walk the finished job with you and stand behind it.",
    },
  ],
  gallery: [
    { src: "/images/g6.jpg", alt: "Fresh footing pour with rebar in a dug-out crawlspace" },
    { src: "/images/g1.jpg", alt: "Finished crawlspace encapsulation" },
    { src: "/images/g2.jpg", alt: "Gravel base laid inside block foundation walls" },
    { src: "/images/g3.jpg", alt: "Rebar grid set for a new footing" },
    { src: "/images/g4.jpg", alt: "New block walls built under ductwork in a crawlspace" },
  ],
  galleryTags: "Encapsulation · Footings · Block walls · Sump pumps · Drainage · Floor joists",
  about: {
    heading: "Built From Carolina Soil. Backed by Carolina Values.",
    body: "We don’t just work in North Carolina — we’re built from it. The same red clay that runs under your home runs in our blood. This is where we were raised, and where we learned the value of hard work, a straight handshake, and doing the job right the first time.",
    values: [
      "Showing up when we say we will",
      "Telling you the truth, even when it costs us",
      "Fixing the real problem, not just the symptom",
      "Standing behind our work long after the job is done",
    ],
    photo: { src: "/images/about.jpg", alt: "New block walls and footings in a crawlspace" },
  },
  reviews: [
    {
      quote: "I couldn’t be happier with the work this company did for our family!",
      source: "Facebook review",
      detail: "Basement sump pump system, installed in one day",
    },
  ],
};

/** Options for "What do you need help with?" in the lead form. */
export const serviceOptions = (content: SiteContent) => [
  ...content.problemTiles.filter((t) => t.service !== "Something else").map((t) => t.service),
  ...content.services.map((s) => s.title),
  "Something else",
];
