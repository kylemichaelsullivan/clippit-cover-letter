// Simple test for education parser
function parseEducationFromText(text) {
	if (!text.trim()) return [];

	const lines = text
		.split('\n')
		.map((line) => line.trim())
		.filter((line) => line.length > 0);
	const educationEntries = [];
	let currentEntry = {};

	for (let i = 0; i < lines.length; i++) {
		const line = lines[i];

		if (isDegreeLine(line)) {
			if (currentEntry.degree) {
				educationEntries.push(createEducationEntry(currentEntry));
			}
			currentEntry = { degree: extractDegree(line) };
		} else if (isInstitutionLine(line)) {
			const { institution, location } = parseInstitutionLine(line);
			currentEntry.institution = institution;
			currentEntry.location = location;
		} else if (isGraduationYearLine(line)) {
			currentEntry.graduationYear = extractGraduationYear(line);
		}
	}

	if (currentEntry.degree) {
		educationEntries.push(createEducationEntry(currentEntry));
	}

	return educationEntries;
}

function isDegreeLine(line) {
	const degreePatterns = [
		/^#{1,6}\s*(.+)/, // Markdown headers
		/^(Bachelor|Master|Doctor|Associate|Certificate|Diploma|PhD|JD|MBA|MS|MA|BS|BA|AA|AS)/i,
		/^(.+)\s+(Degree|Certificate|Diploma)$/i,
		/^(Juris Doctor|Doctor of Law|Doctor of Medicine|Doctor of Philosophy|Doctor of Education)/i,
		/^[A-Z][a-z]+ [A-Z][a-z]+$/, // Pattern for "Juris Doctor", "Bachelor Science", etc.
	];

	return degreePatterns.some((pattern) => pattern.test(line));
}

function isInstitutionLine(line) {
	return (
		line.includes('|') ||
		line.includes('University') ||
		line.includes('College') ||
		line.includes('School')
	);
}

function isGraduationYearLine(line) {
	return (
		/^\d{4}$/.test(line) || /(graduated?|completed?)\s*:?\s*\d{4}/i.test(line)
	);
}

function extractDegree(line) {
	const markdownHeaderMatch = line.match(/^#{1,6}\s*(.+)/);
	if (markdownHeaderMatch) {
		return markdownHeaderMatch[1].trim();
	}

	const degreeMatch = line.match(
		/^(Bachelor|Master|Doctor|Associate|Certificate|Diploma|PhD|JD|MBA|MS|MA|BS|BA|AA|AS)(.*)/i,
	);
	if (degreeMatch) {
		return (degreeMatch[1] + degreeMatch[2]).trim();
	}

	return line.trim();
}

function parseInstitutionLine(line) {
	const pipeMatch = line.match(/^(.+?)\s*\|\s*(.+)$/);
	if (pipeMatch) {
		return {
			institution: cleanMarkdownFormatting(pipeMatch[1].trim()),
			location: pipeMatch[2].trim(),
		};
	}

	const parenMatch = line.match(/^(.+?)\s*\(([^)]+)\)$/);
	if (parenMatch) {
		return {
			institution: cleanMarkdownFormatting(parenMatch[1].trim()),
			location: parenMatch[2].trim(),
		};
	}

	return {
		institution: cleanMarkdownFormatting(line.trim()),
		location: '',
	};
}

function extractGraduationYear(line) {
	const yearMatch = line.match(/\d{4}/);
	return yearMatch ? yearMatch[0] : undefined;
}

function cleanMarkdownFormatting(text) {
	return text
		.replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold markdown
		.replace(/\*(.*?)\*/g, '$1') // Remove italic markdown
		.replace(/`(.*?)`/g, '$1') // Remove code markdown
		.trim();
}

function createEducationEntry(entry) {
	return {
		degree: entry.degree || '',
		institution: entry.institution || '',
		location: entry.location || '',
		graduationYear: entry.graduationYear || undefined,
	};
}

console.log('=== Test 1: Single MD Education ===');
const test1 = `### Juris Doctor

**Western Michigan University Thomas M. Cooley Law School** | Grand Rapids, MI`;
console.log(JSON.stringify(parseEducationFromText(test1), null, 2));

console.log('\n=== Test 2: Multiple MD Education ===');
const test2 = `### Juris Doctor

**Western Michigan University Thomas M. Cooley Law School** | Grand Rapids, MI

### Bachelor's Degree

**University of Michigan** | Ann Arbor, MI`;
console.log(JSON.stringify(parseEducationFromText(test2), null, 2));

console.log('\n=== Test 3: Single TXT Education ===');
const test3 = `Juris Doctor

Western Michigan University Thomas M. Cooley Law School | Grand Rapids, MI`;
console.log(JSON.stringify(parseEducationFromText(test3), null, 2));

console.log('\n=== Test 4: Multiple TXT Education ===');
const test4 = `Juris Doctor

Western Michigan University Thomas M. Cooley Law School | Grand Rapids, MI

Bachelor's Degree

University of Michigan | Ann Arbor, MI`;
console.log(JSON.stringify(parseEducationFromText(test4), null, 2));
