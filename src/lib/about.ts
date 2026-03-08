import fs from "fs";
import path from "path";
import type { LocalizedString } from "./i18n";

export interface AboutData {
    title: LocalizedString;
    paragraphs: LocalizedString[];
    image: string;
    stats: { value: string; label: LocalizedString }[];
}

const ABOUT_DIR = path.join(process.cwd(), "public", "about");

/**
 * Read the about page data from public/about/about.json.
 * The image path is resolved relative to /about/.
 */
export function getAbout(): AboutData {
    const jsonPath = path.join(ABOUT_DIR, "about.json");
    const raw = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));

    return {
        title: raw.title ?? "About",
        paragraphs: Array.isArray(raw.paragraphs) ? raw.paragraphs : [],
        image: raw.image ? `/about/${raw.image}` : "/images/hero/background.jpeg",
        stats: Array.isArray(raw.stats) ? raw.stats : [],
    };
}
