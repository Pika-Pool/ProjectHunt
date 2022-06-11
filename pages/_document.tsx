import Document, { Html, Head, Main, NextScript } from 'next/document';
import ColorThemeProvider, { ColorThemeContext } from '../contexts/ColorTheme';

class MyDocument extends Document {
	override render() {
		return (
			<ColorThemeProvider>
				<Html>
					<Head>
						{/* Fonts using: Lora, Poppins */}
						<link rel='preconnect' href='https://fonts.googleapis.com' />
						<link
							rel='preconnect'
							href='https://fonts.gstatic.com'
							crossOrigin='anonymous'
						/>
						<link
							href='https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap'
							rel='stylesheet'
						/>
								<link rel='shortcut icon' href='/logo_600.png' />
					</Head>

					<ColorThemeContext.Consumer>
						{({ colorTheme: { theme } }) => (
							<body className={theme}>
								<Main />
								<NextScript />
							</body>
						)}
					</ColorThemeContext.Consumer>
				</Html>
			</ColorThemeProvider>
		);
	}
}

export default MyDocument;
