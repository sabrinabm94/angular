import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { GifSearchService } from "../../api/git-search.service";
import { FormGroup, Validators, FormControl } from "@angular/forms";

@Component({
  selector: "app-gif-search",
  templateUrl: "./gif-search.component.html",
  styleUrls: ["./gif-search.component.css"],
  providers: [GifSearchService],
})
export class GifSearchComponent implements OnInit {
  @Output() receiveGifs = new EventEmitter<any[]>();

  public gifs: any[] = [];
  public form: FormGroup;
  public limitPattern: String;
  public termPattern: String;
  public error: any;

  //inclusão do service: injeção de dependencia ou inversão de controles
  constructor(private service: GifSearchService) {}

  ngOnInit() {
    this.buildForm();
    this.searchByAsync(null);
  }

  //async
  async searchByAsync(form: FormGroup) {
    this.error = null;
    let response = await this.service
      .searchGif(form.value.term, form.value.limit)
      .toPromise()
      .catch((error) => (this.error = error));
    this.verifyResponse(response.data);
    console.log(response);
  }

  buildForm() {
    this.limitPattern = this.service.limitPattern;
    this.termPattern = this.service.termPattern;
    this.form = new FormGroup({
      limit: new FormControl([Validators.required]),
      term: new FormControl([Validators.required]),
    });

    this.form.reset();
  }

  searchGifs = (gifs: any): void => {
    this.receiveGifs.emit(gifs);
  };

  verifyResponse(response: any): any {
    this.gifs = [];

    if (this.error == null) {
      response.forEach((gif) => {
        this.gifs.push(gif);
      });
      this.searchGifs(this.gifs);
      return this.gifs;
    } else {
      return this.error;
    }
  }

  searchBySubscribe(form: FormGroup, $event) {
    console.log(form);
    $event.preventDefault();
    this.error = null;
    this.service
      .searchGifObservable(form.value.term, form.value.limit)
      .subscribe(
        (response) => this.verifyResponse(response.data),
        (error) => (this.error = error)
      );
  }
}
