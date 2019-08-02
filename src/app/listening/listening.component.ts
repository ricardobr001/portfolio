import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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

    constructor(
        private http: HttpClient
    ) { }

    ngOnInit() {
        this.getCurrentSong();
        this.getTopArtists();
    }

    getTopArtists() {
        this.http.get(`${this.BACKEND}/lastTopArtists`)
        .subscribe(res => {
            console.log(res)
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
        });
    }

    reload() {
        this.getCurrentSong();
    }
}
