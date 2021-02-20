import React, { ChangeEvent, useEffect, useState } from 'react';
import { ConfirmPage, ThumbnailBox, SubmitButtonBox } from './style';
import marked from 'marked';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@reducers/index';
import { CLOSE_CONFIRM_POST } from '@reducers/posting';
import { WRITE_POST_REQUEST } from '@reducers/post';

interface ConfirmPostProps {
	title: string;
}

const ConfirmPost = ({ title }: ConfirmPostProps) => {
	const { body, isOpen, categories } = useSelector((state: RootState) => state.posting);
	const dispatch = useDispatch();
	const [des, setDes] = useState('');
	const [isVisible, setVisible] = useState(true);
	const [thumbnails, setThumbnails] = useState([] as string[]);
	const [tnIndex, setTnIndex] = useState(0);

	const onChangeDes = React.useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
		e.preventDefault();
		if (e.target.value.length > 160) return;
		setDes(e.target.value.replace('\n', ''));
	}, []);

	const RemoveThumbnail = React.useCallback(() => {
		setThumbnails(thumbnails.filter((img, i) => i !== tnIndex));
		setTnIndex(tnIndex > 0 ? tnIndex - 1 : 0);
	}, [tnIndex, thumbnails]);

	const onSubmitPost = React.useCallback(() => {
		dispatch({
			type: WRITE_POST_REQUEST,
			payload: {
				post: {
					title: title,
					description: des,
					thumbnail: thumbnails[tnIndex],
					is_visible: isVisible,
					body: body,
				},
				category: categories,
			},
		});
	}, [body, des, isVisible, thumbnails, tnIndex]);

	useEffect(() => {
		if (!isOpen || !body) return;

		const parseDesList = marked(body).match(/<\s*p[^>]*>([^<]*)<\s*\/\s*p\s*>/g);
		const parseDes = parseDesList?.join(' ').replace(/(<([^>]+)>)/gi, '');

		setDes(parseDes ? parseDes : '');
		const thumb_imgs = body
			.match(/!\[[^\]]*?\]\([^)]+\)/g)
			?.map((imgString: string) => imgString.replace(/!\[[^\]]*?\]\(/g, '').replace(')', ''));

		setThumbnails(thumb_imgs ? thumb_imgs : []);
	}, [isOpen]);

	return (
		<ConfirmPage
			style={{
				left: isOpen ? 0 : '100%',
			}}
		>
			<div>
				<h3>썸네일 미리보기</h3>
				<ThumbnailBox>
					<div className="paddingBox" />
					<div className="buttonBox">
						<div>파일찾기</div>
						{thumbnails.length > 0 && <div onClick={RemoveThumbnail}>제거하기</div>}
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
				<h3>
					Description 미리보기 <span>{des.length}/160</span>
				</h3>
				<textarea rows={4} value={des} onChange={onChangeDes} />
				<SubmitButtonBox>
					<div
						onClick={() => {
							dispatch({ type: CLOSE_CONFIRM_POST });
						}}
					>
						취소하기
					</div>
					<div
						className={isVisible ? 'selected' : ''}
						onClick={() => {
							setVisible(!isVisible);
						}}
					>
						{isVisible ? '공개' : '비공개'}
					</div>
					<div className="submit" onClick={onSubmitPost}>
						작성하기
					</div>
				</SubmitButtonBox>
			</div>
		</ConfirmPage>
	);
};

export default ConfirmPost;
