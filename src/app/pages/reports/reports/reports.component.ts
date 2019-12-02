import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { Category } from '../../categories/shared/category.model';
import { CategoryService } from '../../categories/shared/category.service';

import { Entry } from '../../entries/shared/entry.model';
import { EntryService } from '../../entries/shared/entry.service';

import currencyFormatter from 'currency-formatter';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  expenseTotal: any = 0;
  revenueTotal: any = 0;
  balance: any = 0;

  expenseChartData: any;
  revenueChartData: any;

  chartOption = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true
          }
        }
      ]
    }
  };

  categories: Category[] = [];
  entries: Entry[] = [];

  @ViewChild('month', null) month: ElementRef = null;
  @ViewChild('year', null) year: ElementRef = null;

  constructor(
    private categoryService: CategoryService,
    private entryService: EntryService
  ) {}

  ngOnInit() {
    this.categoryService
      .getAll()
      .subscribe(categories => (this.categories = categories));
  }

  public generateReports() {
    const month = this.month.nativeElement.value;
    const year = this.year.nativeElement.value;
    if (!month || !year) {
      alert('Você precisa selecionar o Mês e o Ano para gerar os relatórios');
    } else {
      this.entryService
        // tslint:disable-next-line: radix
        .getByMonthAndYear(parseInt(month), parseInt(year))
        .subscribe(this.setValues.bind(this));
    }
  }

  private setValues(entries: Entry[]) {
    this.entries = entries;
    this.calculateBalance();
    this.setChartData();
  }

  private calculateBalance() {
    let expenseTotal = 0;
    let revenueTotal = 0;

    this.entries.forEach(entry => {
      if (entry.type === 'revenue') {
        revenueTotal += currencyFormatter.unformat(entry.amount, {
          code: 'BRL'
        });
      } else {
        expenseTotal += currencyFormatter.unformat(entry.amount, {
          code: 'BRL'
        });
      }
    });

    this.expenseTotal = currencyFormatter.format(expenseTotal, { code: 'BRL' });
    this.revenueTotal = currencyFormatter.format(revenueTotal, { code: 'BRL' });
    this.balance = currencyFormatter.format(revenueTotal - expenseTotal, {
      code: 'BRL'
    });
  }

  private setChartData() {
    this.revenueChartData = this.getChartData(
      'revenue',
      'Gráfico de Receitas',
      '#9ccc65'
    );

    this.expenseChartData = this.getChartData(
      'expense',
      'Gráfico de Despesas',
      '#e03131'
    );
  }

  private getChartData(entryType: string, title: string, color: string) {
    const chartData = [];
    this.categories.forEach(category => {
      // filtering entries by categoy and type
      const filteredEntries = this.entries.filter(
        entry => entry.categoryId === category.id && entry.type === entryType
      );

      // if found entries, then sum entries amount and add to chartData
      if (!!filteredEntries.length) {
        const totalAmount = filteredEntries.reduce(
          (total, entry) =>
            total +
            currencyFormatter.unformat(entry.amount, {
              code: 'BRL'
            }),
          0
        );

        chartData.push({
          categoryName: category.name,
          totalAmount
        });
      }
    });

    return {
      labels: chartData.map(item => item.categoryName),
      datasets: [
        {
          label: title,
          backgroundColor: color,
          data: chartData.map(item => item.totalAmount)
        }
      ]
    };
  }
}
