export function getItemFromLocalStorage(storageKey: string): unknown {
	if (!window || !window.localStorage) return null;

	try {
		return JSON.parse(localStorage.getItem(storageKey) ?? '');
	} catch (err) {
		console.error(err);
		return null;
	}
}

export function setItemInLocalStorage(storageKey: string, data: unknown) {
	if (!window || !window.localStorage) return;

	const dataToStore = data ?? null;
	localStorage.setItem(storageKey, JSON.stringify(dataToStore));
}
