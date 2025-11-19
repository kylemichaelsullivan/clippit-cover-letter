import { showToast } from '../toast';

import type { ChangeEvent } from 'react';

const STORE_KEYS = [
	'app-store',
	'candidate-store',
	'job-store',
	'resume-store',
	'skills-store',
	'templates-store',
	'theme',
] as const;

type LocalStorageData = Record<string, string>;

export function exportLocalStorageToFile(filename = 'app-data.json'): void {
	try {
		if (typeof window === 'undefined') {
			showToast.error('Export is only available in the browser');
			return;
		}

		const data: LocalStorageData = {};

		for (const key of STORE_KEYS) {
			const value = localStorage.getItem(key);
			if (value !== null) {
				data[key] = value;
			}
		}

		const jsonString = JSON.stringify(data, null, 2);
		const blob = new Blob([jsonString], { type: 'application/json' });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = filename;
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(url);

		showToast.success('Data Exported Successfully');
	} catch (error) {
		console.error('Error exporting localStorage:', error);
		showToast.error('Failed to Export Data');
	}
}

export function importLocalStorageFromFile(file: File): Promise<void> {
	return new Promise((resolve, reject) => {
		try {
			if (typeof window === 'undefined') {
				reject(new Error('Import is only available in the browser'));
				return;
			}

			const reader = new FileReader();

			reader.onload = (event) => {
				try {
					const text = event.target?.result as string;
					const data: LocalStorageData = JSON.parse(text);

					let importedCount = 0;
					for (const key of STORE_KEYS) {
						if (key in data) {
							localStorage.setItem(key, data[key]);
							importedCount++;
						}
					}

					if (importedCount === 0) {
						showToast.error('No Valid Data Found in File');
						reject(new Error('No valid data found'));
						return;
					}

					window.location.reload();
					showToast.success('Data Imported Successfully');
					resolve();
				} catch (parseError) {
					console.error('Error parsing JSON:', parseError);
					showToast.error('Invalid JSON File Format');
					reject(parseError);
				}
			};

			reader.onerror = (error) => {
				console.error('Error reading file:', error);
				showToast.error('Failed to Read File');
				reject(error);
			};

			reader.readAsText(file);
		} catch (error) {
			console.error('Error importing localStorage:', error);
			showToast.error('Failed to Import Data');
			reject(error);
		}
	});
}

export function handleFileImport(event: ChangeEvent<HTMLInputElement>): void {
	const file = event.target.files?.[0];
	if (!file) {
		return;
	}

	if (!file.name.endsWith('.json')) {
		showToast.error('Please Select a JSON File');
		return;
	}

	importLocalStorageFromFile(file).catch((error) => {
		console.error('Import failed:', error);
	});
}
