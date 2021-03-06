import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Category } from './pages/categories/shared/category.model';
import { Entry } from './pages/entries/shared/entry.model';

export class InMemoryDataBase implements InMemoryDbService {
  createDb() {
    const categories: Category[] = [
      { id: 1, name: 'Moradia', description: 'Pagamentos de Contas da Casa' },
      { id: 2, name: 'Saúde', description: 'Plano de Saúde e Remédios' },
      { id: 3, name: 'Lazer', description: 'Cinema, parques, praia, etc' },
      { id: 4, name: 'Salário', description: 'Recebimento de Salário' },
      { id: 5, name: 'Freelas', description: 'Trabalhos como freelancer' },
      { id: 6, name: 'Estudos', description: 'Investimentos em estudos' }
    ];

    const entries: Entry[] = [
      {
        id: 1,
        name: 'Gás de Cozinha',
        categoryId: categories[0].id,
        category: categories[0],
        paid: true,
        date: '14/10/2019',
        amount: '50,10',
        type: 'expense',
        description: 'Butano 13 kilos'
      } as Entry,
      {
        id: 2,
        name: 'Viagens',
        categoryId: categories[2].id,
        category: categories[2],
        paid: false,
        date: '15/11/2019',
        amount: '2.500,00',
        type: 'expense',
        description: 'Férias'
      } as Entry,
      {
        id: 3,
        name: 'Salário',
        categoryId: categories[3].id,
        category: categories[3],
        paid: false,
        date: '15/11/2019',
        amount: '10.500,00',
        type: 'revenue',
        description: 'CLT Full'
      } as Entry,
      {
        id: 4,
        name: 'Convênio Médico',
        categoryId: categories[1].id,
        category: categories[1],
        paid: false,
        date: '15/11/2019',
        amount: '800,50',
        type: 'expense',
        description: 'Porto Seguro'
      } as Entry
    ];
    return { categories, entries };
  }
}
