import React, { useState, useEffect } from "react";
import "../../App.css";
import { Table } from "../Table";
import { getSongs, addSong, editSong, removeSong } from "../../services/songs.service";
import { getPlaylists, addSongToPlaylist } from "../../services/playlists.service";
import { getArtists } from "../../services/artists.service";
import { Modal } from "../Modal";

let addToPlaylistForm = new Map();
let formEdit = new Map();

export default function Songs(props) {
	const [cols] = useState(["Name", "Actions"]);
	const [data, setData] = useState([]);
	const closeModalHandler = () => setShow(false);
	const closeAddModalHandler = () => setShowAddModal(false);
	const [show, setShow] = useState(false);
	const [showAddModal, setShowAddModal] = useState(false);
	const [artists, setArtists] = useState([]);
	const [playlists, setPlaylists] = useState([]);
	const [showEdit, setShowEdit] = useState(false);
	const closeEditModalHandler = () => setShowEdit(false);

	let form = new Map();

	const getSongsQuery = () => {
		getSongs().then(
			function (songs) {
				setData(songs);
			},
			function (error) {
				console.log("Failed to retrieve song data");
				console.error(error);
			}
		);
	};

	const SendAddForm = () => {
		let sendData = {
			sid: addToPlaylistForm.get("sid"),
			playlistName: addToPlaylistForm.get("playlist"),
		};
		console.log(sendData);
		addSongToPlaylist(sendData).then(
			function (results) {
				console.log("Success: added song to playlist");
			},
			function (error) {
				console.log("Error: failed to add song to playlist");
			}
		);
	}

	const SendForm = () => {
		let sendData = {
			name: form.get("name"),
			artist: form.get("artist"),
		};
		console.log(sendData);

		addSong(sendData).then(
			function (results) {
				console.log("Success: added song '" + sendData.name + "'");
				getSongsQuery();
			},
			function (error) {
				console.log("Error: failed to add song '" + sendData.name + "'");
			}
		);
	};

	const onChange = (element, changes) => {
		form.set(element, changes);
	};

	const onChangeAddModal = (element, changes) => {
		addToPlaylistForm.set(element, changes);
	};



	useEffect(() => {
		// let deferred = q.defer();
		getArtists().then(
			function (results) {
				setArtists(results);
			},
			function (error) {
				console.log("Error: Failed to retrieve artist data");
				console.log(error);
			}
		);

		getPlaylists().then(
			function (results) {
				setPlaylists(results);
			},
			function (error) {
				console.log("Error: Failed to retrieve artist data");
				console.log(error);
			}
		);
		// return deferred.promise;
	}, []);

	useEffect(() => {
		getSongsQuery();
	}, []);

	const Remove = (row) => {
		console.log("id is " + row.id);
		let sendData = {
			id: row.id
		}
		removeSong(sendData).then(
			function (results) {
				console.log(results);
				getSongsQuery();
			},
			function (error) {
				console.log("Failed to remove user");
				console.error(error);
			}
		);
	};

	const AddToPlaylist = (row) => {
		setShowAddModal(true);
		addToPlaylistForm.set("sid", row.id);
	}

	const Edit = (row) => {
		formEdit.set("id", row.id);
		formEdit.set("name", row.name);
		setShowEdit(true);
	}

	const onChangeEdit = (element, changes) => {
		formEdit.set(element, changes);
	};

	const SendFormEdit = () => {
		let sendData = {
			id: formEdit.get("id"),
			name: formEdit.get("name"),
		};
		console.log(sendData);

		editSong(sendData).then(
			function (result) {
				console.log(result);
				getSongsQuery();
			},
			function (error) {
				console.error(error);
			}
		);
	};

	return (
		<>
			{(show || showAddModal || showEdit) ? (
				<div
					onClick={closeModalHandler}
					className="back-drop fadeIn first"
				></div>
			) : null}

			<div className="songs flex-page flex-page-column">
				<div>
					<button onClick={() => setShow(true)} className="btn btn-primary">
						Add new song
					</button>
				</div>

				{show ? (
					<Modal
						show={show}
						close={closeModalHandler}
						title="Add Song"
						inputs={["name"]}
						selects={["artist"]}
						onChange={onChange}
						onSubmit={SendForm}
						selectOptions={[artists]}
					/>
				) : null}

				{showAddModal ? (
					<Modal
						show={showAddModal}
						close={closeAddModalHandler}
						title="Add Song to Playlist"
						inputs={[]}
						selects={["playlist"]}
						onChange={onChangeAddModal}
						onSubmit={SendAddForm}
						selectOptions={[playlists]}
					/>
				) : null}	

				
				{showEdit ? (
					<Modal
						show={showEdit}
						close={closeEditModalHandler}
						title="Edit Song"
						inputs={["name"]}
						selects={[]}
						onChange={onChangeEdit}
						onSubmit={SendFormEdit}
						selectOptions={[]}
					/>
				) : null}

				<Table 
					title="Songs" 
					cols={cols} 
					data={data} 
					property="song" 
					remove={Remove}
					add={AddToPlaylist}
					addTo="playlist"
					edit={Edit}>
				</Table>
			</div>
		</>
	);
}
