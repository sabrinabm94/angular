import { Component, Input } from '@angular/core';
import { Signal, createSignal } from '@angular/signals';
import { Gif } from 'src/app/data/models/gif.model';

/**
 * O componente `SearchResultsComponent` é responsável por exibir os resultados da pesquisa na página de resultados.
 * Ele utiliza Angular Signals para gerenciar e reagir a mudanças nos dados dos GIFs.
 */
@Component({
  selector: 'app-search-results', // Seletor utilizado para incluir o componente na aplicação
  templateUrl: './search-results.component.html', // Caminho do template HTML associado ao componente
  styleUrls: ['./search-results.component.css'], // Caminho dos arquivos de estilo CSS associados
})
export class SearchResultsComponent {
  /**
   * Signal que armazena e gerencia a lista de GIFs exibidos pelo componente.
   * É inicializado com um array vazio.
   * @private
   */
  private dataSignal: Signal<Gif[]> = createSignal([]);

  /**
   * Atualiza a lista de GIFs no Signal.
   * Este método é chamado para definir os dados recebidos do componente de formulário de busca.
   * @param data - Lista de GIFs a ser exibida pelo componente.
   * @returns {void}
   */
  setData(data: Gif[]): void {
    this.dataSignal.set(data); // Atualiza o Signal com os novos dados
  }

  /**
   * Obtém a lista atual de GIFs armazenada no Signal.
   * @returns {Gif[]} - Lista de GIFs a ser exibida pelo componente.
   */
  get data(): Gif[] {
    return this.dataSignal(); // Retorna os dados do Signal
  }
}
