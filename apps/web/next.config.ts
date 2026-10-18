import { varlockNextConfigPlugin } from "@varlock/nextjs-integration/plugin";
import type { NextConfig } from "next";

const withVarlock = varlockNextConfigPlugin();

const nextConfig: NextConfig = {
	typedRoutes: true,
	reactCompiler: true,
	cacheComponents: true,
	partialPrefetching: true,
	images: {
		remotePatterns: [
			{ protocol: "https", hostname: "avatars.githubusercontent.com" },
			{ protocol: "https", hostname: "*.mzstatic.com" },
			{ protocol: "https", hostname: "lastfm.freetls.fastly.net" },
		],
	},
};

export default withVarlock(nextConfig);
