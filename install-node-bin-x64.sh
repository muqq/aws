#!/bin/bash

cwd=`pwd`

wget http://nodejs.org/dist/v0.10.24/node-v0.10.24-linux-x64.tar.gz
gzip -d node-v0.10.24-linux-x64.tar.gz && tar -xvf node-v0.10.24-linux-x64.tar
rm -f node-v0.10.24-linux-x64.tar.gz

echo "export PATH=$cwd/node-v0.10.24-linux-x64/bin:$PATH" >> ~/.bashrc
