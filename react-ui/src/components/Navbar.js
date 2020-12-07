import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, SignUpButton } from "./Button";
import "./Navbar.css";

//Login, account, playlist, playlists, search,
function Navbar() {
	const [click, setClick] = useState(false);
	const [button, setButton] = useState(true);
	const [loggedIn, setLoggedin] = useState(false);

	const handleClick = () => setClick(!click);
	const closeMobileMenu = () => setClick(false);

	const showButton = () => {
		if (window.innerWidth <= 960) {
			setButton(false);
		} else {
			setButton(true);
		}
	};

	useEffect(() => {
		showButton();
	}, []);

	window.addEventListener("resize", showButton);

	function refreshPage() {
		window.location.reload(false);
	}

	return (
		<>
			<nav className="navbar">
				<div className="navbar-container">
					<Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
						<div className="flex-no-wrap">
							<span role="img" aria-label="chord">
								🎼
							</span>
							<span>Classify</span>
						</div>
						{/* <img src="./public/logo.png" alt="Classify Logo"/> */}
					</Link>
					<div className="menu-icon" onClick={handleClick}>
						<i className={click ? "fas fa-times" : "fas fa-bars"} />
					</div>
					<ul className={click ? "nav-menu active" : "nav-menu"}>
						<li className="nav-item">
							<Link
								to="/search"
								className="nav-links"
								onClick={closeMobileMenu}
							>
								<span role="img" aria-label="magnifying-glass">
									🔍
								</span>
								<span>Search</span>
							</Link>
						</li>
						<li className="nav-item">
							<Link to="/songs" className="nav-links" onClick={closeMobileMenu}>
								<span role="img" aria-label="headphone">
									🎧
								</span>
								<span>Songs</span>
							</Link>
						</li>
						<li className="nav-item">
							<Link
								to="/artists"
								className="nav-links"
								onClick={closeMobileMenu}
							>
								<span role="img" aria-label="guitar">
									🎸
								</span>
								<span>Artists</span>
							</Link>
						</li>
						<li className="nav-item">
							<Link
								to="/playlists"
								className="nav-links"
								onClick={closeMobileMenu}
							>
								<span role="img" aria-label="music">
									🎶
								</span>
								<span>Playlists</span>
							</Link>
						</li>

						<li className="nav-item">
							<Link to="/admin" className="nav-links" onClick={closeMobileMenu}>
								<span role="img" aria-label="guy">
									🤵
								</span>
								<span>Admin</span>
							</Link>
						</li>
					</ul>
					<>
						{!loggedIn && localStorage.getItem("user") === null
							? button && (
									<>
										<SignUpButton buttonStyle="btn--outline">
											Sign up
										</SignUpButton>
										<Button buttonStyle="btn--medium">Log in</Button>
									</>
							  )
							: button && (
									<>
										<Button
											buttonStyle="btn--medium"
											onClick={(e) => {
												localStorage.clear();
												refreshPage();
												setLoggedin(true);
											}}
										>
											Logout
										</Button>
									</>
							  )}
					</>
				</div>
			</nav>
		</>
	);
}
export default Navbar;
