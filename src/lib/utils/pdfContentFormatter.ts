type SkillsGroup = {
	name: string;
	skills: string[];
};

export function formatContentForPDFWithSkills(
	content: string,
	title: string,
	generatedSkillsData: SkillsGroup[],
	includeSkillGroupNames: boolean
): string {
	if (
		title.toLowerCase().includes('resume') &&
		generatedSkillsData.length > 0
	) {
		if (!includeSkillGroupNames) {
			const allSkills = generatedSkillsData
				.flatMap((group) => group.skills)
				.sort();

			return content
				.replace(
					/\*\*([^:]+):\*\* ([^<]+)/g,
					'**Skills:** ' + allSkills.join(', ')
				)
				.replace(
					/<ul>[\s\S]*?<li><strong>([^<]+):<\/strong> ([^<]+)<\/li>[\s\S]*?<\/ul>/g,
					'<p><strong>Skills:</strong> ' + allSkills.join(', ') + '</p>'
				)
				.replace(
					/<strong>([^<]+):<\/strong> ([^<]+)/g,
					'<strong>Skills:</strong> ' + allSkills.join(', ')
				);
		}
	}
	return content;
}
