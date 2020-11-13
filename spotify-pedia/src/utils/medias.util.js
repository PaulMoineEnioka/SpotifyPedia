const getTrackMedias = async(artistName, trackName) => {
    const youtubeVideoStartLink = 'http://www.youtube.com/watch?v=';
    try {
        const res = await fetch(
            `https://theaudiodb.com/api/v1/json/1/searchtrack.php?s=${artistName}&t=${trackName}`
        );
        const jsonResponse = await res.json();
        if (jsonResponse && jsonResponse.track && jsonResponse.track.length) {
            const track = jsonResponse.track[0];
            console.log(track);
            const trackPicture = track.strTrackThumb;
            const trackVideo = track.strMusicVid;
            let trackVideoId;
            if (trackVideo && trackVideo.startsWith(youtubeVideoStartLink)) {
                trackVideoId = trackVideo.substring(
                    youtubeVideoStartLink.length,
                    trackVideo.length
                );
            }
            return {
                picture: trackPicture,
                video: trackVideoId,
            };
        }
    } catch (error) {
        console.error(error);
    }
    return {
        picture: '',
        video: '',
    };
};

const getSingerMedias = async(singerName) => {
    try {
        const res = await fetch(
            `https://theaudiodb.com/api/v1/json/1/search.php?s=${singerName}`
        );
        const jsonResponse = await res.json();
        if (jsonResponse && jsonResponse.artists && jsonResponse.artists.length) {
            const singer = jsonResponse.artists[0];
            const singerPicture = singer.strArtistThumb;
            return {
                picture: singerPicture,
            };
        }
    } catch (error) {
        console.error(error);
    }
    return {
        picture: '',
    };
};

export default {
    getTrackMedias,
    getSingerMedias,
}