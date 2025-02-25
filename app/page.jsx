"use client"

import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './page.module.css';
import Button from '../components/Button/Button.jsx';
import LoadingImage from '../components/LoadingImage/LoadingImage.jsx';

const Home = () => {

	const [base64, setBase64] = useState('');
	const [name, setName] = useState('');
	const [apiResponse, setApiResponse] = useState({});
	const [loading, setLoading] = useState(true);
	const [rerender, setRerender] = useState(false);
	const [error, setError] = useState(false);
	const [id, setId] = useState('');
	const [count, setCount] = useState(0);
	const [onMobile, setOnMobile] = useState(true);
	const [test, setTest] = useState(false);

	const updateCount = async (_id, _parity) => {
		try {
			const response = await fetch('/api/update', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ id: _id, parity: _parity })
			});
			const responseJSON = await response.json();
			console.log(responseJSON);
		} catch(error) {
			console.error(error);
		}
	}

	useEffect(() => {
		const fetchDoc = async () => {
			try {
				const response = await fetch('/api/doc');
				const data = await response.json();
				setBase64(data.imageBase64);
				setName(data.name);
				setCount(data.count);
				setId(data.id);
				const mobileCheck = (window.innerWidth <= 768);
				setOnMobile(mobileCheck);
			} catch(error) {
				setError(error.message);
			} finally {
				setLoading(false);
				console.log(name);
			}
		}
		fetchDoc();

	}, [rerender]);

	useEffect(() => {
		console.log(name);
	}, [name]);

	const upVote = () => {
		setRerender(!rerender);
		setLoading(true);
		console.log(id);
		if(id)
			updateCount(id, '1');

	}

	const downVote = () => {
		setRerender(!rerender);
		setLoading(true);
		if(id)
			updateCount(id, '-1');
	}

	const unsure = () => {
		setRerender(!rerender);
		setLoading(true);
	}

	const CatPic = () => {

		if(loading)
			return <div className={styles.img}><LoadingImage /></div>;

		else {

			const imageResolution = onMobile ? 350 : 450;

			return (
				<div className={styles.img}>
					<Image 
						src={`data: image/jpeg; base64, ${base64}`}
						width={imageResolution}
						height={imageResolution}
						alt='Cat pic'
						priority={true}
					/>
				</div>
			);
		}
	}

	const Container = ({ children, onMobile }) => {
		if(onMobile)
			return (
				<div className={styles.hiddenContainer}>
					{children}
				</div>
			);
		return (
			<div className={styles.container}>
				{children}
			</div>
		);
	}

	return (
		<main className={styles.main}>
			<div className={styles.container}>
				<div className={styles.interfaceContainer}>
					<div className={styles.card}>
						<CatPic />
						<p className={styles.nameLabel}>{name}</p>
					</div>
					<div className={styles.buttonContainer}>
						<Button 
							backgroundImage='/thumbs-up.svg' 
							backgroundColor='#06d6a0'
							action={upVote}
						/>
						<Button 
							backgroundImage='/question-mark.svg' 
							backgroundColor='#959595'
							action={unsure}
						/>
						<Button 
							backgroundImage='/thumbs-down.svg' 
							backgroundColor='#ef476f'
							action={downVote}
						/>
					</div>
				</div>
			</div>
		</main>
	);
}
export default Home;
