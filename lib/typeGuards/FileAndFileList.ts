export function isBrowserFile(file: unknown): file is File {
	return (
		typeof file === 'object' &&
		Object.prototype.toString.call(file) === '[object File]'
	);
}

export function isBrowserFileList(fileList: unknown): fileList is FileList {
	return (
		typeof fileList === 'object' &&
		Object.prototype.toString.call(fileList) === '[object FileList]'
	);
}
