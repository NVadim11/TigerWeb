import React, { useEffect, useState } from 'react';
import tigranChill from '../../../img/tigranChill.gif';
import tigranCircle from '../../../img/tigran_circle.webp';

const GamePaused = ({ user, remainingTime }) => {
	const [timeRemaining, setTimeRemaining] = useState(remainingTime);

	useEffect(() => {
		setTimeRemaining(remainingTime);
	}, [remainingTime]);

	const formatTime = (seconds) => {
		const minutes = Math.floor(seconds / 60);
		return `${minutes}`;
	};

	return (
		<div className='mainContent__gamePaused'>
			<div className='mainContent__totalCoins'>
				<div className='mainContent__totalCoinsBox'>
					<div className='mainContent__totalCoinsImg' draggable='false'>
						<img src={tigranCircle} draggable='false' />
					</div>
					{user !== null && (
						<div className='mainContent__totalCoinsAmount'>
							<span>{user?.wallet_balance}</span>
						</div>
					)}
				</div>
			</div>
			{timeRemaining ? (
				<h4 style={{ marginBottom: '-15px', marginTop: '15px' }}>
					Time remaining: {formatTime(timeRemaining)} minutes
				</h4>
			) : (
				<h4 style={{ marginBottom: '-15px', marginTop: '15px' }}>Calculating...</h4>
			)}
			<div className='mainContent__imageContainer'>
				<div className='circleElement'>
					<div className='outerCircle'>
						<div className='innerCircle'>
							<img src={tigranChill} draggable='false' alt='Tigran Chill' />
						</div>
					</div>
				</div>
			</div>
			<p style={{ marginTop: '-15px' }}>Tigran is tired, come back when timer is over.</p>
		</div>
	);
};

export default GamePaused;
