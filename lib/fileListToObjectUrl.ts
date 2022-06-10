import { isBrowserFile, isBrowserFileList } from './typeGuards/FileAndFileList';

const fileListToObjectURL = (files?: FileList | File) => {
	if (files) {
		let file: File | undefined = undefined;
		if (isBrowserFile(files)) file = files;
		else if (isBrowserFileList(files)) file = files.item(0) ?? undefined;

		if (file) return URL.createObjectURL(file);
		return '';
	}
	return '';
};

export default fileListToObjectURL;
