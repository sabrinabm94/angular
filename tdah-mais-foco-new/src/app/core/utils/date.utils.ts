import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DateUtils {
  validateStringDateInBrFormat(date: string | null): boolean {
    if (!date) return false;

    // Expressão regular para verificar o formato dd/MM/yyyy
    const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;

    if (!dateRegex.test(date)) return false;

    // Verificar se a data é válida
    const [day, month, year] = date.split('/').map(Number);
    const formattedDate = new Date(year, month - 1, day);

    return (
      formattedDate.getDate() === day &&
      formattedDate.getMonth() === month - 1 &&
      formattedDate.getFullYear() === year
    );
  }

  formateDateToStringInBrFormat(date: Date | null): string | null {
    if (date) {
      const dateObj = new Date(date);

      // Adiciona zeros à esquerda em dia e mês usando padStart
      const day = String(dateObj.getDate()).padStart(2, '0');
      const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // month é zero-based
      const year = dateObj.getFullYear();

      return `${day}/${month}/${year}`;
    }
    return null;
  }

  formateBrFormatStringToLocalizeFormatString(
    date: string | null
  ): string | null {
    if (date) {
      const [day, month, year] = date.split('/');
      const newDate = new Date(
        Number(year),
        Number(month) - 1,
        Number(day),
        0,
        0,
        0,
        0
      );

      // Ajustando a estrutura das opções para toLocaleString
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'America/Sao_Paulo',
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      };

      const formattedDate = newDate.toLocaleString('en-US', options);
      return `${formattedDate} GMT-0300 (Horário Padrão de Brasília)`;
    }
    return null;
  }

  formateDateToInternationFormatString(date: Date | null): string | null {
    if (date) {
      const dateObj = new Date(date);

      const day = String(dateObj.getDate()).padStart(2, '0');
      const month = String(dateObj.getMonth() + 1).padStart(2, '0');
      const year = dateObj.getFullYear();

      return `${year}-${month}-${day}`;
    }
    return null;
  }

  formateStringInBrFormatToDate(date: string | Date | null): Date | null {
    if (date && !(date instanceof Date)) {
      const dateParts = date.split('/');
      if (dateParts.length === 3) {
        const [day, month, year] = dateParts.map((part) => Number(part));

        // Valida se as partes são números válidos
        if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
          return new Date(year, month - 1, day, 0, 0, 0, 0); // month é zero-based
        }
      }
    }
    return null;
  }
}
