import React, { ChangeEvent, useEffect, useState } from 'react';
import { ConfirmPage, ThumbnailBox, SubmitButtonBox } from './style';
import marked from 'marked';
import { settings } from 'cluster';

interface ConfirmPostProps {
	body: string;
	flg: boolean;
	setFlg(flg: boolean): void;
}

const ConfirmPost = ({ body, flg, setFlg }: ConfirmPostProps) => {
	// reducer 연결하면 body, flg, setFlg props 제거하기
	// useSelector flg, thumbnail, descript, body
	// thumbnail ,descript 없으면 파싱해서 찾기
	const [des, setDes] = useState('');
	const [tog, setTog] = useState(false);
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

	useEffect(() => {
		if (!flg || !body) return;

		const parseDesList = marked(body).match(/<\s*p[^>]*>([^<]*)<\s*\/\s*p\s*>/g);
		const parseDes = parseDesList?.join(' ').replace(/(<([^>]+)>)/gi, '');

		setDes(parseDes ? parseDes : '');
		const thumb_imgs = body
			.match(/!\[[^\]]*?\]\([^)]+\)/g)
			?.map((img, i) => img.replace(/!\[[^\]]*?\]\(/g, '').replace(')', ''));

		setThumbnails(thumb_imgs ? thumb_imgs : []);
	}, [flg]);

	return (
		<ConfirmPage
			style={{
				left: flg ? 0 : '100%',
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
							setFlg(!flg);
						}}
					>
						취소하기
					</div>
					<div
						className={tog ? 'selected' : ''}
						onClick={() => {
							setTog(!tog);
						}}
					>
						{tog ? '공개' : '비공개'}
					</div>
					<div className="submit">작성하기</div>
				</SubmitButtonBox>
			</div>
		</ConfirmPage>
	);
};

export default ConfirmPost;
