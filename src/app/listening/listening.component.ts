import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-listening',
    templateUrl: './listening.component.html',
    styleUrls: ['./listening.component.css']
})
export class ListeningComponent implements OnInit {
    LAST_APIKEY = 'f973e433d0f6fb9ec86954784d0240a8';
    VAGALUME_APIKEY = '660a4395f992ff67786584e238f501aa';
    FANART_APIKEY = '6a9aed206f07b70d5e99153ac6641107';
    SHAREDSECRET = '255c4b4363d2b2729fbdeb0957da1fb0';
    NUMBER_OF_ARTISTS = 15;
    ARTISTS_ARRAY_SIZE = 3;
    totalScrobble: number;
    listening: boolean;
    song: any;
    lyric: string;
    array: Array<JSON>;

    constructor(
        private http: HttpClient
    ) { }

    ngOnInit() {
        this.http.get(`https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=ricardobr001&api_key=${this.LAST_APIKEY}&format=json`)
        .subscribe(res => {
            this.totalScrobble = res['recenttracks']['@attr']['total'];

            if (res['recenttracks']['track'][0]['@attr']) {
                this.listening = true;
            } else {
                this.listening = false;
            }

            this.song = res['recenttracks']['track'][0];
            this.getLyric();
        });

        this.http.get(`https://ws.audioscrobbler.com/2.0/?method=user.gettopartists&user=ricardobr001&api_key=${this.LAST_APIKEY}&format=json&limit=${this.NUMBER_OF_ARTISTS}`)
        .subscribe(res => {
            this.array = [];

            this.randomNumbers(this.NUMBER_OF_ARTISTS).forEach(index => {
                res['topartists']['artist'][index]['image'] = '';
                this.array.push(res['topartists']['artist'][index]);
            });

            this.recoverArtistImage();
            console.log(this.array);
        });
    }

    randomNumbers(len: number): Array<number> {
        const numbers = [];

        while (numbers.length != this.ARTISTS_ARRAY_SIZE) {
            let n = Math.floor(Math.random() * len);
            while (numbers.find(x => x === n)) {
                n = Math.floor(Math.random() * len);
            }
            numbers.push(n);
        }

        return numbers;
    }

    getLyric() {
        this.http.get(`https://api.vagalume.com.br/search.php?apikey=${this.VAGALUME_APIKEY}&art=${this.song['artist']['#text']}&mus=${this.song['name']}`)
        .subscribe(res => {
            if (!res['type'].localeCompare('song_notfound') || !res['type'].localeCompare('notfound')) {
                this.lyric = '404 NOT FOUND<br>¯\\_(ツ)_/¯';
            } else {
                this.lyric = res['mus'][0]['text'].replace(new RegExp('\n', 'g'), '<br>');
            }
        });
    }

    recoverArtistImage() {
        this.array.forEach((obj, index) => {
            this.artistMusicBrainzId(obj['name'], index);
        });
    }

    artistMusicBrainzId(artist: string, index: number) {
        this.http.get(`https://musicbrainz.org/ws/2/artist/?query=artist:${artist}&fmt=json`)
        .subscribe(res => {
            this.artistFanartPicture(res['artists'][0]['id'], index);
        });
    }

    artistFanartPicture(id: string, index: number) {
        this.http.get(`https://webservice.fanart.tv/v3/music/${id}&?api_key=${this.FANART_APIKEY}&format=json`)
        .subscribe(res => {
            const randomImageIndex = Math.floor(Math.random() * res['artistbackground'].length);
            this.array[index]['image'] = res['artistbackground'][randomImageIndex]['url'];
        },
        err => {
            this.array[index]['image'] = 'assets/img/rockbandnotfound.png';
        });
    }

    reload() {
        this.ngOnInit();
    }
}
