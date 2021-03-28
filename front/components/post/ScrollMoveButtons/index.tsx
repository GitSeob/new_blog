import { FC, MutableRefObject, MouseEvent } from 'react';
import { MoveScrollButtonBox } from './style';

interface IScrollMoveButtons {
	pageRef: MutableRefObject<HTMLDivElement>;
	categoryRef: MutableRefObject<HTMLDivElement>;
}

const ScrollMoveButtons: FC<IScrollMoveButtons> = ({ pageRef, categoryRef }) => {
	const moveScroll = (contentRef: MutableRefObject<HTMLDivElement>) => (e: MouseEvent<HTMLDivElement>) => {
		contentRef.current.scrollIntoView({ behavior: 'smooth' });
	};

	return (
		<MoveScrollButtonBox>
			<div onClick={moveScroll(pageRef)}>
				<img src="/arrow_black.svg" alt="arrow" />
			</div>
			<div onClick={moveScroll(categoryRef)}>
				<img src="/arrow_black.svg" alt="arrow" />
			</div>
		</MoveScrollButtonBox>
	);
};

export default ScrollMoveButtons;
