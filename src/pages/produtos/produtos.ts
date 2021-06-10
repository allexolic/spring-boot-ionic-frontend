import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
import { API_CONFIG } from '../../config/api.config';
import { ProdutoDTO } from '../../models/produto.dto';
import { ProdutoService } from '../../services/domain/produto.service';

@IonicPage()
@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.html',
})
export class ProdutosPage {

  items: ProdutoDTO[] = [];
  page: number = 0;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public produtoService : ProdutoService,
              public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad(){
    this.loadData();
  }

  loadData() {
    //console.log('ionViewDidLoad ProdutosPage');
    let categoria_id = this.navParams.get('categoria_id');
    let loader = this.presentLoading();
    this.produtoService.findByCategoria(categoria_id, this.page, 10)
      .subscribe(response => {

        let start = this.items.length;

        this.items = this.items.concat(response['content']);

        let end = this.items.length - 1;

        loader.dismiss();

        this.loadImageUrls(start, end);
      },
        error => {
          loader.dismiss();
        });

/*
    //MOCK DATA
    this.items = [
      {
        id: "1",
        nome: 'Mouse',
        preco: 80.99
      },
      {
        id: "2",
        nome: 'Teclado',
        preco: 100.00
      }
    ] */
  }

  loadImageUrls(start: number, end: number){
    for (var i=start; i<=end; i++){
      let item = this.items[i];
      this.produtoService.getSmallImageFromBucket(item.id)
        .subscribe(response => {
          item.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${item.id}-small.jpg`;
        },
        error => {});
    }
  }

  showDetail(produto_id : string){
    this.navCtrl.push('ProdutoDetailPage', {produto_id: produto_id});
  }

  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Aguarde..."
    });
    loader.present();
    return loader;
  }

  doRefresh(event){
    this.page = 0;
    this.items = [];
    this.loadData();
    setTimeout(() => {
      event.complete();
    }, 1000);
  }

  doInfinite(infiniteScroll) {
    this.page++;
    this.loadData();
    setTimeout(() => {
      infiniteScroll.complete();
    }, 1000);
  }
}
