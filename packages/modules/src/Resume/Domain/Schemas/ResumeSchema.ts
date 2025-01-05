import { z } from "zod";

// ISO8601 Date with partial specification (year, year-month, or full date)
const Iso8601 = z.string().regex(/^(\d{4})(-\d{2})?(-\d{2})?$/);

// Resume schema in Zod
export const ResumeSchema = z
	.object({
		$schema: z.string().optional(),
		basics: z
			.object({
				name: z.string().optional(),
				label: z.string().optional(),
				image: z.string().url().optional(),
				email: z.string().email().optional(),
				github: z.string().url().optional(),
				phone: z.string().optional(),
				url: z.string().url().optional(),
				summary: z.string().optional(),
				location: z
					.object({
						address: z.string().optional(),
						postalCode: z.string().optional(),
						city: z.string().optional(),
						countryCode: z.string().optional(),
						region: z.string().optional(),
					})
					.optional(),
				profiles: z
					.array(
						z.object({
							network: z.string().optional(),
							username: z.string().optional(),
							url: z.string().url().optional(),
						}),
					)
					.optional(),
			})
			.optional(),
		work: z
			.array(
				z.object({
					name: z.string().optional(),
					location: z.string().optional(),
					description: z.string().optional(),
					position: z.string().optional(),
					url: z.string().url().optional(),
					startDate: Iso8601.optional(),
					endDate: Iso8601.optional(),
					summary: z.string().optional(),
					highlights: z.array(z.string()).optional(),
				}),
			)
			.optional(),
		volunteer: z
			.array(
				z.object({
					organization: z.string().optional(),
					position: z.string().optional(),
					url: z.string().url().optional(),
					startDate: Iso8601.optional(),
					endDate: Iso8601.optional(),
					summary: z.string().optional(),
					highlights: z.array(z.string()).optional(),
				}),
			)
			.optional(),
		education: z
			.array(
				z.object({
					institution: z.string().optional(),
					url: z.string().url().optional(),
					area: z.string().optional(),
					studyType: z.string().optional(),
					startDate: Iso8601.optional(),
					endDate: Iso8601.optional(),
					score: z.string().optional(),
					courses: z.array(z.string()).optional(),
				}),
			)
			.optional(),
		awards: z
			.array(
				z.object({
					title: z.string().optional(),
					date: Iso8601.optional(),
					awarder: z.string().optional(),
					summary: z.string().optional(),
				}),
			)
			.optional(),
		certificates: z
			.array(
				z.object({
					name: z.string().optional(),
					date: Iso8601.optional(),
					url: z.string().url().optional(),
					issuer: z.string().optional(),
				}),
			)
			.optional(),
		publications: z
			.array(
				z.object({
					name: z.string().optional(),
					publisher: z.string().optional(),
					releaseDate: Iso8601.optional(),
					url: z.string().url().optional(),
					summary: z.string().optional(),
				}),
			)
			.optional(),
		skills: z
			.array(
				z.object({
					name: z.string().optional(),
					level: z.string().optional(),
					keywords: z.array(z.string()).optional(),
				}),
			)
			.optional(),
		languages: z
			.array(
				z.object({
					language: z.string().optional(),
					fluency: z.string().optional(),
				}),
			)
			.optional(),
		interests: z
			.array(
				z.object({
					name: z.string().optional(),
					keywords: z.array(z.string()).optional(),
				}),
			)
			.optional(),
		references: z
			.array(
				z.object({
					name: z.string().optional(),
					reference: z.string().optional(),
				}),
			)
			.optional(),
		projects: z
			.array(
				z.object({
					name: z.string().optional(),
					description: z.string().optional(),
					highlights: z.array(z.string()).optional(),
					keywords: z.array(z.string()).optional(),
					startDate: Iso8601.optional(),
					endDate: Iso8601.optional(),
					url: z.string().url().optional(),
					roles: z.array(z.string()).optional(),
					entity: z.string().optional(),
					type: z.string().optional(),
				}),
			)
			.optional(),
		meta: z
			.object({
				canonical: z.string().url().optional(),
				version: z.string().optional(),
				lastModified: Iso8601.optional(),
			})
			.optional(),
	})
	.strict();

export type ResumeSchema = z.infer<typeof ResumeSchema>;
