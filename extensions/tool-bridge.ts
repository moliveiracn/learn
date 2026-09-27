import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";
import { existsSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const WEB_FETCH = fileURLToPath(new URL("./web-fetch.ts", import.meta.url));
const WEB_SEARCH = join(homedir(), ".pi/agent/npm/node_modules/pi-web-access/dist/index.js");

export default function toolBridge(pi: ExtensionAPI): void {
	const register = () => {
		const api = (globalThis as { __pi_interactive_subagents?: { registerToolExtension?: (name: string, path: string) => void } }).__pi_interactive_subagents;
		const add = api?.registerToolExtension;
		if (!add) return;
		if (existsSync(WEB_SEARCH)) add("web_search", WEB_SEARCH);
		add("web_fetch", WEB_FETCH);
	};
	pi.on("session_start", register);
}
