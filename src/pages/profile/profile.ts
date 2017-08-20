import { Profile_User } from './../../components/models/profile';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { HomePage } from './../home/home';
/**
 * Generated class for the ProfilePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
   profile={} as Profile_User
  google:boolean;
  items:any;
  constructor(public afd:AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams,private afAuth : AngularFireAuth, private afDatabase : AngularFireDatabase) {
     this.google=navParams.get("google"); 
     this.profile.foto="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/300px-No_image_available.svg.png";
    this.afAuth.authState.subscribe((auth)=>{
      this.items=this.afd.list('/profile/'+auth.uid, { preserveSnapshot: true })
      console.log("snapshot????????????????????????????")
      console.log(this.items);
     this.items.subscribe(snapshots=>{
      console.log(snapshots);
   
      snapshots.forEach(element => {
        console.log("key value");
        console.log(element.key);
          console.log(element.val());
         var keysFiltered = Object.keys(element.val()).filter(function(item){return !( element.val()[item] == undefined)});
    
   var valuesFiltered = keysFiltered.map((item)=> {
     // if(element.val()[item].user==this.userId){
     //   console.log(item);
     //   console.log(element.val()[item]);
      
     //   this.result_date.push(element.val()[item].onlyDate)
     //   console.log("rrresult")
     //   console.log(this.result_date);
     //   this.result.push(element.val()[item])
     //     console.log(this.result);
     //     this.result_date=Array.from(new Set(this.result_date))
     //     console.log(this.result_date);
     // }
    
   });
   
      })
     })
    })
     
    }
  duplicate(){

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }
  createProfile(){
    this.afAuth.authState.subscribe(auth=>{
      this.afDatabase.object('profile/'+auth.uid).set(this.profile)
      .then(() => this.navCtrl.setRoot(HomePage)).catch((error)=> console.log("err : "+error))
    })
  }
}
