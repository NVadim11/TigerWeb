// import { useWallet } from '@solana/wallet-adapter-react';
import { useEffect, useState } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import {
	useGetUserByWalletIdInitMutation,
	useGetUserByWalletIdQuery,
} from '../services/phpService';
import { AuthContext } from '../store';
import MainComponent from './MainComponent';

const router = createBrowserRouter([
	{
		path: '/',
		element: <MainComponent />,
	},
	{
		path: '/:code',
		element: <MainComponent />,
	},
]);

const AppRouter = () => {
	// УДАЛИТЬ
	const connected = true;
	const publicKey = 'placeholder';
	const wallet_address = 'placeholder';

	const [auth, setAuth] = useState({});
	const [skip, setSkip] = useState(true);
	// const { publicKey, connected } = useWallet();
	const [getUser] = useGetUserByWalletIdInitMutation();

	const {
		data: user,
		isLoading,
		isError,
	} = useGetUserByWalletIdQuery(wallet_address, {
		skip: skip,
		pollingInterval: 10000,
	});

	const contextValue = {
		value: auth,
		setValue: setAuth,
	};

	useEffect(() => {
		if (connected && wallet_address) {
			setSkip(false);
		}
	}, [connected, wallet_address]);

	useEffect(() => {
		if (user && !isLoading) {
			setAuth(user);
		}
	}, [user, isLoading]);

	const connectSubmitHandler = async () => {
		try {
			const response = await getUser(wallet_address).unwrap();
			if (response) {
				setAuth(response);
			}
		} catch (e) {
			console.log('Error submitting data');
		}
	};
	useEffect(() => {
		if (connected === true) {
			setTimeout(() => {
				connectSubmitHandler();
			}, 100);
		}
	}, [connected]);

	return (
		<AuthContext.Provider value={contextValue}>
			<RouterProvider router={router} />
		</AuthContext.Provider>
	);
};

export default AppRouter;
