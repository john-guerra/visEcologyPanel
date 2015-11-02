#!/bin/sh

rsync -avz -e "ssh -i /Users/jguerra/Documents/documentos/dutoViz/dutoVizNew.pem" * ubuntu@dutovis.com:/var/www/visEcology
