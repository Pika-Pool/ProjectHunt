import { URL } from 'url';

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,

	// to support tailwind's `dark:` classes in css modules
	// css modules hashes the .dark class
	webpack: config => {
		// Find the base rule that contains nested rules (which contains css-loader)
		const rules = config.module.rules.find(r => !!r.oneOf);

		// Iterate over the found rules
		rules.oneOf.forEach(loaders => {
			// Focus on the the loaders that have an array of `use` statements
			if (!Array.isArray(loaders.use)) return;

			// Iterate over each of the loaders
			loaders.use.forEach(l => {
				// Only focus on loaders that are an object and have a `loader` property set to `css-loader`
				if (
					typeof l !== 'string' &&
					typeof l.loader === 'string' &&
					/(?<!post)css-loader/.test(l.loader)
				) {
					// If there are no module options originally set, skip this loader
					if (!l.options.modules) return;
					const { getLocalIdent, ...others } = l.options.modules;

					// Create a new options object with the `getLocalIdent` property set to a function
					l.options = {
						...l.options,
						modules: {
							...others,
							getLocalIdent: (ctx, localIdentName, localName) => {
								// If the class name is `dark`, return it instead of hashing it
								if (localName === 'dark') return localName;
								// Otherwise, call the original function and return the value
								return getLocalIdent(ctx, localIdentName, localName);
							},
						},
					};
				}
			});
		});

		return config;
	},

	async redirects() {
		return [{ source: '/', destination: '/home', permanent: true }];
	},

	images: {
		domains: [
			'localhost',
			new URL(process.env.NEXT_PUBLIC_BACKEND_URL).hostname,
		],
	},
};

export default nextConfig;
