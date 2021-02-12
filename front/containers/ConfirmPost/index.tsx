import React, { ChangeEvent, useEffect, useState } from 'react';
import { ConfirmPage, ThumbnailBox, SubmitButtonBox } from './style';
import marked from 'marked';

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
	const [thumbnail, setThumbnail] = useState('');

	const onChangeDes = React.useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
		e.preventDefault();
		if (e.target.value.length > 160) return;
		setDes(e.target.value);
	}, []);

	useEffect(() => {
		if (!flg || !body) return;

		const parseDesList = marked(body).match(/<\s*p[^>]*>([^<]*)<\s*\/\s*p\s*>/g);
		const parseDes = parseDesList?.join(' ').replace(/(<([^>]+)>)/gi, '');

		setDes(parseDes ? parseDes : '');
		const thumb_imgs = body.match(/!\[[^\]]*?\]\([^)]+\)/g);
		if (thumb_imgs) setThumbnail(thumb_imgs[0].replace(/!\[[^\]]*?\]\(/g, '').replace(')', ''));
	}, [body, flg]);

	return (
		<ConfirmPage
			style={{
				left: flg ? 0 : '100%',
			}}
		>
			<div>
				<h3>썸네일 미리보기</h3>
				<ThumbnailBox
					style={{
						backgroundImage: `url(${thumbnail ? thumbnail : ''})`,
					}}
				>
					{!thumbnail && <img src="/imageinput.svg" />}
					<div>
						<div>이미지 업로드</div>
						<div>썸네일 제거</div>
					</div>
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
