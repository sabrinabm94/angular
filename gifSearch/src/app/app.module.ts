import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";

//components
import { AppComponent } from "./app.component";
import { GifSearchComponent } from "./ui/gif-search/gif-search.component";
import { GifResultsComponent } from "./ui/gif-results/gif-results.component";
import { ButtonComponent } from "./feature/button/button.component";
import { InputComponent } from "./feature/input/input.component";
import { PictureComponent } from "./feature/picture/picture.component";
import { FormComponent } from "./feature/form/form.component";

//services
import { GifSearchService } from "./api/git-search.service";

@NgModule({
  providers: [GifSearchService],
  declarations: [
    AppComponent,
    GifSearchComponent,
    GifResultsComponent,
    ButtonComponent,
    InputComponent,
    PictureComponent,
    FormComponent,
  ],
  exports: [AppComponent],
  bootstrap: [AppComponent],
  imports: [HttpClientModule, BrowserModule, FormComponent],
})
export class AppModule {}
