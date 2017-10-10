import { LoadingController, AlertController, ToastController } from 'ionic-angular';

import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
// import { Observable } from "rxjs/Rx";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
/*
  Generated class for the SharedProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class Global {
  //接口基地址
  static BASEURI = 'https://cnodejs.org/api/v1';

  //接口地址
  static API: any = {
    getTopics: '/topics',
    getTopic: '/topic',
    postTopic: '/topics',
    updateTopic:'/topics/update',
    collectTopics:'/topic_collect/collect',
    cancelCollect:'/topic_collect/de_collect',
    topicCollect:'/topic_collect/',
    newReply:'/topic/:topic_id/replies',
    upReply:'/reply/:reply_id/ups',
    userInfo:'/user/',
    verifyToken:'/accesstoken',
    msgCount:'/message/count',
    msgs:'/messages',
    markAll:'/message/mark_all',
    markOne:'/message/mark_one/:msg_id',

  };
  static LIMIT = 20;
}

@Injectable()
export class SharedProvider {

  constructor(public http: Http, public loadingCtrl: LoadingController, public alertCtrl: AlertController, public toastCtrl: ToastController) { }

  public httpGet(url, params, callback, loader: boolean = false) {
    let loading = this.loadingCtrl.create({});
    if (loader) {
      loading.present();
    }
    this.http.get(Global.BASEURI + url + this.encode(params))
      .toPromise()
      .then(res => {
        var d = res.json();
        if (loader) {
          loading.dismiss();
        }
        callback(d == null ? "[]" : d);
      })
      .catch(error => {
        if (loader) {
          loading.dismiss();
        }
        this.handleError(error);
      });
  }

  httpPost(url: string, params, callback, loader: boolean = false) {
    let loading = this.loadingCtrl.create();
    if (loader) {
      loading.present();
    }
    this.http.post(Global.BASEURI + url, params)
      .toPromise()
      .then(res => {
        var d = res.json();
        if (loader) {
          loading.dismiss();
        }
        callback(d == null ? "[]" : d);
      }).catch(error => {
        if (loader) {
          loading.dismiss();
        }
        this.handleError(error);
      });
  }

  // 对参数进行编码
  encode(params) {
    var str = '';
    if (params) {
      for (var key in params) {
        if (params.hasOwnProperty(key)) {
          var value = params[key];
          str += encodeURIComponent(key) + '=' + encodeURIComponent(value) + '&';
        }
      }
      str = '?' + str.substring(0, str.length - 1);
    }
    return str;
  }

  private handleError(error: Response | any) {
    let msg = '';
    if (error.status == 400) {
      msg = '请求无效(code：404)';
      console.log('请检查参数类型是否匹配');
    }
    if (error.status == 404) {
      msg = '请求资源不存在(code：404)';
      console.error(msg + '，请检查路径是否正确');
    }
    if (error.status == 500) {
      msg = '服务器发生错误(code：500)';
      console.error(msg + '，请检查路径是否正确');
    }
    console.log(error);
    if (msg != '') {
      this.toast(msg);
    }
  }

  alert(message, callback?) {
    if (callback) {
      let alert = this.alertCtrl.create({
        title: '提示',
        message: message,
        buttons: [{
          text: "确定",
          handler: data => {
            callback();
          }
        }]
      });
      alert.present();
    } else {
      let alert = this.alertCtrl.create({
        title: '提示',
        message: message,
        buttons: ["确定"]
      });
      alert.present();
    }
  }

  toast(message, callback?) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 2000,
      dismissOnPageChange: true,
    });
    toast.present();
    if (callback) {
      callback();
    }
  }

  getTopics(tab: string, page?: number, limit = Global.LIMIT) {
    return this.http.get(Global.BASEURI + '/topics', {
      params: {
        "tab": tab,
        "page": page,
        "limit": limit
      }
    }).map(this.extractData);
  }

  getTopic(id: string, accesstoken?: string) {
    return this.http.get(Global.BASEURI + '/topic/' + id, {
      params: {
        "accesstoken": accesstoken
      }
    }).map(this.extractData);
  }
  private extractData(res: Response) {
    let body = res.json();
    return body.data || {};
  }

}
