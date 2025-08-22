import { z } from 'zod';

export const candidateDetailsSchema = z.object({
	fullName: z.string().min(1, 'Full name is required'),
	email: z.string().email('Please enter a valid email address'),
	phone: z.string(),
	location: z.string(),
	linkedin: z
		.string()
		.min(3, 'LinkedIn slug must be at least 3 characters')
		.max(100, 'LinkedIn slug cannot exceed 100 characters')
		.regex(
			/^[a-zA-Z0-9-]+$/,
			'LinkedIn slug can only contain letters, numbers, and hyphens',
		)
		.refine((val) => !val.toLowerCase().includes('linkedin'), {
			message: 'LinkedIn slug should not include the word "LinkedIn"',
		}),
	portfolio: z.string(),
	logo: z.string(),
	logoInclude: z.boolean().optional(),
	signature: z.string(),
	signatureInclude: z.boolean().optional(),
});

export const skillsSchema = z.object({
	groups: z.array(
		z.object({
			id: z.string(),
			include: z.boolean(),
			name: z.string(),
			skills: z.array(z.string()),
		}),
	),
	minSkillsToUse: z.number().min(1).max(20),
	maxSkillsToUse: z.number().min(1).max(20),
});

export const templatesSchema = z.object({
	includeCoverLetter: z.boolean(),
	coverLetterContent: z.string(),
	includeResume: z.boolean(),
	summary: z.string(),
	experience: z.string(),
	education: z.string(),
});

export const jobDetailsSchema = z.object({
	companyName: z.string().min(1, 'Company Name is required'),
	jobTitle: z.string().min(1, 'Job Title is required'),
	jobDescription: z.string().min(1, 'Job Description is required'),
	hiringManager: z.string(),
	companyAddress: z.string(),
});

export function validateSchema(schema: z.ZodObject<any>, fieldName: string) {
	return ({ value }: { value: any }) => {
		const fieldSchema = schema.shape[fieldName];
		if (!fieldSchema) return undefined;

		const result = fieldSchema.safeParse(value);
		return result.success ? undefined : result.error.errors[0]?.message;
	};
}

export function isFieldRequired(
	schema: z.ZodSchema,
	fieldName: string,
): boolean {
	try {
		if (schema instanceof z.ZodObject) {
			const shape = schema.shape as Record<string, z.ZodSchema>;
			const fieldSchema = shape[fieldName];

			if (!fieldSchema) return false;

			if (fieldSchema instanceof z.ZodOptional) {
				return false;
			}

			if (fieldSchema instanceof z.ZodString) {
				return fieldSchema._def.checks.some(
					(check) => check.kind === 'min' && check.value > 0,
				);
			}

			return true;
		}

		return false;
	} catch {
		return false;
	}
}

export type CandidateDetailsForm = z.infer<typeof candidateDetailsSchema>;
export type JobDetailsForm = z.infer<typeof jobDetailsSchema>;
export type SkillsForm = z.infer<typeof skillsSchema>;
export type TemplatesForm = z.infer<typeof templatesSchema>;
