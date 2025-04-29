import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { FooterComponent } from '../../../../shared/components/footer/footer.component';
import { Gif } from 'src/app/data/models/gif.model';
import {
  AfterViewInit,
  Component,
  ComponentRef,
  CUSTOM_ELEMENTS_SCHEMA,
  HostBinding,
  Injector,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { TranslocoModule } from '@ngneat/transloco';

/**
 * O componente `HomePageComponent` é a página principal da aplicação, onde são carregados dinamicamente
 * os componentes de busca e exibição de resultados. Ele utiliza `ViewChild` para inserir os componentes filhos
 * dinamicamente em containers designados.
 */
@Component({
  selector: 'app-home-page', // Seletor utilizado para incluir o componente na aplicação
  standalone: true,
  imports: [TranslocoModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements AfterViewInit {
  @ViewChild('searchFormContainer', { read: ViewContainerRef })
  searchFormContainer!: ViewContainerRef;
  @ViewChild('searchResultsContainer', { read: ViewContainerRef })
  searchResultsContainer!: ViewContainerRef;
  SearchResultsComponent!: ComponentRef<any>;
  @HostBinding('class') class: string = 'app-home-page';
  public gifs: Gif[] = [];

  constructor(private injector: Injector) {}

  ngAfterViewInit(): void {
    this.loadSearchFormComponent(); // Carrega dinamicamente o componente de formulário de busca
    this.loadSearchResultsComponent(); // Carrega dinamicamente o componente de resultados de busca
  }

  /**
   * Carrega dinamicamente o componente de formulário de busca.
   * Usa o método `import()` para carregamento tardio do módulo.
   * @returns {Promise<void>}
   */
  async loadSearchFormComponent(): Promise<void> {
    const { SearchFormComponent } = await import(
      '../../components/search-form/search-form.component'
    );
    const searchFormComponentRef = this.searchFormContainer.createComponent(
      SearchFormComponent,
      { injector: this.injector }
    );

    // Assina o evento `dataEmitter` do componente de formulário de busca para receber os dados e enviá-los ao componente de resultados
    searchFormComponentRef.instance.dataEmitter.subscribe((data: Gif[]) =>
      this.setDataInChild(data)
    );
  }

  /**
   * Carrega dinamicamente o componente de resultados de busca.
   * Usa o método `import()` para carregamento tardio do módulo.
   * @returns {Promise<void>}
   */
  async loadSearchResultsComponent(): Promise<void> {
    const { SearchResultsComponent } = await import(
      '../../components/search-results/search-results.component'
    );
    this.SearchResultsComponent = this.searchResultsContainer.createComponent(
      SearchResultsComponent,
      { injector: this.injector }
    );
  }

  /**
   * Define os dados recebidos no componente de resultados de busca.
   * Esse método é chamado quando o evento `dataEmitter` do componente de formulário de busca é acionado.
   * @param {Gif[]} data - Lista de GIFs que será passada para o componente de resultados.
   * @returns {void}
   */
  public setDataInChild(data: Gif[]): void {
    if (this.SearchResultsComponent && data) {
      this.SearchResultsComponent.instance.setData(data); // Envia os dados ao componente de resultados
    } else {
      console.error('SearchResultsComponent is not defined');
    }
  }
}
