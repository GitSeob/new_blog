import React, { useCallback, useRef } from 'react';
import { ImageButton } from './style';

interface WriteHeaderProps {
	onUploadImage(file: any): void;
}

const InputImage = ({ onUploadImage }: WriteHeaderProps) => {
	const imageInput = useRef() as React.MutableRefObject<HTMLInputElement>;

	const onClickImageButton = useCallback(() => {
		imageInput.current.click();
	}, []);

	const onChangeImg = useCallback((e) => {
		onUploadImage(e.target.files[0]);
	}, []);

	return (
		<ImageButton onClick={onClickImageButton}>
			<img src="/image.svg" />
			<input
				type="file"
				accept=".gif, .jpg, .png"
				ref={imageInput}
				onChange={onChangeImg}
				style={{ width: 0, height: 0 }}
			/>
		</ImageButton>
	);
};

export default InputImage;
