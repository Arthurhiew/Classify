import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Axios from "axios";
import "../../App.css";

export default function Login() {
	const history = useHistory();

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const apiUrl = "/api/login";
	const Authentication = (e) => {
		e.preventDefault();
		// debugger;
		const data1 = {
			username: username,
			password: password,
		};

		Axios.post(apiUrl, data1).then((result) => {
			// debugger;
			console.log(result);
			if (!result.data.length) {
				alert("Invalid User");
			} else {
				if (result.data[0]["COUNT(*)"] === 1) {
					alert("successful login");
					localStorage.setItem("user", data1.username);
					history.push("/songs");
					window.location.reload(true);
				} else {
					alert("Invalid User");
				}
			}
		});
	};
	return (
		<div className="wrapper fadeInDown">
			<div id="formContent">
				{/* <!-- Tabs Titles --> */}

				{/* <!-- Icon --> */}
				<div className="fadeIn first">
					<h2>Log in</h2>
				</div>

				{/* <!-- Login Form --> */}
				<form>
					<input
						type="text"
						id="login"
						onChange={(e) => {
							setUsername(e.target.value);
						}}
						className="fadeIn second"
						name="login"
						placeholder="username"
					/>
					<input
						type="password"
						id="password"
						onChange={(e) => {
							setPassword(e.target.value);
						}}
						className="fadeIn third"
						name="login"
						placeholder="password"
					/>
					<p>testers log in with ('admin', 'password')</p>
					<input
						type="submit"
						onClick={Authentication}
						className="fadeIn fourth"
						value="Log In"
					/>
				</form>
			</div>
		</div>
	);
}
