import React from 'react';
import { LoginContainer } from './style';

const Login = () => {
	return (
		<LoginContainer>
			<div>
				<img src="/ogImage.png" />
				<form>
					<div>
						<label>
							ID
							<input type="text" placeholder="아이디를 입력해주세요" />
						</label>
					</div>
					<div>
						<label>
							PASSWORD
							<input type="password" placeholder="비밀번호를 입력해주세요" autoComplete="off" />
						</label>
					</div>
					<input type="submit" value="LOGIN" />
				</form>
			</div>
		</LoginContainer>
	);
};

export default Login;
