import {
	createContext,
	useContext,
	useEffect,
	useMemo,
	useState,
	type Dispatch,
	type PropsWithChildren,
	type SetStateAction,
} from 'react';
import { useQuery } from 'react-query';
import useLoadingToast from '../hooks/useLoadingToast';
import { defaultAuthRequest } from '../lib/authRequests';
import { userAuthKeyLocalStorageKey } from '../lib/constants';
import {
	getItemFromLocalStorage,
	setItemInLocalStorage,
} from '../lib/localStorage';

export interface User {
	id?: number | string;
	username?: string;
	email?: string;
	avatar?: string;
	key: string;
}
interface IAuthUserContext {
	user: User;
	setUser: Dispatch<SetStateAction<User>>;
	isLoggedIn: boolean;
}

const userInit: User = { id: -1, avatar: '', email: '', key: '', username: '' };

export const AuthUserContext = createContext<IAuthUserContext>({
	user: userInit,
	setUser: () => userInit,
	isLoggedIn: false,
});

export default function AuthUserProvider({
	children,
}: PropsWithChildren<Record<string, unknown>>) {
	const [user, setUser] = useState<User>(userInit);
	const isLoggedIn = useMemo(() => Boolean(user.key), [user.key]);

	const { isLoading, refetch } = useQuery(
		'/profile/',
		({ queryKey: [url] }) => {
			return defaultAuthRequest(url, { key: user.key }, { method: 'GET' });
		},
		{
			initialData: userInit,
			enabled: isLoggedIn,
			onSuccess(data) {
				setUser(user => ({ ...user, ...data }));
			},
		},
	);

	useLoadingToast({ isLoading, toastMsg: 'Fetching user details...' });

	const handleUserChange = useMemo(
		() =>
			(...args: Parameters<typeof setUser>) => {
				setUser(...args);
				refetch();
			},
		[refetch],
	);

	useEffect(() => {
		setUser(user => ({ ...user, key: getAuthKeyFromStorage() }));
	}, []);
	useEffect(() => {
		setAuthKeyInStorage(user.key);
	}, [user.key]);

	return (
		<AuthUserContext.Provider
			value={{ user, setUser: handleUserChange, isLoggedIn }}
		>
			{children}
		</AuthUserContext.Provider>
	);
}

export function useAuthUser() {
	return useContext(AuthUserContext);
}

export function getAuthKeyFromStorage(): User['key'] {
	const userData = getItemFromLocalStorage(userAuthKeyLocalStorageKey);
	return (userData ?? '') as string;
}

export function setAuthKeyInStorage(user: User['key']) {
	return setItemInLocalStorage(userAuthKeyLocalStorageKey, user);
}
