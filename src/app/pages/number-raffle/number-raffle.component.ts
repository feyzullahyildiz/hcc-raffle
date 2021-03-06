import { Component, OnInit } from '@angular/core';
import Papa from 'papaparse';
@Component({
  selector: 'app-number-raffle',
  templateUrl: './number-raffle.component.html',
  styleUrls: ['./number-raffle.component.scss']
})
export class NumberRaffleComponent implements OnInit {
  constructor() { }
  ngOnInit() { 
    // this.raffleCount = 0;
    this.raffleCountLeft = 0;
    // this.winnerList = [];
    this.resultArray = []
    this.isRaffleStarted = false
    this.isRaffleEnded = false
    this.start = 0;
    this.end = 1500;
    this.count = 10;
    // this.checkNumbers()
  }

  isRaffleStarted: boolean
  isRaffleEnded: boolean
  resultArray: Array<any>
  // raffleCount: number;
  raffleCountLeft: number;
  // winnerList: Array<number>;
  
  start
  end
  count
  message
  success
  raffleANewNumber(start, end) {
    // const start = this.start
    // const end = this.end
    // const count = this.count

    // const arr = []
    // let i = 0;
    // while (i < count) {
    //   let number = parseInt(<any>(Math.random() * (end - start + 1)))
    //   number += parseInt(start)
    //   if (arr.indexOf(number) === -1) {
    //     i++;
    //     arr.push(number)
    //   }
    // }
    // return arr

    let isUnique = false
    let theUniqueNumber
    while(!isUnique){
      let number = parseInt(<any>(Math.random() * (end - start + 1)))
      number += parseInt(start)
      const isTheNumberInTheList = this.resultArray.indexOf(number) === -1
      // console.log('isTheNumberInTheList', isTheNumberInTheList)
      if(isTheNumberInTheList){
        isUnique = true
        theUniqueNumber = number
        this.resultArray.unshift(theUniqueNumber)
      }
    }
    // console.log('theUniqueNumber', theUniqueNumber)
    return theUniqueNumber

  }
  checkNumbers() {
    const start = this.start
    const end = this.end
    const count = this.count
    if (!start || !end || !count) {
      return;
    }
    try {
      if ((end - start + 1) < count) {
        throw new Error('Benzersiz sayılar üretilmesi mümkün değil')
      }
      if (start >= end) {
        throw new Error('Başlangıç sayısı bitiş sayısından büyük olamaz')
      }
      if (count < 1) {
        throw new Error('Çekiliş adedi 1den küçük olamaz')
      }
      this.success = true
      this.message = start + ' ile ' + end + ' arasında, ' + count + ' tane çekiliş çekilecektir.'
    } catch (error) {
      this.success = false
      this.message = error.message
    }
  }

  endValue(e) {
    const val = +e.target.value
    this.end = val
    this.checkNumbers()
  }
  startValue(e) {
    const val = +e.target.value
    this.start = val
    this.checkNumbers()
  }
  countValue(e) {
    const val = +e.target.value
    this.count = val
    this.checkNumbers()
  }
  startRaffle() {
    // const arr = this.getRandomNumbers()
    // this.resultArray = arr
    this.isRaffleStarted = true
    this.raffleCountLeft = this.count
  }
  raffle(){
    if(this.isRaffleEnded){
      return
    }
    this.raffleCountLeft--
    
    console.log('raffleCountLeft', this.raffleCountLeft)
    if(this.raffleCountLeft === 0){
      this.isRaffleEnded = true
    }
    const number = this.raffleANewNumber(this.start, this.end)
  }
  downloadResult(){
    const fileName = window.prompt('Çekiliş sonucu için isim giriniz.');
    if(fileName === null){
      return
    }
    const sortedArray = this.resultArray.concat().sort((a, b) => a - b);
    const text = Papa.unparse({
      fields: ['no'],
      data: sortedArray.map(a => [a])
    })
    if(text){
      const textFileAsBlob = new Blob([text], { type: 'text/csv;charset=UTF-8' });
      const fileNameToSaveAs = fileName + '.csv';
  
      const downloadLink = document.createElement("a");
      downloadLink.download = fileNameToSaveAs;
      downloadLink.innerHTML = "Download File";
      const webkitURL = (<any>window).webkitURL
      if (webkitURL != null) {
        // Chrome allows the link to be clicked without actually adding it to the DOM.
        downloadLink.href = webkitURL.createObjectURL(textFileAsBlob);
      } else {
        // Firefox requires the link to be added to the DOM before it can be clicked.
        downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
        downloadLink.onclick = this.destroyClickedElement;
        downloadLink.style.display = "none";
        document.body.appendChild(downloadLink);
      }
  
      downloadLink.click();
    }else{
      console.error('Papa hatası', text)
      alert('Beklenmedik bir hata oluştu')
    }

  }
  destroyClickedElement(event) {
    document.body.removeChild(event.target);
  }
  
}
