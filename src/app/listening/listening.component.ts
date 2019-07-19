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
    SHAREDSECRET = '255c4b4363d2b2729fbdeb0957da1fb0';
    totalScrobble: number;
    listening: boolean;
    song: any;
    lyric: string;
    array: Array<JSON>;

    constructor(
        private http: HttpClient
    ) { }

    ngOnInit() {
        this.http.get('https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=ricardobr001&api_key=' + this.LAST_APIKEY + '&format=json')
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

        this.http.get('https://ws.audioscrobbler.com/2.0/?method=user.gettopartists&user=ricardobr001&api_key=' + this.LAST_APIKEY + '&format=json&limit=6')
        .subscribe(res => {
            this.array = res['topartists']['artist'];
        });
    }

    getLyric() {
        this.http.get('https://api.vagalume.com.br/search.php?apikey=' + this.VAGALUME_APIKEY + '&art=' + this.song['artist']['#text'] + '&mus=' + this.song['name'])
        .subscribe(res => {
            if (!res['type'].localeCompare('song_notfound') || !res['type'].localeCompare('notfound')) {
                this.lyric = '404 NOT FOUND<br>¯\\_(ツ)_/¯';
            } else {
                this.lyric = res['mus'][0]['text'].replace(new RegExp('\n', 'g'), '<br>');
            }
        });
    }

    reload() {
        this.ngOnInit();
    }

}
