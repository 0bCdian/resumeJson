import { JsonResume } from "../../src/Resume/Domain/Entities/JsonResume";

export const exampleUser = {
	id: "123e4567-e89b-12d3-a456-426614174000", // UUID
	maxApiCallsPerMonth: 1000,
	maxTokensPerRequests: 5000,
	currentApiCallCount: 200,
};
const resume = {
	basics: {
		email: "jobs@libdb.so",
		name: "Diego Parra",
		website: "libdb.so",
		phone: "(+34) 665-620606",
		github: "diamondburned",
		linkedin: "linkedin.com/in/xxx",
		location: {
			city: "Fullerton",
			region: "CA",
			countryCode: "US",
		},
	},
	education: [
		{
			institution: "California State University, Fullerton",
			location: "Fullerton, CA",
			studyType: "Bachelor of Science",
			area: "Computer Science",
			startDate: "Aug 2020",
			endDate: "May 2024",
		},
	],
	work: [
		{
			highlights: [
				"Developed a high-performance, parallel, and distributed pipeline using Go and Apache Beam to reconcile massive internal log databases with Certificate Transparency logs.",
				"Improved the security of the certificate issuance pipeline by ensuring the authenticity of certificates issued by Google and preventing missing entries in Certificate Transparency logs.",
				"Achieved exceptional efficiency, with the pipeline processing millions of log entries in under a minute and running at regular intervals for ongoing security assurance.",
			],
			company: "Google",
			position: "Software Engineer Intern",
			location: "Sunnyvale, CA",
			startDate: "May 2023",
			endDate: "August 2023",
		},
		{
			highlights: [
				"Rewrote and modernized a Kubernetes node monitoring tool in Go and integrated it with internal infrastructure and telemetry collector for real-time tracking and performance analysis.",
				"Led the redesign and development, collaborating with the original team to ensure objectives were met.",
				"Achieved more reliable system monitoring with better error handling, consistent status reporting to multiple outputs, and valuable telemetry for internal dashboards, reducing on-call resolution time.",
			],
			company: "Google",
			position: "STEP Intern",
			location: "Seattle, WA",
			startDate: "May 2022",
			endDate: "August 2022",
		},
		{
			highlights: [
				"Restructured and refactored Go codebase for improved maintainability and adherence to style guides.",
				"Designed and implemented an automatic CI/CD pipeline for deploying latest releases to AWS EC2 instances using Nix, enhancing development speed and enabling rapid testing by other teams.",
			],
			company: "ShiHoYa Inc.",
			position: "Backend Developer",
			location: "Remote",
			startDate: "Feb 2019",
			endDate: "Sep 2020",
		},
	],
	skills: [
		{
			keywords: [
				"Go",
				"Bash",
				"JavaScript",
				"TypeScript",
				"Nix",
				"C",
				"C++",
				"Python",
				"Deno",
				"SQL",
				"HTML",
				"CSS",
				"Svelte",
				"Protobuf",
			],
			name: "Languages",
		},
		{
			keywords: [
				"PostgreSQL",
				"SQLite",
				"MariaDB",
				"BadgerDB",
				"Redis",
				"InfluxDB",
				"Google Spanner",
			],
			name: "Databases",
		},
		{
			keywords: [
				"AWS",
				"Cloud-init",
				"GitHub Actions",
				"GitLab CI",
				"Grafana",
				"NixOS",
				"Prometheus",
				"Telegraf",
				"Terraform",
			],
			name: "Cloud/Infra",
		},
	],
	projects: [
		{
			description:
				"A third-party Discord app designed for a smooth experience on desktops, having 1.2k stars on GitHub.",
			keywords: ["Go", "C", "GTK4"],
			name: "Dissent",
			website: "github.com/diamondburned/dissent",
		},
		{
			keywords: ["Terraform", "Linux", "NixOS", "Libvirt", "CI/CD"],
			name: "ACM at CSUF Servers",
			description:
				"Infrastructure-as-code for ACM at CSUF with automatic deployment that vastly improved development speed.",
			website: "github.com/acmcsufoss/acm-server",
		},
		{
			keywords: ["Python", "FastAPI", "OpenAPI", "Flutter"],
			name: "Layover Party",
			website: "layover.party",
			description:
				"Full-stack web/mobile application to match people with long layover flights, won LAHacks 2023.",
		},
	],
	leadership: [
		{
			company: "Association for Computing Machinery at CSUF",
			position: "Dev Team Lead",
			startDate: "August 2023",
			endDate: "June 2024",
		},
		{
			company: "Intercollegiate Programming Competition (ICPC)",
			position: "Team Lead",
			startDate: "October 2023",
		},
	],
	awards: [
		{
			summary:
				"Won the Travel category with Layover Party: a mobile app to match people with long layover flights for partying and cheaper flights.",
			title: "Travel Category Winner",
			awarder: "LA Hacks",
			date: "April 2023",
		},
	],
	languages: [
		{ language: "English", fluency: "Fluent" },
		{ language: "Vietnamese", fluency: "Native" },
	],
	sections: [
		"templates",
		"profile",
		"education",
		"work",
		"leadership",
		"projects",
		"skills",
		"awards",
	],
};

export const stubResume = new JsonResume(exampleUser.id, resume);
