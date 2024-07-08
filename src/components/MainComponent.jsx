import AOS from 'aos';
import { useContext, useEffect, useRef, useState } from 'react';
import avatar from '../img/avatar.webp';
import back1 from '../img/back1.webp';
import back2 from '../img/back2.webp';
import back3 from '../img/back3.webp';
import bgMob from '../img/background_mobile.webp';
import energy from '../img/energy.webp';
import leaderboard from '../img/leaderboard.webp';
import referral from '../img/referral.webp';
import tiger1 from '../img/tiger1.webp';
import tiger_ava from '../img/tiger_ava.webp';
import tigranCash from '../img/tigranCash.gif';
import tigranChill from '../img/tigranChill.gif';
import tigranGold from '../img/tigranGold.gif';
import tigranCircle from '../img/tigran_circle.webp';
import { AuthContext } from '../store';
import Footer from './Footer/Footer';
import Header from './Header/Header';
import MainContent from './MainContent/MainContent';
import Preloader from './Preloader/Preloader';
import DynamicScreen from './Screens/DynamicScreen/DynamicScreen';

const MainComponent = () => {
	const { user } = useContext(AuthContext);
	const [preloaderLoaded, setPreloaderLoaded] = useState(false);
	const imagesRef = useRef([]);

	const secretURL = process.env.REACT_APP_REGISTER_KEY;
	const testURL = process.env.REACT_APP_TEST_URL;

	useEffect(() => {
		const loadImage = (src) => {
			return new Promise((resolve, reject) => {
				const img = new Image();
				img.src = src;
				img.onload = () => resolve(img);
				img.onerror = () => reject(new Error(`Failed to load image from ${src}`));
			});
		};

		const imageSources = [
			avatar,
			back1,
			back2,
			back3,
			bgMob,
			energy,
			leaderboard,
			referral,
			tiger_ava,
			tiger1,
			tigranCircle,
			tigranCash,
			tigranChill,
			tigranGold,
		];

		const loadImages = async () => {
			const promises = imageSources.map((src) => loadImage(src));

			try {
				const loadedImages = await Promise.all(promises);
				imagesRef.current = loadedImages;
				checkAllLoaded();
			} catch (e) {
				console.log('Problem loading images');
			}
		};

		const checkAllLoaded = () => {
			if (imagesRef.current.length === imageSources.length) {
				if (user) {
					setTimeout(() => {
						setPreloaderLoaded(true);
						AOS.init({
							easing: 'custom',
						});
					}, 500);
				} else {
					console.log('User data is not available.');
				}
			}
		};

		loadImages();
	}, [user]);

	// Detecting if the application is opened from a mobile device
	const isMobileDevice =
		/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
			navigator.userAgent
		);

	// Change the variant based on current state
	// 'error' | 'maintenance' | 'comingSoon'
	const [variant, setVariant] = useState('error');
	useEffect(() => {
		setVariant('error');
	}, []);

	return (
		<>
			{/* <Preloader loaded={preloaderLoaded} /> */}
			{!user ? (
				<>
					<Header />
					<main id='main' className='main'>
						<MainContent />
					</main>
					<Footer />
				</>
			) : (
				<DynamicScreen variant={variant} />
			)}
		</>
	);
};

export default MainComponent;
