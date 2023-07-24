import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { IHead } from 'src/app/utils/interfaces/head.interface';

@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.css'],
})
export class HeadComponent {
  constructor(private sanitized: DomSanitizer) {}

  safeTransformLink(link: string): string {
    return this.sanitized.bypassSecurityTrustUrl(link).toString();
  }

  public headParams: IHead = {
    version: '1',
    canonical: this.safeTransformLink(
      'https://www.busqueprofissionais.com.br/'
    ),
    title: 'Busque profissionais',
    description:
      'Encontre os melhores profissionais próximos de você ! Tenha acesso rapidamente aos melhores professionais próximo da sua região.',
    keywords:
      'Buscar profissionais, encontrar profissionais próximos a você, encontrar os melhores profissionais, profissionais, prestadores de serviços, buscar prestadores, busque profissionais',
    scripts: '',
    robots: 'index,follow',
  };
}
