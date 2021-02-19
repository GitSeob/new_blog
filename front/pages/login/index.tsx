import useInput from '@hooks/useInput';
import { LOAD_USER_REQUSET, LOGIN_REQUEST } from '@reducers/user';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { END } from 'redux-saga';
import wrapper from '@store/configureStore';
import { LoginContainer } from './style';
import { RootState } from '@reducers/index';
import { useRouter } from 'next/dist/client/router';
import axios from 'axios';

const Login = () => {
	const [username, onChangeUsername] = useInput('');
	const [password, onChangePassword] = useInput('');
	const dispatch = useDispatch();
	const { user } = useSelector((state: RootState) => state.user);
	const router = useRouter();
	const onSubmitLogin = React.useCallback(
		(e) => {
			e.preventDefault();
			if (username.length < 4 || password.length < 8) return;
			dispatch({
				type: LOGIN_REQUEST,
				payload: { username, password },
			});
		},
		[username, password],
	);

	React.useEffect(() => {
		if (user) router.back();
	}, [user]);

	return (
		<LoginContainer>
			<div>
				<img src="/ogImage.png" />
				<form onSubmit={onSubmitLogin}>
					<div>
						<label>
							ID
							<input
								type="text"
								placeholder="아이디를 입력해주세요"
								value={username}
								onChange={onChangeUsername}
							/>
						</label>
					</div>
					<div>
						<label>
							PASSWORD
							<input
								type="password"
								placeholder="비밀번호를 입력해주세요"
								autoComplete="off"
								value={password}
								onChange={onChangePassword}
							/>
						</label>
					</div>
					<input type="submit" value="LOGIN" />
				</form>
			</div>
		</LoginContainer>
	);
};

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
	const cookie = context.req ? context.req.headers.cookie : '';
	axios.defaults.headers.Cookie = '';
	if (context.req && cookie) {
		axios.defaults.headers.Cookie = cookie;
	}
	context.store.dispatch({
		type: LOAD_USER_REQUSET,
	});
	context.store.dispatch(END);
	await context.store.sagaTask.toPromise();
});

export default Login;
