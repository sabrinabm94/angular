import { HeaderComponent } from "../../../../shared/components/header/header.component";
import { FooterComponent } from "../../../../shared/components/footer/footer.component";
import { Gif } from 'src/app/data/models/gif.model';
import { AfterViewInit, Component, ComponentRef, CUSTOM_ELEMENTS_SCHEMA, HostBinding, Injector, ViewChild, ViewContainerRef } from "@angular/core";

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements AfterViewInit {
  // Referências aos containers onde os componentes serão carregados dinamicamente
  @ViewChild('searchFormContainer', { read: ViewContainerRef }) searchFormContainer!: ViewContainerRef;
  @ViewChild('searchResultsContainer', { read: ViewContainerRef }) searchResultsContainer!: ViewContainerRef;

  SearchResultsComponent!: ComponentRef<any>; // Referência ao componente de resultados de busca

  @HostBinding('class') class: string = 'app-home-page';

  public gifs: Gif[] = [];

  constructor(private injector: Injector) { }

  // Método chamado após a visualização do componente ser inicializada
  ngAfterViewInit() {
    this.loadSearchFormComponent(); // Carrega dinamicamente o componente de formulário de busca
    this.loadSearchResultsComponent(); // Carrega dinamicamente o componente de resultados de busca
  }

  // Método para carregar dinamicamente o componente de formulário de busca
  async loadSearchFormComponent() {
    // Usa a função import() para carregar o módulo do componente de formulário de busca
    const { SearchFormComponent } = await import('../../components/search-form/search-form.component');
    // Cria dinamicamente o componente e o insere no container designado
    const searchFormComponentRef = this.searchFormContainer.createComponent(SearchFormComponent, { injector: this.injector });
    // Assina o evento de emissão de dados do componente de formulário de busca
    searchFormComponentRef.instance.dataEmitter.subscribe((data: Gif[]) => this.setDataInChild(data));
  }

  // Método para carregar dinamicamente o componente de resultados de busca
  async loadSearchResultsComponent() {
    // Usa a função import() para carregar o módulo do componente de resultados de busca
    const { SearchResultsComponent } = await import('../../components/search-results/search-results.component');
    // Cria dinamicamente o componente e o insere no container designado
    this.SearchResultsComponent = this.searchResultsContainer.createComponent(SearchResultsComponent, { injector: this.injector });
  }

  // Método para definir os dados no componente de resultados de busca
  public setDataInChild(data: any) {
    if (this.SearchResultsComponent && data) {
      this.SearchResultsComponent.instance.setData(data); // Envia os dados para o componente de resultados de busca
    } else {
      console.error('SearchResultsComponent is not defined');
    }
  }
}
