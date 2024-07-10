import { Gif } from './gif.model';

describe('Gif', () => {
  // Testa a criação de uma instância da classe Gif
  it('should create an instance with given properties', () => {
    const searchTerm = 'funny';
    const id = '1';
    const title = 'Funny Gif';
    const alt = 'A funny gif';
    const type = 'gif';
    const url = 'http://example.com/funny.gif';
    const urlPreview = 'http://example.com/funny-preview.gif';

    const gif = new Gif(searchTerm, id, title, alt, type, url, urlPreview);

    expect(gif).toBeTruthy();
    expect(gif.searchTerm).toBe(searchTerm);
    expect(gif.id).toBe(id);
    expect(gif.title).toBe(title);
    expect(gif.alt).toBe(alt);
    expect(gif.type).toBe(type);
    expect(gif.url).toBe(url);
    expect(gif.urlPreview).toBe(urlPreview);
  });

  // Testa a criação de uma instância com valores padrão
  it('should create an instance with default values', () => {
    const gif = new Gif('', '', '', '', '', '', '');

    expect(gif).toBeTruthy();
    expect(gif.searchTerm).toBe('');
    expect(gif.id).toBe('');
    expect(gif.title).toBe('');
    expect(gif.alt).toBe('');
    expect(gif.type).toBe('');
    expect(gif.url).toBe('');
    expect(gif.urlPreview).toBe('');
  });

  // Testa a criação de uma instância com alguns valores preenchidos
  it('should create an instance with some properties defined', () => {
    const searchTerm = 'cat';
    const id = '2';
    const gif = new Gif(searchTerm, id, '', '', '', '', '');

    expect(gif).toBeTruthy();
    expect(gif.searchTerm).toBe(searchTerm);
    expect(gif.id).toBe(id);
    expect(gif.title).toBe('');
    expect(gif.alt).toBe('');
    expect(gif.type).toBe('');
    expect(gif.url).toBe('');
    expect(gif.urlPreview).toBe('');
  });
});
