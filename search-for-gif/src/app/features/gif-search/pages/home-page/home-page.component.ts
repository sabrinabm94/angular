import { AfterViewInit, Component, ComponentRef, HostBinding, Injector, ViewChild, ViewContainerRef } from '@angular/core';
import { TranslocoModule } from '@ngneat/transloco';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { FooterComponent } from '../../../../shared/components/footer/footer.component';
import { Gif } from 'src/app/data/models/gif.model';
import { Signal } from '@angular/core';

/**
 * O componente `HomePageComponent` representa a página principal da aplicação.
 * Ele carrega dinamicamente componentes de busca e exibição de resultados e utiliza Angular Signals
 * para gerenciar e atualizar a lista de GIFs exibidos.
 */
@Component({
  selector: 'app-home-page', // Seletor utilizado para incluir o componente na aplicação
  standalone: true, // Indica que o componente é standalone e não depende de um módulo específico
  imports: [
    HeaderComponent, // Componente de cabeçalho
    FooterComponent, // Componente de rodapé
    TranslocoModule, // Módulo de internacionalização
  ],
  templateUrl: './home-page.component.html', // Caminho do template HTML associado ao componente
  styleUrls: ['./home-page.component.css'], // Caminho dos arquivos de estilo CSS associados
})
export class HomePageComponent implements AfterViewInit {
  /** Referência ao container onde o componente de formulário de busca será carregado dinamicamente */
  @ViewChild('searchFormContainer', { read: ViewContainerRef }) searchFormContainer!: ViewContainerRef;

  /** Referência ao container onde o componente de resultados de busca será carregado dinamicamente */
  @ViewChild('searchResultsContainer', { read: ViewContainerRef }) searchResultsContainer!: ViewContainerRef;

  /** Referência ao componente de resultados de busca carregado dinamicamente */
  SearchResultsComponent!: ComponentRef<any>;

  /** Classe CSS aplicada ao host do componente */
  @HostBinding('class') class: string = 'app-home-page';

  /** Signal que armazena a lista de GIFs exibidos pelo componente */
  public gifs: Signal<Gif[]> = createSignal([]);

  /**
   * O construtor injeta o `Injector` necessário para carregar dinamicamente os componentes.
   * @param {Injector} injector - Injeta o serviço de injeção de dependências.
   */
  constructor(private injector: Injector) {}

  /**
   * Método do ciclo de vida Angular chamado após a inicialização da visualização do componente.
   * Ele chama os métodos para carregar os componentes de formulário de busca e resultados de busca dinamicamente.
   * @returns {void}
   */
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
    const { SearchFormComponent } = await import('../../components/search-form/search-form.component');
    const searchFormComponentRef = this.searchFormContainer.createComponent(SearchFormComponent, { injector: this.injector });

    // Assina o evento `dataEmitter` do componente de formulário de busca para atualizar a lista de GIFs
    searchFormComponentRef.instance.dataEmitter.subscribe((data: Gif[]) => this.gifs.set(data));
  }

  /**
   * Carrega dinamicamente o componente de resultados de busca.
   * Usa o método `import()` para carregamento tardio do módulo.
   * @returns {Promise<void>}
   */
  async loadSearchResultsComponent(): Promise<void> {
    const { SearchResultsComponent } = await import('../../components/search-results/search-results.component');
    this.SearchResultsComponent = this.searchResultsContainer.createComponent(SearchResultsComponent, { injector: this.injector });

    // Atualiza o componente de resultados com os dados do Signal
    this.gifs.subscribe(data => {
      if (this.SearchResultsComponent) {
        this.SearchResultsComponent.instance.setData(data);
      }
    });
  }
}
