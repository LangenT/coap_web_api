# coap_web_api
This is a CoAP Web API for CoAP get requests. The Script starts a http site that can be called and that returns the response of the device as JSON.
## How to use
To use the API navigate to the folder and start the script with:
```console
node coapapi.js
```
After that the Webservice is running and you can use it. <br>
The syntax of the webcall looks like this:
```console
ipOfTheServer:port/ipOfCoapServer/coapFunction
```
In my case:
```console
http://192.168.0.122:3000/fda8:257c:d283:1:fc55:f1f9:3124:5c10/getRHT
```
## Run as background service
You can also run the node script as an background service. For this you need a .service file, there is a template in this project. <br>
Edit the coapapi.service file and change the *User* attribute and the *ExecStart* attribute. The *User* has to be your username and the *ExecStart* has to be the path, where the project is stored. <br>
After editing copy the file to the *system* folder:
```console
cp coapapi.service /etc/systemd/system/coapapi.service
```
Reload the daemon:
```console
sudo systemctl daemon-reload
```
Now finally start the process:
```console
sudp systemctl start coapapi
```
Check the logs with:
```console
sudo journalctl -u coapapi
```
If you whant the service to start with boot use this:
```console
sudo systemctl enable coap
```
