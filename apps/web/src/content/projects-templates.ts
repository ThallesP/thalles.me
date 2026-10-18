export type RailwayTemplate = {
	code: string;
	name: string;
	description: string;
	logoSrc: string;
};

export const railwayTemplates: RailwayTemplate[] = [
	{
		code: "MRazvG",
		name: "n8n",
		description:
			"Workflow automation on PostgreSQL, webhooks and secrets set up",
		logoSrc: "/projects/templates/n8n.svg",
	},
	{
		code: "BLEtpx",
		name: "Minecraft Server",
		description: "Paper server with a web console, file browser and volume",
		logoSrc: "/projects/templates/minecraft.webp",
	},
	{
		code: "jOiNFt",
		name: "SQLite",
		description: "SQLite on a persistent volume with the sqlite-web UI",
		logoSrc: "/projects/templates/sqlite.svg",
	},
	{
		code: "AMx6AD",
		name: "GlitchTip",
		description: "Sentry-compatible error tracking with PostgreSQL and Redis",
		logoSrc: "/projects/templates/glitchtip.png",
	},
	{
		code: "tRFTHR",
		name: "Turborepo Remote Cache",
		description: "Self-hosted cache with a generated token and a volume",
		logoSrc: "/projects/templates/turborepo.svg",
	},
	{
		code: "zsaPAU",
		name: "ASP.NET Minimal API",
		description: "ASP.NET Core minimal API on .NET 9 with a Dockerfile build",
		logoSrc: "/projects/templates/csharp.svg",
	},
	{
		code: "probo",
		name: "Probo",
		description: "Open source compliance for SOC 2, ISO 27001, HIPAA and GDPR",
		logoSrc: "/projects/templates/probo.png",
	},
	{
		code: "clickstack",
		name: "ClickStack",
		description: "HyperDX on ClickHouse for logs, traces and metrics",
		logoSrc: "/projects/templates/clickhouse.svg",
	},
	{
		code: "tFqAVW",
		name: "Interval",
		description:
			"Self-hosted Interval Server for internal tools, with PostgreSQL and MinIO",
		logoSrc: "/projects/templates/interval.svg",
	},
	{
		code: "comentario",
		name: "Comentario",
		description:
			"Privacy-first blog comments, a Disqus alternative, on PostgreSQL",
		logoSrc: "/projects/templates/comentario.png",
	},
	{
		code: "microsoftsql-server-mssql",
		name: "Microsoft SQL Server",
		description:
			"SQL Server 2025, 2022 or 2019 on a volume, edition set at deploy",
		logoSrc: "/projects/templates/microsoft-sql-server.svg",
	},
	{
		code: "postgresql-18",
		name: "PostgreSQL 18",
		description: "SSL on, a persistent volume and a public TCP proxy URL",
		logoSrc: "/projects/templates/postgresql.svg",
	},
	{
		code: "dispatcher",
		name: "Dispatcher",
		description:
			"Earnings, deploys and health dashboard for your Railway templates",
		logoSrc: "/projects/templates/dispatcher.svg",
	},
];
