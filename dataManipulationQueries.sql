--users
--add
INSERT INTO `users` (`username`, `password`) VALUES 
(:usernameInput, :passwordInput);

--edit
UPDATE `users`
SET `username`=:usernameInput, `password`=:passwordInput
WHERE `id`=:userIDInput 

--remove user
DELETE FROM `users` WHERE `username`=:usernameInput;
DELETE FROM `users` WHERE `id`=:userID

--select users (READ)
SELECT COUNT(*) FROM `users` where `username`=:usernameInput AND `password`=:passwordInput;


--playlists
--add
INSERT INTO `playlists` (`name`, `user`) VALUES 
(:playlistNameInput, (SELECT `id` FROM `users` WHERE `name`=:usernameInput));

--edit
UPDATE `playlists` SET `name`=playlistNameInput WHERE `id`=playlistIDInput

--remove
DELETE FROM `playlists` WHERE `name`=:playlistNameInput;
--read
SELECT playlists.id, playlists.name, users.username FROM `playlists` INNER JOIN `users` on users.id=playlists.user;


--songs
--add
INSERT INTO `songs` (`name`) VALUES 
(:songNameInput);

INSERT INTO `artists` (`name`) VALUES 
(:songArtistName);

INSERT INTO `song_artist_association` (`songID`, `artistID`) VALUES 
((SELECT `id` FROM `songs` WHERE `name`=:songNameInput), (SELECT `id` FROM `artists` WHERE `name`=:songArtistName));

--read
SELECT * FROM `songs`


--edit
UPDATE `songs` SET `name`=:songNameInput WHERE `id`=:songIDInput

--remove
DELETE FROM `playlist_song_associations` WHERE `songID`=:songIDInput;
DELETE FROM `song_artist_associations` WHERE `songID`=:songIDInput; 
DELETE FROM `songs` WHERE `id`=:songIDInput;

--artists
--add
INSERT INTO `artists` (`name`) VALUES 
(:artistNameInput);

--edit
UPDATE `artists` SET `name`=:artistNameInput WHERE `id`=:artistID

--read
SELECT * FROM `artists`

--remove
DELETE FROM `song_artist_associations` WHERE `artistID`=?;
DELETE FROM `artists` WHERE `id`=?;

--add song to playlist
INSERT INTO `playlist_song_association` (`playlistID`, `songID`) VALUES 
((SELECT `id` FROM `playlists` WHERE `name`=:playlistNameInput), (SELECT `id` FROM `songs` WHERE `name`=:songNameInput));

--delete from from playlist
DELETE FROM `playlist_song_association` WHERE 
	`playlistID`=(SELECT `id` FROM `playlists` WHERE `name`=:playlistNameInput) AND 
	`songID`=(SELECT `id` FROM `songs` WHERE `name`=:songNameInput);
	
--select playlist
SELECT * FROM `playlist_song_association` WHERE `playlistID`=(SELECT `id` FROM `playlists` WHERE `name`=:playlistNameInput);
	
--song search
SELECT * FROM `songs` WHERE `name`=:searchText;

--artist search
SELECT * FROM `artists` WHERE `name`=:searchText;

--remove song from playlist
DELETE FROM `playlist_song_associations` WHERE `songID`=? AND `playlistID`=:playlistIDInput;

--getting a single playlist
SELECT `name` from `playlists` where `id`=:playlistsIDInput;
SELECT songs.id, songs.name AS songName, artists.name AS artistName FROM `songs` INNER JOIN `playlist_song_associations` ON playlist_song_associations.songID=songs.id 
INNER JOIN `song_artist_associations` ON song_artist_associations.songID=playlist_song_associations.songID 
INNER JOIN `artists` ON artists.id=song_artist_associations.artistID 
WHERE playlist_song_associations.playlistID=:playlist_song_associationsPlaylistIDInput;