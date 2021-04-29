import { Component, OnInit, TemplateRef, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  modalRef: BsModalRef;
  @ViewChild('template', { static: false }) templateRef: TemplateRef<any>;
  imageReceber;
  imageDoar;
  constructor(private route: ActivatedRoute, private router: Router, private modalService: BsModalService) {

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const tree = this.router.parseUrl(this.router.url);
        if (tree.fragment) {
          const element = document.querySelector('#' + tree.fragment);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
          }
        }
      }
    });

    if (navigator) {
      navigator.geolocation.getCurrentPosition(pos => {
      });
    }
  }

  getImageDoarRandom() {
    switch (Math.floor((Math.random() * 3) + 1)) {
      case 1:
        this.imageDoar = "./assets/img/1.png"
        break;
      case 2:
        this.imageDoar = "./assets/img/2.png"
        break;
      case 3:
        this.imageDoar = "./assets/img/3.png"
        break;
      default:
        this.imageDoar = "./assets/img/1.png"
        break;
    }

  }

  getImageReceberRandom() {

    switch (Math.floor((Math.random() * 3) + 1)) {
      case 1:
        this.imageReceber = "./assets/img/4.png"
        break;
      case 2:
        this.imageReceber = "./assets/img/5.png"
        break;
      case 3:
        this.imageReceber = "./assets/img/6.png"
        break;
      default:
        this.imageReceber = "./assets/img/4.png"
        break;
    }

  }


  ngOnInit() {
    this.getImageDoarRandom();
    this.getImageReceberRandom();

    /*setTimeout(() => {
      this.modalRef = this.modalService.show(this.templateRef);
    }, 500);*/

  }

  itemPesquisa: String = "";

}
