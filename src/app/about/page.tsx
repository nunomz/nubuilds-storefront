import { getAbout } from "@/lib/about";
import { AboutClient } from "@/components/about-client";

export const metadata = {
    title: "About — nubuilds",
    description: "Learn more about nubuilds — premium custom PCs engineered for peak performance.",
};

export default function AboutPage() {
    const about = getAbout();

    return <AboutClient about={about} />;
}
