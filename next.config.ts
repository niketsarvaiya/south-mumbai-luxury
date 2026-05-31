import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "www.lodhagroup.com" },
      { protocol: "https", hostname: "rahejaimperia1.com" },
      { protocol: "https", hostname: "upload.wikimedia.org" },
      { protocol: "https", hostname: "d2j4tkbto6uvqv.cloudfront.net" },
      { protocol: "https", hostname: "d1c8w60cxx92ls.cloudfront.net" },
      { protocol: "https", hostname: "www.palaisroyaleworli.com" },
      { protocol: "https", hostname: "chhabriahousing.in" },
      { protocol: "https", hostname: "ik.imagekit.io" },
    ],
  },
};

export default nextConfig;
