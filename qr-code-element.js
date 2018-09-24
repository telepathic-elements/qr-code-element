import {qrcode} from './qr-code-generator.js';

export default class QrCodeElement extends HTMLElement{
    constructor(){
        super();
        //this.$ = this.attachShadow({mode: 'open'});
    }

    static get observedAttributes() {
        return ['qrdata'];
    }

    connectedCallback(){
        this.update();
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if(newValue){
            console.log(`${name} changed from ${oldValue} to ${newValue}`);
            if(name == "qrdata"){
                this.update(newValue);
            }
        }
    }
    update(data){

        if(!data && this.getAttribute("qrdata")){
            data = this.getAttribute("qrdata");
        }
        if(!data){
            return;
        }
        if(this.getAttribute("qrdata") !== data){
            let oldData = this.getAttribute("qrdata");
            console.log("Changing from "+oldData+" to "+data);
            this.setAttribute("qrdata",data);
        }
        this.qr = new qrcode(0, 'H');
        this.qr.addData(data);
        this.qr.make();
        let el = this.qr.createSvgTag({});
        //console.log("replacing QR with : ",el);
        //this.$.innerHTML = el;
        this.innerHTML = el;
    }

}