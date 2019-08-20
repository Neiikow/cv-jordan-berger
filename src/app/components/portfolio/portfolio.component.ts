import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PortfolioService } from 'src/app/services/portfolio.service';
import { Portfolio } from 'src/app/class/portfolio';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit {
  @Output() emitEdit = new EventEmitter<Portfolio>();

  public portfolio: Portfolio;
  public portfolios: Portfolio[];

  constructor(
    private portfolioService: PortfolioService,
    private authService: AuthService) { }

  ngOnInit() {
    this.getPortfolios();
  }

  public getPortfolios(): void {
    this.portfolioService.getPortfolios()
      .subscribe(data => {
        this.portfolios = data;
      });
  }

  private edit(portfolio: Portfolio): void {
    this.emitEdit.emit(portfolio);
  }

  private delete(portfolio: Portfolio): void {
    this.portfolioService.deletePortfolio(portfolio.id)
    .subscribe(e => {
      this.getPortfolios();
    });
  }

  private showDetails(portfolio: Portfolio): void {
    this.portfolio = portfolio;
  }

  private isAuth(role: string): boolean {
    if (this.authService.haveRoles(role)) {
      return true;
    }
  }
}
