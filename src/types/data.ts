import type { StaticImageData } from "next/image";

import type { ReactNode } from "react";

export type AboutSentence = {
	type: "text" | "emoji";
	content: string;
	className?: string;
}[];

export interface Data {
	header: string;
	about: AboutSentence[];
	interests: {
		title: ReactNode;
		description: string;
		interests: string[];
	};
	articles: {
		title: string;
		description: string;
		hashnodeHostname: string;
	};
	projects: {
		title: string;
		projects: {
			title: string;
			description: string;
			image: StaticImageData | string;
			coverImage: StaticImageData | string;
			backgroundColor: string;
			color: string;
			liveLink?: string;
			githubLink?: string;
			videoDemo?: string;
			demoVideo?: string;
			deckLink?: string;
			litepaperLink?: string;
			xLink?: string;
		}[];
	};
	resume: {
		description: string;
		name: string;
		position: string;
		downloadLink: string;
		email: string;
		website: string;
	};
	contact: {
		links: {
			title: string;
			link: string;
		}[];
	};
}
