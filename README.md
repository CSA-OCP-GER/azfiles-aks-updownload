# Sample Application - Up-/Download files via K8s Pod from Azure files Mount #

Steps to run the sample:

- apply ```storageclass.yaml```. It creates a storage class for Azure Files
- apply ```pvc.yaml```. It creates a Persistent Volume Claim (Azure Files SC) with 5GiB size
- apply ```uploadservice.yaml```. It will create a Pod from image ```csaocpger/fileupload:2.0``` and a service of type ```LoadBalancer```

To upload a file via cURL:

```shell
$ curl -F 'uploadfile=@./abcd.xyz' http://<PUBLIC_IP_OF_SERVICE>:3000/upload-file
```

To download a file (or simply use a browser):

```shell
$ curl http://<PUBLIC_IP_OF_SERVICE>:3000/download-file\?filename\=abcd.xyz --output abcd.xyz
```

> Tested with files > 50MB.