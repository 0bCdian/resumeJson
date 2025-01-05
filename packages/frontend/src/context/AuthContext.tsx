import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useState,
} from "react";
import {
	onAuthStateChanged,
	signInWithPopup,
	signOut,
	type User,
} from "firebase/auth";
import { googleProvider, auth, githubProvider } from "../firebase";
import { createUser } from "../api";

export interface AuthState {
	user: User | null;
	loading: boolean;
	loginWithGithub: () => Promise<void>;
	loginWithGoogle: () => Promise<void>;
	logout: () => void;
}

const AuthContext = createContext<AuthState | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);
	const loginWithGoogle = useCallback(async () => {
		try {
			const { user } = await signInWithPopup(auth, googleProvider);
			await createUser({ user });
		} catch (error) {}
	}, []);
	const loginWithGithub = useCallback(async () => {
		try {
			const { user } = await signInWithPopup(auth, githubProvider);
			await createUser({ user });
		} catch (error) {}
	}, []);
	const logout = useCallback(() => {
		signOut(auth);
	}, []);
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
			setUser(firebaseUser);
			setLoading(false);
		});

		return () => unsubscribe();
	}, []);

	return (
		<AuthContext.Provider
			value={{ user, loading, loginWithGithub, loginWithGoogle, logout }}
		>
			{children}
		</AuthContext.Provider>
	);
};
export const useAuth = () => {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};
