import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";
import { Type } from "typebox";

export default function webFetch(pi: ExtensionAPI): void {
	pi.registerTool({
		name: "web_fetch",
		label: "web_fetch",
		description: "Fetch a URL and return its text. Use for the full page behind a search result.",
		parameters: Type.Object({
			url: Type.String({ description: "http(s) URL to fetch" }),
		}),
		async execute(_id, params) {
			const res = await fetch(params.url, { redirect: "follow" });
			const text = (await res.text()).slice(0, 20_000);
			return {
				content: [{ type: "text", text: `HTTP ${res.status}\n\n${text}` }],
				details: { status: res.status },
			};
		},
	});
}
