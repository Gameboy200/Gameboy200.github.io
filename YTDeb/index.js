let vidid = ''
let mode = false

async function getVideoTitle(videoId, apiKey) {
    const url = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${apiKey}&part=snippet`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.items && data.items.length > 0) {
            const stuff = data.items[0].snippet;
            const title = stuff.title;
            const desc = stuff.description;
            const thumb = stuff.thumbnails.standard.url;
            return { title, desc, thumb };
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error fetching video title:', error);
        return null;
    }
}

function handleSelection() {
            const selectElement = document.getElementById('options');
            const selectedOption = selectElement.value;
            console.log(`You selected: ${selectedOption}`)
			if (selectedOption === 'Video') {
				mode = false
            } else if (selectedOption === 'Audio'){
				mode = true
			}
		}

async function downloadMedia(videoQuality = "1080", audioFormat = "mp3", downloadMode = mode) {
    var inputText = 'https://www.youtube.com/watch/' + vidid
	var urrl = inputText
    //const apiUrl = "https://api.cobalt.tools/api/json";
	const apiUrl = "https://cobalt-7.kwiatekmiki.com/api/json";
	if (vidid == ''){
		alert('No URL found')
		return
	}

    // Headers including the required fields
    const headers = {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.121 Safari/537.36"
    };

    // Request body
    const payload = {
        url: urrl,
        vQuality: videoQuality,
        aFormat: audioFormat,
        isAudioOnly: downloadMode,
        filenamePattern: "basic"
    };

    try {
        // Sending POST request
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(payload)
        });

        // Check the response status
        if (response.ok) {
            const data = await response.json();
            console.log(`Download URL: ${data.url || 'No URL found'}`);
			let uul = data.url
			window.location = uul;
        } else {
            console.error(`Error ${response.status}: ${await response.text()}`);
        }
    } catch (error) {
        console.error('Network error:', error);
    }
}

function format(inputString) {
    const maxLineLength = 30;
    const maxTotalCharacters = 90;

    if (inputString.length > maxTotalCharacters) {
        inputString = inputString.slice(0, maxTotalCharacters - 3) + "...";
    }

    const lines = [];
    for (let i = 0; i < inputString.length; i += maxLineLength) {
        lines.push(inputString.slice(i, i + maxLineLength));
    }

    const formattedString = lines.join('\n');
    return formattedString;
}

function getYouTubeVideoID(url) {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|(?:youtu\.be\/))([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null; // return video ID or null if not found
}

const input = document.getElementById('myInput');
const titleElement = document.getElementById('Title');
const descElement = document.getElementById('Description');
const thumbElement = document.getElementById('Thumbnail');
const API_KEY = 'AIzaSyDc8oWR7H7LYKA4_MXpdAwl6GzcOZ6jomU';

input.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
		var urlll = input.value
		var vid = getYouTubeVideoID(urlll);
		vidid = vid 
        getVideoTitle(vid, API_KEY).then(videoData => {
            if (videoData) {
                const funny = format(videoData.desc);
                console.log(videoData.title);
                console.log(funny);
                console.log(videoData.thumb);

                // Update the DOM elements with the fetched data
                titleElement.textContent = videoData.title;
                descElement.textContent = funny;
                thumbElement.src = videoData.thumb;
            } else {
                console.log('Video not found.');
				alert('Video not found.')
            }
        });
    }
});
