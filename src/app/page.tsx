import Image from "next/image";
import Hero from "./components/Sections/Hero";
import InsightFlow from "./components/Sections/InsightFlow";
import DashboardPreview from "./components/Sections/Dashboard";
import SignatureInteraction from "./components/Sections/SignatureInteraction";

export default function Home() {
  return (
    <div className="">
      <Hero></Hero>
      <InsightFlow></InsightFlow>
      <DashboardPreview></DashboardPreview>
      <SignatureInteraction></SignatureInteraction>
    </div>
  );
}
