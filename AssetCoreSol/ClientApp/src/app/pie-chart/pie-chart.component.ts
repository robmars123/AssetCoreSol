import { Component, OnInit } from '@angular/core';
import { Label } from 'ng2-charts';
import { ChartOptions, ChartType } from 'chart.js';
import * as pluginDataLabels from 'chart.js';
import { AssetService } from '../services/asset.service';
import { AssetModel } from '../services/assetModel';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {
  getAssetsResponse: AssetModel = new AssetModel;
  totalAssets: any;
  assetAuditList: any;
  //categories
  totalDesktops: any;
  totalLaptops: any;
  totalMobileDevices: any;
  chartReady = true;
  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
    },
    plugins: {
        dataLabels: {
          formatter: (value: any, ctx: { chart: { data: { labels: { [x: string]: any; }; }; }; dataIndex: string | number; }) =>{
            const label = ctx.chart.data.labels[ctx.dataIndex];
            return label;
          }
        }
    },
    
  }

  public pieChartLabels: Label[] = [['Desktops'], ['Laptops'], 'Mobile Devices'];
  public pieChartData: number[] = []; //[300, 500, 1000];
//[300, 500, 1000];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend=  true;
  public pieChartPlugins = [pluginDataLabels];
  public pieChartColors = [
    {
      backgroundColor: ['rgba(255,0,0,0.3)','rgba(0,255,0,0.3)','rgba(0,0,255,0.3)'],
    },
  ];

  constructor(private assetService: AssetService) { }
  ngOnInit(): void {
    this.GetAssets();
  }
  GetAssets() {
    this.assetService.getAssets().subscribe((data) => {
      this.getAssetsResponse = data;
      this.totalAssets = this.getAssetsResponse.assetList.length;
      let assetAuditList = this.getAssetsResponse.assetAuditLogList;  

      this.assetAuditList = assetAuditList;

      this.totalDesktops = this.getAssetsResponse.assetList.filter(x =>x.assetCategoryId == "2").length; //desktops
      this.totalLaptops = this.getAssetsResponse.assetList.filter(x =>x.assetCategoryId == "1").length; //laptops
      this.totalMobileDevices = this.getAssetsResponse.assetList.filter(x =>x.assetCategoryId == "3").length; //mobile devices, ipads, phones, etc

      //pass array values to pie
      this.pieChartData = [this.totalDesktops,this.totalLaptops,this.totalMobileDevices];
    });


  }
}
