import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Phrases } from './Phrases';

@Component({
    selector: 'app-listening',
    templateUrl: './listening.component.html',
    styleUrls: ['./listening.component.css']
})
export class ListeningComponent implements OnInit {
    BACKEND= 'https://ricardobr001-backend.herokuapp.com';
    totalScrobble = 0;
    listening: boolean;
    song: any;
    lyric: string;
    array: any;
    countUpOptions = {
        separator: '.',
        duration: 4
    };
    loading: boolean;
    reloading: string;
    phrase: string;

    constructor(
        private http: HttpClient
    ) { }

    ngOnInit() {
        const phrases = new Phrases();
        this.phrase = phrases.getPhrase();
        this.loading = true;
        this.reloading = '';
        this.getCurrentSong();
        this.getTopArtists();
    }

    getTopArtists() {
        this.http.get(`${this.BACKEND}/lastTopArtists`)
        .subscribe(res => {
            this.array = res;
        });
    }

    getCurrentSong() {
        this.http.get(`${this.BACKEND}/lastSong`)
        .subscribe(res => {
            this.totalScrobble = res['totalScrobble'];
            this.listening = res['listening'];

            this.song = {
                image: res['image'],
                name: res['name'],
                artist: res['artist'],
                lyric: res['lyric'].replace(new RegExp('\n', 'g'), '<br>')
            };

            this.loading = false;
            this.reloading = '';
        });
    }

    reload() {
        this.reloading = 'fa-spin';
        this.getCurrentSong();
    }
}
