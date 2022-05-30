import {
	type Context,
	createContext,
	useContext,
	useEffect,
	useState,
	PropsWithChildren,
} from 'react';
import { ColorThemeStorageKey } from '../lib/constants';

export type ColorThemes = 'light' | 'dark';
export interface ColorTheme {
	chosenOption?: ColorThemes | 'OS';
	theme?: ColorThemes;
}
export type ColorThemeContext = Context<{
	colorTheme: ColorTheme;
	changeColorTheme: (newChosenOption: ColorTheme['chosenOption']) => void;
}>;

export const ColorThemeContext: ColorThemeContext = createContext({
	colorTheme: {},
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	changeColorTheme: _newChosenOption => {},
});

export function useColorTheme() {
	return useContext(ColorThemeContext);
}

export default function ColorThemeProvider({
	children,
}: PropsWithChildren<Record<string, unknown>>) {
	const [colorTheme, setColorTheme] = useState<ColorTheme>({
		chosenOption: 'OS',
		theme: 'dark',
	});

	// localstorage is only accessible when component is mounted,
	// not on the server side
	useEffect(() => setColorTheme(getColorTheme()), []);

	const changeColorTheme = (newChosenOption: ColorTheme['chosenOption']) => {
		storeColorTheme({ chosenOption: newChosenOption });
		setColorTheme(getColorTheme());
	};

	return (
		<ColorThemeContext.Provider value={{ colorTheme, changeColorTheme }}>
			{children}
		</ColorThemeContext.Provider>
	);
}

function getColorTheme(): ColorTheme {
	const colorTheme = JSON.parse(
		localStorage.getItem(ColorThemeStorageKey) || '',
	);

	if (colorTheme && colorTheme.chosenOption !== 'OS') return colorTheme;

	return {
		theme: window.matchMedia('(prefers-color-scheme: dark)').matches
			? 'dark'
			: 'light',
		chosenOption: 'OS',
	};
}

function storeColorTheme(newColorTheme: ColorTheme) {
	localStorage.setItem(ColorThemeStorageKey, JSON.stringify(newColorTheme));
}
