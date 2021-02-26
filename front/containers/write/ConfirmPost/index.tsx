import React, { useCallback, ChangeEvent, useEffect, useState } from 'react';
import { ConfirmPage, SubmitButtonBox } from './style';
import marked from 'marked';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@reducers/index';
import { CLOSE_CONFIRM_POST } from '@reducers/posting';
import { WRITE_POST_REQUEST } from '@reducers/post';
import SetThumbnail from '@components/write/SetThumbnail';
import { IPost } from '@typings/datas';

interface ConfirmPostProps {
	title: string;
	post: IPost | null;
}

const ConfirmPost = ({ title, post }: ConfirmPostProps) => {
	const { body, isOpen, categories, isEditingId } = useSelector((state: RootState) => state.posting);
	const dispatch = useDispatch();
	const [des, setDes] = useState(post ? post.description : '');
	const [isVisible, setVisible] = useState(post ? post.is_visible : true);
	const [thumbnails, setThumbnails] = useState(post?.thumbnail ? [post.thumbnail] : ([] as string[]));
	const [tnIndex, setTnIndex] = useState(0);

	const onChangeDes = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
		e.preventDefault();
		if (e.target.value.length > 160) return;
		setDes(e.target.value.replace('\n', ''));
	}, []);

	const removeThumbnail = useCallback(() => {
		setThumbnails(thumbnails.filter((img, i) => i !== tnIndex));
		setTnIndex(tnIndex > 0 ? tnIndex - 1 : 0);
	}, [tnIndex, thumbnails]);

	const addThumbnail = useCallback(
		(newImage) => {
			setThumbnails([newImage, ...thumbnails]);
			setTnIndex(0);
		},
		[categories],
	);

	const onSubmitPost = useCallback(() => {
		if (!(body && title && des)) {
			alert('description은 필수 입력 항목입니다.');
			return;
		}
		dispatch({
			type: WRITE_POST_REQUEST,
			payload: {
				isEditingId: isEditingId,
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

		if (parseDes) setDes(parseDes.length ? parseDes.slice(0, 160) : parseDes);
		const thumb_imgs = body
			.match(/!\[[^\]]*?\]\([^)]+\)/g)
			?.map((imgString: string) => imgString.replace(/!\[[^\]]*?\]\(/g, '').replace(')', ''));

		setThumbnails(thumb_imgs ? [...thumbnails, ...thumb_imgs] : thumbnails);
	}, [isOpen]);

	return (
		<ConfirmPage
			style={{
				left: isOpen ? 0 : '100%',
			}}
		>
			<div>
				<h3>썸네일 미리보기</h3>
				<SetThumbnail
					thumbnails={thumbnails}
					tnIndex={tnIndex}
					removeThumbnail={removeThumbnail}
					setTnIndex={setTnIndex}
					addThumbnail={addThumbnail}
				/>
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
