import React, { useRef, useCallback, MutableRefObject } from 'react';
import { ThumbnailBox } from './style';
import axios from 'axios';

interface SetThumbnailProps {
	thumbnails: string[];
	tnIndex: number;
	removeThumbnail: () => void;
	setTnIndex(index: number): void;
	addThumbnail(newImage: string): void;
}

const SetThumbnail = ({ thumbnails, tnIndex, removeThumbnail, setTnIndex, addThumbnail }: SetThumbnailProps) => {
	const imageInput = useRef() as MutableRefObject<HTMLInputElement>;

	const onClickImageButton = useCallback(() => {
		imageInput.current.click();
	}, []);

	const onChangeImg = useCallback(async (e) => {
		const file = e.target.files[0];
		if (!file) return;
		if (file.size > 1024 * 1024 * 10) return;
		const fileTypeRegex = /^image\/(.*?)/;
		if (!fileTypeRegex.test(file.type)) return;

		const formData = new FormData();
		await formData.append('image', file);

		await axios.post(`/post/uploadImage`, formData).then((res) => {
			addThumbnail(res.data);
		});
	}, []);

	return (
		<ThumbnailBox>
			<div className="paddingBox" />
			<div className="buttonBox">
				<div onClick={onClickImageButton}>
					<input
						type="file"
						accept=".gif, .jpg, .png"
						ref={imageInput}
						onChange={onChangeImg}
						style={{ display: 'none' }}
					/>
					파일찾기
				</div>
				{thumbnails.length > 0 && <div onClick={removeThumbnail}>제거하기</div>}
			</div>
			<div className="imageBox" style={{ transform: `translateX(-${100 * tnIndex}%)` }}>
				{thumbnails && thumbnails.map((img, i) => <img key={i} src={img} />)}
			</div>
			{tnIndex > 0 && (
				<button
					className="left"
					onClick={() => {
						setTnIndex(tnIndex - 1);
					}}
				>
					<img src="/arrow.svg" alt="" />
				</button>
			)}
			{tnIndex < thumbnails.length - 1 && (
				<button
					className="right"
					onClick={() => {
						setTnIndex(tnIndex + 1);
					}}
				>
					<img src="/arrow.svg" alt="" />
				</button>
			)}
		</ThumbnailBox>
	);
};

export default SetThumbnail;
