class PlaylistService {
    playlists = new Map();
    constructor() {
    }
    constructor(playlists) {
        playlists.forEach((playlist) => this.playlists.set(playlist.name, playlist))
    }
    addPlaylist(playlist){
        this.playlists.set(playlist.name, playlist)
    }
    getAllPlaylists(){
        return Array.from(this.playlists.values())
    }
}

export default PlaylistService