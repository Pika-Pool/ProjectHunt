import {
	createContext,
	useContext,
	useMemo,
	type Dispatch,
	type PropsWithChildren,
	type SetStateAction,
} from 'react';
import { useQuery } from 'react-query';
import ClientOnly from '../components/ClientOnly';
import useLoadingToast from '../hooks/useLoadingToast';
import useLocalStorage from '../hooks/useLocalStorage';
import { defaultAuthRequest } from '../lib/authRequests';
import { userAuthKeyLocalStorageKey } from '../lib/constants';
import { getUserProfile } from '../lib/graphql/requests/query';
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
	logout: () => Promise<void>;
}

const userInit: User = { id: -1, avatar: '', email: '', key: '', username: '' };

export const AuthUserContext = createContext<IAuthUserContext>({
	user: userInit,
	setUser: () => userInit,
	isLoggedIn: false,
	logout: Promise.resolve,
});

export default function AuthUserProvider({
	children,
}: PropsWithChildren<Record<string, unknown>>) {
	const [user, setUser] = useLocalStorage(userAuthKeyLocalStorageKey, userInit);
	const isLoggedIn = useMemo(() => Boolean(user.key), [user.key]);

	const { isLoading } = useQuery(
		['/profile/', isLoggedIn],
		async () => (await getUserProfile()) ?? userInit,
		{
			initialData: userInit,
			enabled: isLoggedIn,
			refetchOnWindowFocus: false,
			onSuccess(data) {
				setUser(user => ({
					...user,
					...data,
					// data.avatar can be null
					avatar: data.avatar ?? user.avatar,
				}));
			},
		},
	);

	useLoadingToast({ isLoading, toastMsg: 'Fetching user details...' });

	const logout = async () => {
		try {
			await defaultAuthRequest('/accounts/logout/', undefined);
			setUser(userInit);
		} catch (err) {
			console.error(err);
			throw err;
		}
	};

	return (
		<AuthUserContext.Provider value={{ user, setUser, isLoggedIn, logout }}>
			<ClientOnly>{children}</ClientOnly>
		</AuthUserContext.Provider>
	);
}

export function useAuthUser() {
	return useContext(AuthUserContext);
}

export function getAuthKeyFromStorage(): User['key'] {
	const userData = getItemFromLocalStorage(userAuthKeyLocalStorageKey) as
		| { key: string }
		| undefined;
	return userData?.key ?? '';
}

export function setAuthKeyInStorage(userKey: User['key']) {
	return setItemInLocalStorage(userAuthKeyLocalStorageKey, { key: userKey });
}
