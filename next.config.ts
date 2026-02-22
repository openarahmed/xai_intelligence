import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    // আপনি যদি বাইরের কোনো লিঙ্ক থেকে ইমেজ ব্যবহার করতে চান, তার পারমিশন এখানে দিতে হয়
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // আপাতত যেকোনো https ডোমেইন অ্যালাউ করা হলো (প্রোডাকশনে নির্দিষ্ট ডোমেইন দেওয়া ভালো)
      },
    ],
    // SVG ইমেজ সিকিউরলি রেন্ডার করার জন্য
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
