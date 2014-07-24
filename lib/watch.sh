#!/bin/bash

echo watching folder $1/ every $2 secs.

while [[ true ]]
do
    files=`find $1 -type f -mtime -$2s`
    if [[ $files != "" ]] ; then
        echo "|", $files, "|"
    fi
    sleep $2
done
