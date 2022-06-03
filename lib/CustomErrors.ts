export class FetchError<T = unknown> extends Error {
	public fetchResults?: T;
	public status?: number;
	public statusText?: string;

	constructor(
		{
			fetchResults,
			status,
			statusText,
		}: { fetchResults?: T; status?: number; statusText?: string },
		message?: string | undefined,
		errorOptions?: ErrorOptions | undefined,
	) {
		// @ts-ignore
		const fetchMessage = fetchResults?.non_field_errors;
		if (!message && fetchMessage) {
			super(fetchMessage, errorOptions);
		} else
			super(
				message || 'Something went wrong while fetching data',
				errorOptions,
			);

		this.fetchResults = fetchResults;
		this.status = status;
		this.statusText = statusText;
	}
}
