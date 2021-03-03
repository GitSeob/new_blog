import useInput from '@hooks/useInput';
import { LOAD_USER_REQUSET, LOGIN_REQUEST } from '@reducers/user';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { END } from 'redux-saga';
import wrapper from '@store/configureStore';
import { RootState } from '@reducers/index';
import { useRouter } from 'next/dist/client/router';
import axios from 'axios';
import LoadingFilter from '@components/layout/LoadingFilter';
import styled from 'styled-components';

const Login = () => {
	const [username, onChangeUsername] = useInput('');
	const [password, onChangePassword] = useInput('');
	const dispatch = useDispatch();
	const { user } = useSelector((state: RootState) => state.user);
	const loading = useSelector((state: RootState) => state.loading);
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
		if (user) router.push('/');
	}, [user]);

	return (
		<>
			{loading.LOGIN_REQUEST && <LoadingFilter />}
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
		</>
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

export const LoginContainer = styled.div`
	padding: 40px 20px;

	display: flex;
	align-items: center;
	justify-content: center;
	height: calc(100vh - 40px);

	& > div {
		background: #fff;
		box-shadow: 0 0 4px 1px rgba(0, 0, 0, 0.16);

		img {
			width: 280px;
		}

		& > form {
			width: 280px;
			padding: 1rem;

			div {
				line-height: 1.8;
				font-size: 10px;
				padding: 1rem;
				border: 1px solid #ddd;
				border-bottom: none;
				position: relative;

				p {
					width: 60px;
				}

				&:nth-child(3) {
					border-top: 1px solid #ddd;
				}

				input {
					position: absolute;
					right: 0;
					height: 18px;
					font-size: 12px;
					width: 160px;
				}
			}

			& > input[type='submit'] {
				padding: 1rem;
				border: 1px solid #ddd;
				color: #707070;
				width: 100%;
				cursor: pointer;
				font-weight: 500;
				background: #ddd;
				transition: 0.3s;

				&:hover {
					background: rgba(95, 58, 154, 0.63);
					border: 1px solid rgba(95, 58, 154, 0.13);
					color: #fff;
				}
			}
		}
	}
`;
