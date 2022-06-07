export default function humanizeDate(date: Date): string {
	const now = new Date();
	const today = now.toDateString();

	now.setDate(now.getDate() - 1);
	const yesterday = now.toDateString();

	const givenDate = date.toDateString();

	if (givenDate === today) return 'Today';
	if (givenDate === yesterday) return 'Yesterday';
	return date.toLocaleDateString(undefined, { month: 'short', day: '2-digit' });
}
