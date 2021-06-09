import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EnderecoDTO } from '../../models/endereco.dto';

@IonicPage()
@Component({
  selector: 'page-pick-address',
  templateUrl: 'pick-address.html',
})
export class PickAddressPage {

  items: EnderecoDTO[];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.items = [
      {
        id: "1",
        logradouro: "Rua Conde de Baependi",
        numero: "54",
        complemento: "apto 301",
        bairro: "Flamengo",
        cep: "22231140",
        cidade: {
          id: "1",
          nome: "Rio de Janeiro",
          estado: {
            id: "1",
            nome: "Rio de Janeiro"
          }
        }
      }
    ];
  }

}
