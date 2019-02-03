/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);

    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
        var parentElement = document.getElementById('deviceready');
        var listeningElement = parentElement.querySelector('.listening');
        listeningElement.setAttribute('style', 'display:none;');
        window.plugins.insomnia.keepAwake();

        callBack = this.processEvent;
        cordova.plugins.CordovaMqTTPlugin.connect({
            url: config.mqttServer, //a public broker used for testing purposes only. Try using a self hosted broker for production.
            port: config.port,
            clientId: config.clientId,
            connectionTimeout:3000,
            keepAlive:60,
            success:function(s){
                window.addEventListener("devicemotion",callBack.bind(this), true);
            },
            error:function(e){
                alert("connect error");
            },
            onConnectionLost:function (){
                alert("disconnect");
            }
        });
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        console.log('Received Event: ' + id);
    },

    processEvent: function(event) {
        document.getElementById('deviceready').querySelector('.received').setAttribute('style', 'display:block;');
        // process the event object
        cordova.plugins.CordovaMqTTPlugin.publish({
            topic: config.accelerometerTopic,
            payload: event.acceleration.x + "," + event.acceleration.y + "," + event.acceleration.z,
            qos:0,
            retain:false,
            success:function(s){

            },
            error:function(e){

            }
        })
        cordova.plugins.CordovaMqTTPlugin.publish({
            topic: config.gyroscopeTopic,
            payload:event.rotationRate.alpha + "," + event.rotationRate.beta + "," + event.rotationRate.gamma,
            qos:0,
            retain:false,
            success:function(s){

            },
            error:function(e){

            }
        })
    }
};

app.initialize();