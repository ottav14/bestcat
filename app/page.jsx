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
						<button
							className={styles.upButton}
							onClick={upVote}
						>
							<svg xmlns="http://www.w3.org/2000/svg" height="64px" viewBox="0 -960 960 960" width="64px" fill="#FFF"><path d="M452-244v-400L282-477l-42-43 241-241 241 241-42 42-168-168v402h-60Z"/></svg>
						</button>
						<button
							className={styles.downButton}
							onClick={downVote}
						>
							<svg xmlns="http://www.w3.org/2000/svg" height="64px" viewBox="0 -960 960 960" width="64px" fill="#FFF"><path d="M479-240 238-481l42-43 170 167v-400h60v402l168-168 42 42-241 241Z"/></svg>
						</button>
					</div>
				</div>
			</div>
		</main>
	);
}
export default Home;
